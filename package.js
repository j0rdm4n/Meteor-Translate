Package.describe({
  summary: "Meteor Translation, adds `getText('hello')` and `{{getText 'hello'}}`",
  internal: true
});

Package.on_use(function (api) {
	api.use(['livedata', 'accounts-urls', 'accounts-base', 'underscore', 'templating'], 'client');

	api.add_files('model.js', ['client', 'server']);  
	api.add_files(['translate.html', 'translate.client.js'], 'client');
	api.add_files('translate.server.js', 'server');
});

Package.on_test(function (api) {
  /*api.use('htmljs', 'client');
  api.use('tinytest');
  api.add_files('htmljs_test.js', 'client');*/
});