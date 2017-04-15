/*-----------------------------------------------------------------------------
Example: Facebook Referral & Postback
-----------------------------------------------------------------------------*/
import * as dotenv from 'dotenv'
dotenv.config();

import * as restify from 'restify';
import { ChatConnector, UniversalBot, Middleware } from 'botbuilder';
import { EventRecognizer } from 'botbuilder-facebookextension';

//=========================================================
// Bot Setup
//=========================================================
// Configure ChatConnector
const connector = new ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
});

const bot = new UniversalBot(connector);

// Load EventRecognizer, can be used together with other recognizers like LUISRecognizer
bot.recognizer(new EventRecognizer());

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
bot.use(Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
bot.use(Middleware.sendTyping());

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
// Invoke by pressing get started button or a menu option
// Make sure you set the correct payload for the get started button!
bot.dialog('/get-started', [
    (session, args, next) => {
        session.endDialog(`Thanks for pressing the Get Started button! ;-)`)
    }
]).triggerAction({
    matches: 'payload_get_started'
});

// Postback
// Invoke by pressing get started button
// Make sure you set the correct payload for the Send to Messenger plugin!
bot.dialog('/send-to-messenger', [
    (session, args, next) => {
        session.endDialog(`Thanks for pressing the Send to Messenger plugin! <3`)
    }
]).triggerAction({
    matches: 'pass_through_param'
});

