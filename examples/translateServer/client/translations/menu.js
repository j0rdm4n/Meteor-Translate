Template.menuProjects.events({
	'click .goBack': function(e, temp) {
		e.preventDefault();
		setCurrentBoard();
	},
	'click .btnSettings': function(e, temp) {
		e.preventDefault();
		// TODO: Show settings for board
		//$('#modalOrgSettings').modal('show');
	}
});

Template.menuProjects.board = function() {
  return boards.findOne({_id: Session.get('currentBoardId') });
};