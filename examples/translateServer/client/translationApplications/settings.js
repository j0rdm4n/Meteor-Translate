Template.orgDetails.list = function() {
  return organisations.findOne({_id: Session.get('currentOrganisationId') });
};

Template.orgDetails.events({
  'click .btnSave': function(e, temp) {
    if (temp.find('#orgName') != '')
      organisations.update({ _id: Session.get('currentOrganisationId') }, {$set: 
        {
          name: temp.find('#orgName').value,
          vatNr: temp.find('#orgVatNr').value,
          phone: temp.find('#orgPhone').value,
          email: temp.find('#orgEmail').value
        }
      });
  }
});

Template.orgUsersPending.usersCountPending = function() {
  var result = organisations.findOne({ _id: Session.get('currentOrganisationId') });
  return (result && result.pending && result.pending.length)?result.pending.length:0;
};

Template.orgMain.boards = function() {
  return boards.find({
    $and: [
    {parrentId: Session.get('currentOrganisationId')},
    {active: true },
        { $or: [ //TODO: move this to publish
          { public: true }, 
          { member: Meteor.userId() }, 
          { owner: Meteor.userId() }
          ] 
        }
        ]
      }, { sort: { sort: 1, name: 1} });
};

Template.orgMain.organisation  = function() {
  return organisations.findOne({ _id: Session.get('currentOrganisationId') });
}; 

Template.orgUsers.organisation = function() {
  return organisations.findOne({ _id: Session.get('currentOrganisationId') });
};

Template.orgUsers.events({
  'click .btnAddUser': function() {
    organisations.update({ _id: Session.get('currentOrganisationId') }, { $push: { member: this._id }, $pull: { pending: this._id} });
  },
  'click .btnDeclineUser': function() {
    organisations.update({ _id: Session.get('currentOrganisationId') }, { $push: { declined: this._id }, $pull: { pending: this._id} });
  }
});

Template.orgUsers.events({
  'click .btnRemoveOwner': function(e, temp) {
    //notify owner to remove - except if its one self then do it and add to lostOwner
    var currentOrg = organisations.findOne({ _id: Session.get('currentOrganisationId') });
    if (currentOrg.owner.length == 1) {
      if (this._id == Meteor.userId()) {
        if (currentOrg.member.length > 0 || currentOrg.pending.length > 0) {
          if (confirm('Du er den sidste ejer, men der er stadig medlemmer i organisationen eller brugere der afventer adgang.'+
            '\n\nVil du slette alle medlemmerne så du kan frakobles?')) {
            organisations.update({ _id: Session.get('currentOrganisationId') }, 
              { $set: { owner: [], member:[], pending:[] }, $push:{ lostOwner: this._id} });

        }
      } else {
        if (confirm('Er du sikker på at du vil frakoble dig organisationen. Du er den sidste ejer?'))
          organisations.update({ _id: Session.get('currentOrganisationId') }, 
            { $pull: { owner: this._id }, $push:{ lostOwner: this._id} });
        } //EO no members
      } else {
        //A member trying to delete the owner?
      }
    } else {
      if (this._id == Meteor.userId()) {
        //Remove one self
      } else {

      }
    }
  },
  'click .btnRemoveMember': function(e, temp) {
    var username = Meteor.users.findOne(this._id).username;
    if (confirm('Er du sikker på at du vil fjerne bruger: "'+username+'" fra din organisation?')) {
      organisations.update({ _id: Session.get('currentOrganisationId') }, { $pull: { member: this._id }});
    }
  },
  'click .btnMsgUser': function(e, temp) {
    Session.set('messageTo', this._id);
    Session.set('messageMoreId', null);
    Session.set('messageOnlyConfirm', false);
    $('#newMessage').modal('show');
  }
});
