import { IMiddlewareMap } from 'botbuilder';
export interface IFacebookUserProfileOptions {
    accessToken: string;
    fields?: Array<string>;
    expireMinutes?: number;
}
export declare class Facebook {
    static userProfile(options: IFacebookUserProfileOptions): IMiddlewareMap;
}
