import { IEntity, IIntentRecognizer, IRecognizeContext, IIntentRecognizerResult } from 'botbuilder';

//=========================================================
//
// Checkbox Plugin / Send to Messenger
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
// Optin Callback
// https://developers.facebook.com/docs/messenger-platform/webhook-reference/optins
//
//=========================================================

export interface ICallbackRecognizerOptions {
    referral?: boolean;
    postback?: boolean;
    optin?: boolean;

    referralValue?: boolean;
    postbackValue?: boolean;
    optinValue?: boolean;
}

export interface IFacebookReferralEntity extends IEntity {
    facebook: {
        ref: string,
        source: string,
        type: string
    }
}

export class CallbackRecognizer {

    private options: ICallbackRecognizerOptions;

    constructor(private recognizer: IIntentRecognizer, options: ICallbackRecognizerOptions = {}) {
        //Default options
        options.referral = (options.referral !== undefined ? options.referral : true);
        options.postback = (options.postback !== undefined ? options.postback : true);
        options.optin = (options.optin !== undefined ? options.optin : true);
        options.referralValue = (options.referralValue !== undefined ? options.referralValue : true);
        options.postbackValue = (options.postbackValue !== undefined ? options.postbackValue : true);
        options.optinValue = (options.optinValue !== undefined ? options.optinValue : true);

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
                result.intent = referral.ref.toLowerCase();
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
                type: 'postback',
                score: 1.0,
                facebook: postback
            }

            if (this.options.postbackValue) {
                result.intent = postback.payload.toLowerCase();
            } else {
                result.intent = 'postback';
            }

            result.score = 1.0;
            result.entities = [entity];

            done(null, result);
            return;
        }

        // Check if message contains optin
        if (context.message.sourceEvent.optin !== undefined && this.options.optin) {
            const optin = context.message.sourceEvent.optin;

            const entity = {
                entity: optin.ref,
                type: 'optin',
                score: 1.0,
                facebook: optin
            }

            if (this.options.postbackValue) {
                result.intent = optin.ref.toLowerCase();
            } else {
                result.intent = 'optin';
            }

            result.score = 1.0;
            result.entities = [entity];

            done(null, result);
            return;
        }

        done(null, result);
    }
}