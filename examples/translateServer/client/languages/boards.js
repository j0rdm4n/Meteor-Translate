Template.inputNewBoard.events({
	'click .clickAbleBox': function(e, temp) {
		e.preventDefault();
		$(temp.find('.clickAbleBox')).hide();
		$(temp.find('.editAbleBox')).css('display', 'inline-block');
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

		    createBoard(temp.find('input#searchText').value, Session.get('currentOrganisationId'));
		} // EO enter + search text
		return false;
	},
	'blur input#searchText': function(e, temp) {
		$(temp.find('.clickAbleBox')).show();
		$(temp.find('.editAbleBox')).hide();
		return false;
	}
});

Template.listBoardsTemplate.boards = function() {
	return languages.find({ organisationId: Session.get('currentOrganisationId') });
};

Template.listBoardsTemplate.events({
	'click .headContainer': function(e, temp) {
		e.preventDefault();
		setCurrentBoard(this._id);
		return false;
	}
});

