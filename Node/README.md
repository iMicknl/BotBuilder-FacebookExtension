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
In order to populate the userdata with the Facebook userdata, you can use this middleware. It will automatically retrieve the data from Facebook and store it before your first reply. By default it will refresh the userdata every day, but you can change it via the settings object.

A required setting for the middleware is the `accessToken` that you use in the Bot Framework settings. Optional settings are `fields` (array of [fieldnames](https://developers.facebook.com/docs/messenger-platform/user-profile)) and `expireMinutes` (number of minutes to cache data).

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
With [referrals](https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral) and [postbacks](https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback) you can guide your user to a specific dialog, without having to start a textchat first. With the ReferralRecognizer you are able to map a dialog to a specific referral- or postback id. 

Supports: [Send to Messenger Plugin](https://developers.facebook.com/docs/messenger-platform/plugin-reference/send-to-messenger), [Get Started Button](https://developers.facebook.com/docs/messenger-platform/messenger-profile/get-started-button), [Persistent Menu](https://developers.facebook.com/docs/messenger-platform/messenger-profile/persistent-menu), [Referral link (m.me or ad)](https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral).

**Example (ES6)**
```javascript
import { ReferralRecognizer } from 'botbuilder-facebookextension';

bot.recognizer(
    new ReferralRecognizer() ({
        referral: true, // Optional - Enables the referral recognizer
        postback: true, // Optional - Enables the postback recognizer
        referralValue: true, // Optional - Uses referral as entity value
        postbackValue: true // Optional - Uses postback payload as entity value
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

It is possible to retrieve all values from the referral or postback object by retrieving the entity. You can retrieve the entity on the regular way, by requesting the `referral` or `postback` type. In this example you can see how to check the source of the referral, which can be shortlink (m.me) or ad.

```javascript
if (args.intent !== undefined && args.intent.entities !== undefined) {
    const entity = EntityRecognizer.findEntity(args.intent.entities, 'referral'); // or 'postback'
    console.log(entity.facebook.source); //SHORTLINK or AD
}
```

## License
MIT