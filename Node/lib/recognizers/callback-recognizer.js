"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CallbackRecognizer = (function () {
    function CallbackRecognizer(recognizer, options) {
        if (options === void 0) { options = {}; }
        this.recognizer = recognizer;
        options.referral = (options.referral !== undefined ? options.referral : true);
        options.postback = (options.postback !== undefined ? options.postback : true);
        options.optin = (options.optin !== undefined ? options.optin : true);
        options.referralValue = (options.referralValue !== undefined ? options.referralValue : true);
        options.postbackValue = (options.postbackValue !== undefined ? options.postbackValue : true);
        options.optinValue = (options.optinValue !== undefined ? options.optinValue : true);
        this.options = options;
    }
    CallbackRecognizer.prototype.recognize = function (context, done) {
        var result = { score: 0.0, intent: null };
        if (context.message.source !== 'facebook') {
            done(null, result);
            return;
        }
        if (context.message.sourceEvent.referral !== undefined && this.options.referral) {
            var referral = context.message.sourceEvent.referral;
            var entity = {
                entity: referral.ref,
                type: 'referral',
                score: 1.0,
                facebook: referral
            };
            if (this.options.referralValue) {
                result.intent = referral.ref.toLowerCase();
            }
            else {
                result.intent = referral.type;
            }
            result.score = 1.0;
            result.entities = [entity];
            done(null, result);
            return;
        }
        if (context.message.sourceEvent.postback !== undefined && this.options.postback) {
            var postback = context.message.sourceEvent.postback;
            var entity = {
                entity: postback.payload,
                type: 'postback',
                score: 1.0,
                facebook: postback
            };
            if (this.options.postbackValue) {
                result.intent = postback.payload.toLowerCase();
            }
            else {
                result.intent = 'postback';
            }
            result.score = 1.0;
            result.entities = [entity];
            done(null, result);
            return;
        }
        if (context.message.sourceEvent.optin !== undefined && this.options.optin) {
            var optin = context.message.sourceEvent.optin;
            var entity = {
                entity: optin.ref,
                type: 'optin',
                score: 1.0,
                facebook: optin
            };
            if (this.options.postbackValue) {
                result.intent = optin.ref.toLowerCase();
            }
            else {
                result.intent = 'optin';
            }
            result.score = 1.0;
            result.entities = [entity];
            done(null, result);
            return;
        }
        done(null, result);
    };
    return CallbackRecognizer;
}());
exports.CallbackRecognizer = CallbackRecognizer;
