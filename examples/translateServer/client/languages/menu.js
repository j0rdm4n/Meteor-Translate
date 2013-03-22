Template.menuBoards.events({
	'click .goBack': function(e, temp) {
		e.preventDefault();
		setCurrentOrganisation();
	},
	'click .btnSettings': function(e, temp) {
		e.preventDefault();
		var view = Session.get('view');
		view = (view == 'organisationSettings')?'boards':'organisationSettings';
		Session.set('view', view);
	}
});

Template.menuBoards.organisation = function() {
  return translationApplications.findOne({_id: Session.get('currentOrganisationId') });
};