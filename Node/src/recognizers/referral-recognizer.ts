import { IEntity, IIntentRecognizer, IRecognizeContext, IIntentRecognizerResult } from 'botbuilder';

//=========================================================
//
// Checkbox Plugin / Sends to Messenger
// https://developers.facebook.com/docs/messenger-platform/plugin-reference
//
// Get Started Button
// https://developers.facebook.com/docs/messenger-platform/messenger-profile/get-started-button
//
// Persistent Menu
// https://developers.facebook.com/docs/messenger-platform/messenger-profile/persistent-menu
//
// Refferal Callback
// https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral
//
// Postback Received Callback
// https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback
//
//=========================================================

export interface IReferralRecognizerOptions {
    referral?: boolean;
    postback?: boolean;

    referralValue?: boolean;
    postbackValue?: boolean;
}

export interface IFacebookReferralEntity extends IEntity {
    facebook: {
        ref: string,
        source: string,
        type: string
    }
}

export class ReferralRecognizer {

    private options: IReferralRecognizerOptions;

    constructor(private recognizer: IIntentRecognizer, options: IReferralRecognizerOptions = {}) {
        //Default options
        options.referral = (options.referral !== undefined ? options.referral : true);
        options.postback = (options.postback !== undefined ? options.postback : true);
        options.referralValue = (options.referralValue !== undefined ? options.referralValue : true);
        options.postbackValue = (options.postbackValue !== undefined ? options.postbackValue : true);

        this.options = options;
    }

    recognize(context: IRecognizeContext, done: (err: Error, result: IIntentRecognizerResult) => void) {
        let result = <IIntentRecognizerResult>{ score: 0.0, intent: null };

        // Check if source is Facebook
        if (context.message.source !== 'facebook') {
            done(null, result);
            return;
        }

        // Check if message contains referral
        if (context.message.sourceEvent.referral !== undefined && this.options.referral) {
            const referral = context.message.sourceEvent.referral;

            const entity = {
                entity: referral.ref,
                type: 'referral',
                score: 1.0,
                facebook: referral
            }

            if (this.options.referralValue) {
                result.intent = referral.ref;
            } else {
                result.intent = referral.type;
            }

            result.score = 1.0;
            result.entities = [entity];

            done(null, result);
            return;
        }

        // Check if message contains postback
        if (context.message.sourceEvent.postback !== undefined && this.options.postback) {
            const postback = context.message.sourceEvent.postback;

            const entity = {
                entity: postback.payload,
                type: 'referral',
                score: 1.0,
                facebook: postback.payload
            }

            if (this.options.postbackValue) {
                result.intent = postback.payload;
            } else {
                result.intent = 'POSTBACK';
            }

            result.score = 1.0;
            result.entities = [entity];

            done(null, result);
            return;
        }

        done(null, result);
    }
}