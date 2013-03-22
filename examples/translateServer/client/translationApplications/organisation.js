Template.inputNewOrganisation.events({
	'click .clickAbleBox': function(e, temp) {
		e.preventDefault();
		$(temp.find('.clickAbleBox')).hide();
		$(temp.find('.editAbleBox')).show();
		$(temp.find('input#searchText')).val('');
		$(temp.find('input#searchText')).focus();
		return false;
	},
	'click .editAbleBox': function(e, temp) {
		e.preventDefault();
		$(temp.find('.clickAbleBox')).show();
		$(temp.find('.editAbleBox')).hide();
		return false;
	},
	'keyup input#searchText': function(e, temp) {
		if (e.which == 13 && temp.find('input#searchText').value != '') {
			e.preventDefault();
			// Reset gui
			$(temp.find('input#searchText')).blur();
			$(temp.find('.clickAbleBox')).show();
			$(temp.find('.editAbleBox')).hide();

		    // Open dialog box
		    $('#selectOrgToJoin').modal('show');
		    Session.set('orgSearchName', temp.find('input#searchText').value);
		} // EO enter + search text
		return false;
	},
	'blur input#searchText': function(e, temp) {
		$(temp.find('.clickAbleBox')).show();
		$(temp.find('.editAbleBox')).hide();
		return false;
	}
});

Template.listTemplate.listOwner = function() {
	return translationApplications.find({ owner: Meteor.userId() });
};

Template.listTemplate.listMember = function() {
	return translationApplications.find({ member: Meteor.userId() });
};

Template.listTemplate.listPending = function() {
	return translationApplications.find({ pending: Meteor.userId() });
};

Template.listTemplate.listCount = function() {
	return translationApplications.find({ $or: [
		{owner: Meteor.userId()}, 
		{member: Meteor.userId()}, 
		{pending:Meteor.userId()}
		] }).count();
};

Template.listTemplate.events({
	'click .btnItemOwner': function(e, temp) {
		e.preventDefault();
		setCurrentOrganisation(this._id, 'owner');
		return false;
	},
	'click .btnItemMember': function(e, temp) {
		e.preventDefault();
		setCurrentOrganisation(this._id, 'member');
		return false;
	},
	'click .btnItemPending': function(e, temp) {
		e.preventDefault();
		setCurrentOrganisation(this._id, 'pending');
		return false;
	}
});