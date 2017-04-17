import { IEntity, IIntentRecognizer, IRecognizeContext, IIntentRecognizerResult } from 'botbuilder';
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
        ref: string;
        source: string;
        type: string;
    };
}
export declare class CallbackRecognizer {
    private recognizer;
    private options;
    constructor(recognizer: IIntentRecognizer, options?: ICallbackRecognizerOptions);
    recognize(context: IRecognizeContext, done: (err: Error, result: IIntentRecognizerResult) => void): void;
}
