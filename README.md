# Translate
The main idear is to have a set of basic tools for handling languages:
```js
    // Get the translated text for the current language

    // Define case on the run ex.:
    getText('say.hello.to.me') == 'say hello to me :)'; // lowercase
    getText('SAY.HELLO.TO.ME') == 'SAY HELLO TO ME :)'; // uppercase
    getText('Say.hello.to.me') == 'Say hello to me :)'; // uppercase first letter, rest lowercase
    getText('Say.Hello.To.Me') == 'Say Hello To Me :)'; // camelCase
```
*getText should be reactive and depend on language*

```html
<!-- Use tranlation in templates -->
{{getText 'Say.Hello.To.Me'}}

<!-- A helper for listing current and supported languages - the user can change language -->
{{selectLanguage}}
```


## The app server syncronizes to the main server __Meteor 0.6.2 allows server to server connections!__
```
  Translate.init({ remoteServer: 'http://'});
```

## The translation server
Collaborate about translation
* Create your app
* Add wanted languages
* Publish translation tasks
* Help each other with translation
* Some point system for giving credit
* All tranlations are shared, but copyed to app


