Session.setDefault('currentProjectId', '');

var translations = new Meteor.Collection('translations');

Deps.autorun(function() {
	Meteor.subscribe('translationsAdmin', Session.get('currentOrganisationId'), Session.get('currentBoardId'));
});

function createProject(name, language, appId) {
	return translations.insert({ name: name, language: language, appId: appId, owner: [ Meteor.userId() ]});
}

function setCurrentProject(projectId) {
	Session.set('currentProjectId', projectId);
	Session.set('view', (projectId)?'tasks':'projects');
	//Session.set('currentRole', (projectId)?role:'');
}