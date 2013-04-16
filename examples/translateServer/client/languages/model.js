/*
*	Model Boards
*/

Session.setDefault('currentBoardId', '');

languages = new Meteor.Collection('languages');

Deps.autorun(function() {
	Meteor.subscribe('languagesAdmin', Session.get('currentOrganisationId'));
});

function createBoard(name, orgId) {
	return languages.insert({ name: name, appId: orgId, owner: [ Meteor.userId() ]});
}

function setCurrentBoard(boardId) {
	Session.set('currentBoardId', boardId);
	Session.set('view', (boardId)?'projects':'boards');
	//Session.set('currentRole', (boardId)?role:'');
}