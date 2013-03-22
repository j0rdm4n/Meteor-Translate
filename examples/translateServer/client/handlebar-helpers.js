if (Meteor.isClient) {
  
  (function () {
  if (typeof Handlebars !== 'undefined') {
    //{{getSession 'key'}}
    Handlebars.registerHelper('getSession', function (key) {
      return Session.get(key);
    });

    Handlebars.registerHelper('sessionEquals', function (key, value) {
      return Session.equals(key, value); //When Issue #617 is resolved
    });

    Handlebars.registerHelper('isEqual', function (a, b) {
      return (a == b); //Only text, numbers, boolean - not array & objects
    });

    Handlebars.registerHelper('isConnected', function (a, b) {
      return Meteor.status().connected;
    });

    Handlebars.registerHelper('cutString', function (str, len) {
      return (str && str.length > len)?str.substr(0, Math.max(len-3, 0))+'...':str;
    });

    Handlebars.registerHelper('getUser', function (userId) {
      return Meteor.users.findOne( (typeof(userId) == 'object')?userId[0]:userId);
    });

    Handlebars.registerHelper('arrayLength', function (a) {
      return (a)?a.length:0;
    });

    Handlebars.registerHelper('userRole', function ( /* arguments */) {
      var role = Session.get('currentRole');
      return _.any(arguments, function(value) { return (value == role); });
    });
  }
})(); 

}//EO client