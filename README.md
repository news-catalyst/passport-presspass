# Passport PressPass

PassportJS is a popular authentication system for Node apps. This simple module provides plug-and-play support for integrating PressPass authentication into your application.

## Quick Start

```js
passport.use(new PressPassStrategy({
    clientID: '<your client secret>',
    callbackURL: '<your callback url>',
  },
  function(iss, sub, profile, verified) {
    // 'Profile' contains tons of user information, including a user's organizations!
    process.nextTick(function () {
      return verified(null, profile)
    });
  }
));
```

Note that most of the information is embedded in `profile._raw`, because it is not specified by the OpenID Connect spec and is therefore not automatically inserted into the profile object.

## LICENSE

MIT (see [LICENSE](LICENSE.md))