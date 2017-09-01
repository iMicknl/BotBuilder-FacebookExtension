import { IMiddlewareMap, Session, IMessage } from 'botbuilder';
import * as request from 'request-promise';

//=========================================================
// User Profile API
// https://developers.facebook.com/docs/messenger-platform/user-profile
//=========================================================

export interface IFacebookUserProfileOptions {
    accessToken: string;
    fields?: Array<string>;
    expireMinutes?: number;
    container?: string;
}

const graphApiUrl = 'https://graph.facebook.com/v2.6';
const defaultFields = ['first_name', 'last_name', 'profile_pic', 'locale', 'timezone', 'gender', 'is_payment_enabled', 'last_ad_referral'];

export const RetrieveUserProfile = (options: IFacebookUserProfileOptions): IMiddlewareMap => {

    return {
        botbuilder: (session: Session, next: Function) => {

            // Check if source is Facebook
            if (session.message.source !== 'facebook') {
                next();
                return;
            }
            
            let userDataFields = session.userData;
            if(options.container && options.container.length > 0){
                userDataFields[options.container] = {};
                userDataFields = userDataFields[options.container];
            }
            const expireMinutes = (options.expireMinutes !== undefined ? options.expireMinutes : 60 * 24) * 1000 * 60;
            const currentTime = new Date().getTime();
            const lastUpdated = userDataFields.facebook_last_updated;

            // Skip if cached
            if (userDataFields.facebook_last_updated !== undefined && (lastUpdated + expireMinutes) >= currentTime) {
                next();
                return;
            }

            const fields = ((options.fields !== undefined && options.fields.length > 0) ? options.fields : defaultFields);

            // Retrieve new profile data
            const userProfileRequest = {
                url: `${graphApiUrl}/${session.message.address.user.id}?fields=${fields.join()}`,
                qs: { access_token: options.accessToken },
                method: 'GET',
                json: true
            };

            request(userProfileRequest)
                .then((user: any) => {
                    // Save profile to userData
                    for (let field of fields) {
                        // Check if field exists
                        if (user[field] === undefined) {
                            continue;
                        }

                        userDataFields[field] = user[field];
                    }

                    // Add current time
                    userDataFields.facebook_last_updated = currentTime;

                    next();
                })

                .catch((response) => {
                    for (let field of fields) {
                        userDataFields[field] = '';
                    }

                    if (response.error !== undefined) {
                        console.error(response.error);
                    } else {
                        console.log(response);
                    }

                    next();
                });

        }
    }
}