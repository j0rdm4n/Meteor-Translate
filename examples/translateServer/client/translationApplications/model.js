/*
 * Model Organisations
 */

Session.setDefault('view', 'organisations');
Session.setDefault('currentOrganisationId', '');

translationApplications = new Meteor.Collection('translationApplications');

function setCurrentOrganisation(orgId, role) {
	Session.set('currentOrganisationId', orgId);
	Session.set('view', (orgId)?'boards':'organisations');
	Session.set('currentRole', (orgId)?role:'');
}

//Subscribe organisation data
Meteor.subscribe('organisationsOwner');
Meteor.subscribe('organisationsMember');

Deps.autorun(function() {
	Meteor.subscribe('translationApplicationSearch', Session.get('orgSearchName') );
});

function organisationAdd(name) {
	return translationApplications.insert({ name: name, owner: [Meteor.userId()], member: [], pending: [], declined: []});
}

function organisationJoin(orgId) {
	translationApplications.update({ _id: orgId }, { $push: { pending: Meteor.userId() }});
}

function organisationReOpen(orgId) {
    translationApplications.update({ _id: orgId }, { $push: { owner: Meteor.userId() }, $set: { lostOwner: [] } });
}
