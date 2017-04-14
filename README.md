# BotBuilder Facebook Extension
A collection of useful Facebook add-ons for the Bot Builder SDK (NodeJS). This extension makes it easier to use Facebook only features inside your Microsoft Bot Framework project. 

## Features

### User Profile API
The [User Profile API](https://developers.facebook.com/docs/messenger-platform/user-profile) lets your bot get more information about the user and personalize their experience. The middleware automatically retrieves the User Profile data and stores it before the bot his first reply.

### Referrals & Postbacks
With [referrals](https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral) and [postbacks](https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback) you can guide your user to a specific dialog, without having to start a textchat first. With the ReferralRecognizer you are able to map a dialog to a specific referral- or postback id. 

## Contribute
Currently only the BotBuilder NodeJS SDK is supported. Pull requests for C# support are welcome!

## License
MIT