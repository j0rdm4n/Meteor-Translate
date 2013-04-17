# Translate
The main idear is to have a set of basic tools for handling languages:
```js
    // Get the translated text for the current language

    // Define case on the run ex.:
    getText('say.hello.to.me') == 'say hello to me :)'; // lowercase
    getText('SAY.HELLO.TO.ME') == 'SAY HELLO TO ME :)'; // uppercase
    getText('Say.hello.to.me') == 'Say hello to me :)'; // uppercase first letter, rest lowercase
    getText('Say.Hello.To.Me') == 'Say Hello To Me :)'; // camelCase

    // getText taking parametres
    getText('say.hello.to.{1}.and.wellcome', 'Morten') == 'say hello to Morten :) and wellcome'; // lowercase

```
*getText should be reactive and depend on language*

```html
<!-- Use tranlation in templates -->
{{getText 'Say.Hello.To.Me'}}
<!-- "Say Hello To Me :)" -->

{{getText 'say.hello.to.{1}.and.wellcome' 'Morten'}}
<!-- Prints: "say hello to Morten :) and wellcome" -->

<!-- A helper for listing current and supported languages - the user can change language -->
{{selectLanguage type='flags'}}
<!-- Prints current flag - if clicked then show dropdown of available languages -->
```


##Sync app with remote server
The app server syncronizes to the main server *Meteor 0.6.2 allows server to server connections!*
```
  Translate.init({ remoteServer: 'http://translate.meteor.com'});
```

## The translation server
Collaborate about translation
* Create your app
* Add wanted languages
* Publish translation tasks
* Help each other with translation
* Some point system for giving credit
* All tranlations are shared, but copyed to app

## TODO
* Alot... Refractoring code to make a working testable version
* Find a naming convention for notations eg. dotted: 'Say.hello.to.me'

