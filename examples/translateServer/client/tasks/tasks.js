Template.inputNewTask.events({
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

			var currentTask = Session.get('currentTaskId');

		    createTask(temp.find('input#searchText').value, 
		    	( (this && this._id)?this._id:Session.get('currentProjectId') ), 
		    	( (currentTask)?currentTask:null) );
		} // EO enter + search text
		return false;
	},
	'blur input#searchText': function(e, temp) {
		$(temp.find('.clickAbleBox')).show();
		$(temp.find('.editAbleBox')).hide();
		return false;
	}
});

Template.listTasksTemplate.tasks = function() {
	return tasks.find({ _id: { $not: Session.get('currentTaskId') } });
	/*var currentTask = Session.get('currentTaskId');
	return tasks.find({ $and: [
		{taskId: ( (this && this._id)?this._id:( (currentTask)?currentTask:null ) ) },
		{projectID: Session.get('currentProjectId') }
		]
	});*/
};

Template.listTasksTemplate.events({
	'click .btnItem': function(e, temp) {
		e.preventDefault();
		setCurrentTask(this._id);
		return false;
	}
});

Template.daysHeadView.weeks = function() {
	return weeks;
};