# BotBuilder Facebook Extension (NodeJS) [![npm version](https://badge.fury.io/js/botbuilder-facebookextension.svg)](https://badge.fury.io/js/botbuilder-facebookextension)

## Features
* User Profile API
* Referral, optin and postback handling

## Wishlist
* Quick Replies
* Tags
* Webview
* (Application) Insights
* Account Linking
* Sticker / Like Recognizer

## Requirements
* [Microsoft BotBuilder](https://github.com/Microsoft/BotBuilder) (NodeJS)

## Getting Started
Install the package through NPM. `npm install botbuilder-facebookextension --save`. Choose which part of this package you would like to implement in your code.

### User Profile API 
In order to populate the userdata with the Facebook userdata, you can use a middleware. It will automatically retrieve the data from Facebook and store it before your first reply. By default it will refresh the userdata every day, but you can change it by passing an amount of minutes to the settings object.

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

### Events
Facebook uses [referrals](https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral), [optins](https://developers.facebook.com/docs/messenger-platform/webhook-reference/optins) and [postbacks](https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback) to send a custom payload to your chatbot. We can use this payload to trigger a specific dialog without having to start a textchat first. With the EventRecognizer you are able to map a dialog to a specific referral-, postin- or postback payload. 

Supports: [Send to Messenger Plugin](https://developers.facebook.com/docs/messenger-platform/plugin-reference/send-to-messenger), [Get Started Button](https://developers.facebook.com/docs/messenger-platform/messenger-profile/get-started-button), [Persistent Menu](https://developers.facebook.com/docs/messenger-platform/messenger-profile/persistent-menu), [Referral link (m.me or ad)](https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral).

**Example (ES6)**
```javascript
import { EventRecognizer } from 'botbuilder-facebookextension';

bot.recognizer(
    new EventRecognizer({
        referral: true, // Optional - Enables the referral recognizer
        postback: true, // Optional - Enables the postback recognizer
        optin: true,    // Optional - Enables the optin recognizer
        referralValue: true, // Optional - Uses referral as entity value
        postbackValue: true, // Optional - Uses postback payload as entity value
        optinValue: true     // Optional - Uses optin referral as entity value
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
    const entity = EntityRecognizer.findEntity(args.intent.entities, 'referral'); // or 'postback' / 'optin'
    console.log(entity.facebook.source); //SHORTLINK or AD
}
```

## License
MIT