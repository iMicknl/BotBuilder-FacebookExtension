"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReferralRecognizer = (function () {
    function ReferralRecognizer(recognizer, options) {
        if (options === void 0) { options = {}; }
        this.recognizer = recognizer;
        options.referral = (options.referral !== undefined ? options.referral : true);
        options.postback = (options.postback !== undefined ? options.postback : true);
        options.referralValue = (options.referralValue !== undefined ? options.referralValue : true);
        options.postbackValue = (options.postbackValue !== undefined ? options.postbackValue : true);
        this.options = options;
    }
    ReferralRecognizer.prototype.recognize = function (context, done) {
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
                result.intent = referral.ref;
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
                type: 'referral',
                score: 1.0,
                facebook: postback.payload
            };
            if (this.options.postbackValue) {
                result.intent = postback.payload;
            }
            else {
                result.intent = 'POSTBACK';
            }
            result.score = 1.0;
            result.entities = [entity];
            done(null, result);
            return;
        }
        done(null, result);
    };
    return ReferralRecognizer;
}());
exports.ReferralRecognizer = ReferralRecognizer;
