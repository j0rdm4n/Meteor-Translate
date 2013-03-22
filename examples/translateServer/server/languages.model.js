Meteor.publish('languagesAdmin', function(appId) {
	return languages.find({ appId: appId });
});