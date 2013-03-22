Template.searchJoinList.list = function() {
	var name = Session.get('orgSearchName');
	return translationApplications.find({ $and: [{ owner: {$not: Meteor.userId() } }, { member: {$not: Meteor.userId() } }] });
};

Template.selectOrgToJoin.events({
	'click .btnAdd': function(e, temp) {
		var name = Session.get('orgSearchName');
		if (name != ''){         
			var id = organisationAdd(name);
			if (id) {
				Session.set('currentOrganisationId', id);
				Session.set('currentRole', 'owner');
			}
		}        
	  //$('#searchname').value = '';
	},
	'click .btnCancel': function(e, temp) {
		$("#selectOrgToJoin").modal('hide');
	}
});

Template.searchJoinList.events({
	'click .btnJoin': function(e, temp) {
		organisationJoin(this._id);
		alert('Ejer af "'+this.name+'" skal acceptere tilkobling.\nDu får besked hvis tilkobling accepteres');
		Session.set('currentOrganisationId', '');
	},
	'click .btnReJoin' : function(e, temp) {
		if (confirm('Er du sikker på at du vil genåbne denne organisation?')) {
			organisationReOpen(this._id);
			Session.set('currentOrganisationId', this._id);
		}
	}
});