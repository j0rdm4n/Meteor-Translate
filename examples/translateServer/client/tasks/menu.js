Template.menuTasks.events({
	'click .goBack': function(e, temp) {
		e.preventDefault();
		setCurrentTask();
		return false;
	},
	'click .btnSettings': function(e, temp) {
		e.preventDefault();
		// TODO: Show settings for board
		//$('#modalOrgSettings').modal('show');
		return false;
	}
});

Template.menuTasks.task = function() {
	if (Session.get('currentTaskId'))
  		return tasks.findOne({_id: Session.get('currentTaskId') })
  	else
  		return projects.findOne({ _id: Session.get('currentProjectId') });
};