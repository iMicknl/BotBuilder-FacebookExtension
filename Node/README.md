# BotBuilder Facebook Extension (NodeJS)

## Features
* User Profile API

## Wishlist
* Referral handling (plugins, menu)
* Quick Replies
* Tags
* Webview
* (Application) Insights
* Get Started button / Menu button
* Account Linking

## Requirements
* [Microsoft BotBuilder](https://github.com/Microsoft/BotBuilder) (NodeJS)

## Getting Started
Install the package through NPM. `npm install botbuilder-facebookextension --save`. Choose which part of this package you would like to implement in your code.

### User Profile API 
In order to populate the userdata with the Facebook userdata, you can use this Middleware. It will automatically retrieve the data from Facebook and store it before your first reply. By default it will refresh the userdata every day, but you can change that by passing a settingsobject.

A required setting for the Middleware is the `accessToken` that you use in the Bot Framework settings. Optional setting are `fields` (array of [fieldnames](https://developers.facebook.com/docs/messenger-platform/user-profile)) and `expireMinutes` (number of minutes to cache data).

**Example (ES6)**
```javascript
import { RetrieveUserProfile } from 'botbuilder-facebookextension';

bot.use(
    RetrieveUserProfile({
        accessToken: 'PAGE_ACCESS_TOKEN',
        expireMinutes: 60, // OPTIONAL
        fields: ['first_name', 'last_name', 'gender'] // OPTIONAL
    })
);

bot.dialog('/', [
    (session, args, next) => {
        session.send(`Hi ${session.userData.first_name}!`); // The userData is prepopulated by the Middleware
    }
]);
```

### Referrals & Postbacks
Referrals and postbacks are a way to guide your user to a specific dialog, without starting a text chat first. With the ReferralRecognizer you are able to map a dialog to a specific referral or postback.

**Example (ES6)**
```javascript
import { ReferralRecognizer } from 'botbuilder-facebookextension';

bot.recognizer(
    new ReferralRecognizer() ({
        referral: true, // Optional
        postback: true, // Optional
        referralValue: true, // Optional
        postbackValue: true // Optional,
    })
);

// When users opens http://m.me/PageName?ref=coupon
bot.dialog('/coupon', [
    (session, args, next) => {
        session.endDialog(`Thanks for starting this chat through the referral link!`)
    }
]).triggerAction({
    matches: 'coupon'
});
```

## License
MIT