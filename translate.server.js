// Public server collections
var translationApplications = new Meteor.Collection('translationApplications');
var languages = new Meteor.Collection('languages');
var translations = new Meteor.Collection('translations');

var Translate = {};

(function() {
  /* Error constants TODO: Make available to client?  */
  var ERROR_CODE_INVALID_KEY = 1;
  var ERROR_CODE_DB_CREATE = 2;

  // Set language at runtime
  Translate.setLanguage = function(code) {
      __meteor_runtime_config__.TRANSLATE_DEFAULT_LANGUAGE = code;
  };

  // Set server at runtime
  Translate.connect = function(url) {
      __meteor_runtime_config__.TRANSLATE_DEFAULT_CONNECTION_URL = url;
  };

  /* Private function for checking api key for application  */
  function _getAppIdFromKey(key) {
    var result = translationApplications.findOne({ key: key });
    return (result && result._id)?result:null;
  }

  /* Publish app translations for the app */
  Meteor.publish('translations', function(language, key) {
    var app = _getAppIdFromKey(key);
    if (app && app._id)
      return translations.find({ appId: app._id, language: language}, { fields: { appId: 0, language: 0, datetime:0, validated:0 } })
    else {
        // Notify use of non existing key / app
    }
  });

  /* Publish languages available for the app */
  Meteor.publish('languages', function(key) {
    var app = _getAppIdFromKey(key);
    if (app && app._id)
      return languages.find({ appId: app._id }, { fields: { appId: 0 } })
    else {
        // Notify use of non existing key / app
    }
  });

  function _getSecondLanguage(language) {
    // TODO: some languages are close enough to be understandable - this could be extruded from translators preferences?
    var secondLanguage = { 'da': 'no', 'no': 'da'};
    return (secondLanguage[language])?secondLanguage[language]:language;
  }

  function _findText(notation, language) {
    // Search the whole database for notation and language
    var dbText;
    // Try a complete notation, language and validated
    dbText = translations.findOne({ notation: notation, language: language, validated: true });
    if (dbText && dbText.text)
      return dbText.text;

    // Try notation and language
    dbText = translations.findOne({ notation: notation, language: language });
    if (dbText && dbText.text)
      return dbText.text;

    // Try a complete notation, _getSecondLanguage(language) and validated
    dbText = translations.findOne({ notation: notation, language: _getSecondLanguage(language), validated: true });
    if (dbText && dbText.text)
      return dbText.text;

    // Try notation and _getSecondLanguage(language)
    dbText = translations.findOne({ notation: notation, language: _getSecondLanguage(language) });
    if (dbText && dbText.text)
      return dbText.text;

    // Try a complete notation, 'en' and validated
    dbText = translations.findOne({ notation: notation, language: 'en', validated: true });
    if (dbText && dbText.text)
      return dbText.text;

    // Try notation and 'en'
    dbText = translations.findOne({ notation: notation, language: 'en' });
    if (dbText && dbText.text)
      return dbText.text;

    /* Results not specifying language could result in some strange translations */

    return ''; // Guess we cant do any better?
  }

  Meteor.methods({
    'requestTranslation': function(key, language, notation) {
      var app = _getAppIdFromKey(key);
      if (app && app._id) {
        // Get language alternativ and english for setting default value?
        // Search db for notation - if found the use it for setting default

        /* We now do our best to fillout the text  */
        var text = _findText(notation, language);

        var newTranslation = { text: text, notation: notation, appId: app._id, language: language, datetime: Date.now(), validated: false }; // Set validated flag to false

        var id = translations.insert( newTranslation );
        return (id)?{ success: true }: { error: { code: ERROR_CODE_DB_CREATE, message: 'Could not create translations request in database' } };
      } else {
        // Notify use of non existing key / app
        return { error: { code: ERROR_CODE_INVALID_KEY, message: 'Invalid key' } };
      }
    }
  });

})();