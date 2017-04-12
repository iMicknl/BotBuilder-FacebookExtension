# BotBuilder Facebook Extension

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
* Microsoft Bot Framework (NodeJS)

## Getting Started
Install the package through NPM. `npm install botbuilder-facebookextension --save`. Choose which part of this package you would like to implement in your code.

### User Profile API 
In order to populate the userdata with the Facebook userdata, you can use this Middleware. It will automatically retrieve the data from Facebook and store it before your first reply. By default it will refresh the userdata every day, but you can change that by passing a settingsobject.

A required setting for the Middleware is the `accessToken` that you use in the Bot Framework settings. Optional setting are `fields` (array of [fieldnames](https://developers.facebook.com/docs/messenger-platform/user-profile)) and `expireMinutes` (number of minutes to cache data).

Example:
```typescript
import { Facebook } from './middleware/facebook';

bot.use(Facebook.userProfile(
    {   
        accessToken: 'PAGE_ACCESS_TOKEN',
        expireMinutes: 60, // OPTIONAL
        fields: ['first_name' ,'last_name', 'gender'] // OPTIONAL
    }
));

bot.dialog('/', [
    (session: Session, args: any, next) => {
        session.send(`Hi ${session.userData.first_name}!`); // The userData is prepopulated by the Middleware
    }
]);
```

## Contribute
TODO: Explain how other users and developers can contribute to make your code better. 