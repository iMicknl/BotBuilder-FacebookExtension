/*-----------------------------------------------------------------------------
Example: Facebook Referral & Postback
-----------------------------------------------------------------------------*/
const dotenv = require('dotenv');
const restify = require('restify');

const builder = require('botbuilder');
const facebook = require('botbuilder-facebookextension');

//=========================================================
// Bot Setup
//=========================================================
// Configure ChatConnector
const connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
});

const bot = new builder.UniversalBot(connector);

// Load CallbackRecognizer, can be used together with other recognizers like LuisRecognizer
bot.recognizer(new facebook.CallbackRecognizer());

//=========================================================
// Server Setup
//=========================================================
// Setup Restify Server
const server = restify.createServer();

// Setup endpoint for incoming messages which will be passed to the bot's ChatConnector.
server.post('/api/messages', connector.listen());

// Start server
server.listen(process.env.PORT || 3978, () => {
    console.log(`Bot Framework listening to ${server.url}`);
});

//=========================================================
// Bots Middleware
//=========================================================
// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
bot.use(builder.Middleware.sendTyping());

//=========================================================
// Bots Dialogs
//=========================================================

// Default
bot.dialog('/', [
    (session, args, next) => {
        session.send(`Hi!`);
    }
]);

// Referral
// Invoke via http://m.me/PAGENAME?ref=coupon
bot.dialog('/coupon', [
    (session, args, next) => {
        session.endDialog(`Thanks for starting this chat through the coupon referral link!`)
    }
]).triggerAction({
    matches: 'coupon'
});

// Postback
// Invoke by pressing Get Started button or a menu option
// Make sure you set the correct payload for the Get Started button!
bot.dialog('/get-started', [
    (session, args, next) => {
        session.endDialog(`Thanks for pressing the Get Started button! ;-)`)
    }
]).triggerAction({
    matches: 'payload_get_started'
});

// Optin
// Invoke by pressing 'Send to Messenger Plugin' button
// Make sure you set the correct payload in the Send to Messenger plugin!
bot.dialog('/send-to-messenger', [
    (session, args, next) => {
        session.endDialog(`Thanks for pressing the Send to Messenger plugin! <3`)
    }
]).triggerAction({
    matches: 'pass_through_param'
});

