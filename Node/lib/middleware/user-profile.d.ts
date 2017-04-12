import { IMiddlewareMap } from 'botbuilder';
export interface IFacebookUserProfileOptions {
    accessToken: string;
    fields?: Array<string>;
    expireMinutes?: number;
}
export declare const RetrieveUserProfile: (options: IFacebookUserProfileOptions) => IMiddlewareMap;
