var Translate = {

	_translations: null,
	_languages: null,
	_key: null,
	_connection: null,
	_connectionUrl: (__meteor_runtime_config__.TRANSLATE_DEFAULT_CONNECTION_URL)?__meteor_runtime_config__.TRANSLATE_DEFAULT_CONNECTION_URL:'',
	_connectionDeps: new Deps.Dependency,
	_ready: false,
	_language: ((__meteor_runtime_config__.TRANSLATE_DEFAULT_LANGUAGE)?__meteor_runtime_config__.TRANSLATE_DEFAULT_LANGUAGE:'en'),
	_languageDeps: new Deps.Dependency
};

(function () {


/***** Private functions *****/

var onReady = function() {
	_ready = true;
};

function _handleCase(notation, src) {
	if (src == '')
		return '('+notation+')'; // Translation is on its way
	// Return lowercase
	if (notation == notation.toLowerCase())
	  return src.toLowerCase();
	// Return uppercase
	if (notation == notation.toUpperCase())
	  return src.toUpperCase();
	// Return uppercase first letter, rest lowercase
	if (notation.substr(1) == notation.substr(1).toLowerCase() )
	  return src.substr(0, 1).toUpperCase()+src.substr(1).toLowerCase();
	// Return CamelCase
	return src.replace(/( [a-z])/g, function($1){
	  return $1.toUpperCase();
	});
} //EO handleCase

function transformFlagUrl(doc) {
	_.extend(this, doc, { fullFlagUrl: _connection + doc.flagUrl});
}

/***** Translation  *****/

Translate.connect = function(url, key) {
	var self = this;
	self._key = key;
	self._connectionUrl = (url && url.substr(url.length-1, 1) == '/')?url:'/'+url;
	self._connection = (url)?Meteor.connect(url):Meteor.default_connection;
	self._connectionDeps.changed();
};

Translate.getText = function(notation) {
	var self = this;
	if (self._translations) {
		var textObject = self._translations.findOne( { notation: notation.toLowerCase() } ); // notation are lowercase and english
		// handleCase will mimic text Case making src same case as text

		if (textObject) // If notation and text found then return
			return _handleCase(notation, textObject.text);

		//request translation
		if (self._connection.status().connected && self._ready) // We are connected and updated
			self._connection.call('requestTranslation', key, Translate.getLanguage(), notation );
	}
	return '['+notation+']'; // Translation is not yet created		
}; //EO getText

Translate.getLanguages = function() {
	var self = this;
	return self._languages.find({}); // Returns all supported languages
};

Translate.getLanguage = function() {
	var self = this;
	Deps.depend(self._languageDeps);
	return self._language;
};

Translate.setLanguage = function(code) {
	var self = this;
	if (self._language != code) {
		self._language = code;
		self._languageDeps.changed();
	}
};


/***** Deps autorun subscriptions and collections *****/
Deps.autorun(function() {
	Deps.depend(Translate._connectionDeps);
	if (Translate._connection) {
		// translations, returns { key: 'add.button', text: 'Tilføj Knap' }
		Translate._translations = new Meteor.Collection('translations', { manager: Translate._connection } );

		// Languages supported for this app, returns { language: 'Danish', code: 'da', country:'DK', flagUrl: 'flags/da.png'}
		Translate._languages = new Meteor.Collection('languages', { manager: Translate._connection }); 
	}
});

Deps.autorun(function() {
	Deps.depend(Translate._connectionDeps);
	if (!this.firstRun) { // It's triggered by connectionDeps and languageDeps
		if (Translate._connection) {
			Translate._ready = false;
			Translate._connection.subscribe('translations', Translate.getLanguage(), Translate._key, Translate._ready);
			Translate._connection.subscribe('languages', Translate._key);
		}
	}
});

/***** Add handlebars helper *****/

  if (typeof Handlebars !== 'undefined') {
    Handlebars.registerHelper('getText', function (notation) {
    	return Translate.getText(notation);
    });
  }

/***** Setup languageSelector *****/
Template.languageSelector.languages = function() {
	if (Translate && Translate._languages)
		return Translate._languages.find({}, { transform: function(doc) { return new transformFlagUrl(doc); } });
};

Template.languageSelector.events({
	'click .languageFlag': function(e, temp) {
		Translate.setLanguage(this.code);
	}
});


})(); // EO Scope