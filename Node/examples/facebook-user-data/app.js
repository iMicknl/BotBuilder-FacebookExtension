/*-----------------------------------------------------------------------------
Example: Facebook User Profile API
-----------------------------------------------------------------------------*/
import * as dotenv from 'dotenv'
dotenv.config();

import * as restify from 'restify';
import { ChatConnector, UniversalBot, Middleware } from 'botbuilder';
import { RetrieveUserProfile } from 'botbuilder-facebookextension';

//=========================================================
// Bot Setup
//=========================================================
// Configure ChatConnector
const connector = new ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
});

const bot = new UniversalBot(connector);

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

// Load middlware which handles the Facebook User Profile API requests
bot.use(RetrieveUserProfile({ accessToken: process.env.FacebookAccessToken }));

//=========================================================
// Bots Dialogs
//=========================================================
bot.dialog('/', [
    (session, args, next) => {
        // The userData is prepopulated by the Middleware
        session.send(`Hi ${session.userData.first_name}! You are a ${session.userData.gender} and you speak ${session.userData.locale}.`);
    }
]);