Template.inputNewProject.events({
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

		    createProject(temp.find('input#searchText').value, ( (this && this._id)?this._id:Session.get('currentBoardId') ), Session.get('currentOrganisationId'));
		} // EO enter + search text
		return false;
	},
	'blur input#searchText': function(e, temp) {
		$(temp.find('.clickAbleBox')).show();
		$(temp.find('.editAbleBox')).hide();
		return false;
	}
});

Template.listProjectsTemplate.boards = function() {
	return projects.find({ boardId: ( (this && this._id)?this._id:Session.get('currentBoardId') ) });
};

Template.listProjectsTemplate.events({
	'click .btnItem, .btnItemText': function(e, temp) {
		e.preventDefault();
		Session.set('currentBoardId', this.boardId);
		setCurrentProject(this._id);
		return false;
	}
});