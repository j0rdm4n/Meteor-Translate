if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Translate.connect();     // use local server
  Translate.setLanguage('en'); // Set default language - maybe use user profile for this.
}