import { IEntity, IIntentRecognizer, IRecognizeContext, IIntentRecognizerResult } from 'botbuilder';
export interface IReferralRecognizerOptions {
    referral?: boolean;
    postback?: boolean;
    referralValue?: boolean;
    postbackValue?: boolean;
}
export interface IFacebookReferralEntity extends IEntity {
    facebook: {
        ref: string;
        source: string;
        type: string;
    };
}
export declare class ReferralRecognizer {
    private recognizer;
    private options;
    constructor(recognizer: IIntentRecognizer, options?: IReferralRecognizerOptions);
    recognize(context: IRecognizeContext, done: (err: Error, result: IIntentRecognizerResult) => void): void;
}
