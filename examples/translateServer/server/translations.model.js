Meteor.publish('translationsAdmin', function(appId, languageCode) {
	if (languageCode)
		return translations.find({ code: languageCode })
	else
		return translations.find({ appId: appId });
});
