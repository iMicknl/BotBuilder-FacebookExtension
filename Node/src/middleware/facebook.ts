import { IMiddlewareMap, Session, IMessage } from 'botbuilder';
import * as request from 'request';

//=========================================================
// User Profile API
// https://developers.facebook.com/docs/messenger-platform/user-profile
//=========================================================

export interface IFacebookUserProfileOptions {
    accessToken: string;
    fields?: Array<string>;
    expireMinutes?: number;
}

const graphApiUrl = 'https://graph.facebook.com/v2.6';
const defaultFields = ['first_name', 'last_name', 'profile_pic', 'locale', 'timezone', 'gender', 'is_payment_enabled', 'last_ad_referral'];

export class Facebook {

    static userProfile(options: IFacebookUserProfileOptions): IMiddlewareMap {

        return {
            botbuilder: (session: Session, next: Function) => {

                // Check if source is Facebook
                if (session.message.source !== 'facebook') {
                    next();
                    return;
                }

                const expireMinutes = (options.expireMinutes ? options.expireMinutes : 60 * 24);

                if (session.userData.facebook_last_updated === undefined || session.userData.facebook_last_updated < (new Date().getTime() - 1000 * 60 * expireMinutes)) {

                    const fields = ((options.fields !== undefined && options.fields.length > 1) ? options.fields : defaultFields);
           
                    request({
                        url: `${graphApiUrl}/${session.message.address.user.id}?fields=${fields.join()}`,
                        qs: { access_token: options.accessToken },
                        method: 'GET'
                    }, (error, response, body) => {
                        if (!error && response.statusCode === 200) {
                            const user = JSON.parse(body);

                            // Save profile to userData
                            for (let field of fields) {
                                // Check if field exists
                                if (session.userData[field] === undefined) {
                                    continue;
                                }

                                session.userData[field] = user[field];
                            }

                            // Add current time
                            session.userData.facebook_last_updated = new Date().getTime();
                        } else {
                            // Set default values
                            for (let field of fields) {
                                session.userData[field] = '';
                            }

                            console.error(error);
                        }
                    });
                }

                next();

            }
        };
    }

}