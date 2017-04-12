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
Install the package through NPM. `npm install botbuilder-facebookextension --save`

### User Profile API
In order to populate the userdata with the Facebook userdata, you can use this Middleware. It will automatically retrieve the data from Facebook and store it before your first reply. By default it will refresh the userdata every day, but you can change that in the settings.

``` typescript
import { Facebook } from './middleware/facebook';

bot.use(Facebook.userProfile(
    {
        accessToken: 'PAGE_ACCESS_TOKEN',
        expireMinutes: 60, // OPTIONAL
        fields: ['first_name' ,'last_name', 'gender'] // OPTIONAL
    }
));
```

Possible settings for the Middleware are fields (array of fieldnames) and expireMinutes (number of minutes to cache).

## Contribute
TODO: Explain how other users and developers can contribute to make your code better. 
