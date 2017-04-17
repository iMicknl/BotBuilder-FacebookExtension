# BotBuilder Facebook Extension
A collection of useful Facebook add-ons for the Bot Builder SDK (NodeJS). This extension makes it easier to use specific Facebook Messenger Platform features inside your Microsoft Bot Framework project. 

## Features

### User Profile API
The [User Profile API](https://developers.facebook.com/docs/messenger-platform/user-profile) lets your bot get more information about the user and personalize their experience. The middleware automatically retrieves the User Profile data and stores it before the bot his first reply.

### Callbacks (referrals, optins & postbacks)
Facebook uses [referrals](https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral), [optins](https://developers.facebook.com/docs/messenger-platform/webhook-reference/optins) and [postbacks](https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback) to send a custom payload to your chatbot. We can use the payload of this callback to trigger a specific dialog without having to start a textchat first. With the CallbackRecognizer you are able to map a dialog to a specific callback or to process the payload data.

## Contribute [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/iMicknl/BotBuilder-FacebookExtension/pulls)

Currently only the BotBuilder NodeJS SDK is supported. Pull requests for C# support are welcome!

## License
MIT