/*-----------------------------------------------------------------------------
Example: Message Tags
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
bot.dialog('/', [
    (session, args, next) => {
        let message = new builder.Message(session).text('This is a message with the ISSUE_RESOLUTION tag');
        facebook.AddMessageTag(message, facebook.MessageTags.ISSUE_RESOLUTION);

        session.send(message);
    }
]);