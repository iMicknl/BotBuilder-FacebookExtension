"use strict";
exports.__esModule = true;
var request = require("request-promise-native");
var graphApiUrl = 'https://graph.facebook.com/v2.6';
var defaultFields = ['first_name', 'last_name', 'profile_pic', 'locale', 'timezone', 'gender', 'is_payment_enabled', 'last_ad_referral'];
exports.RetrieveUserProfile = function (options) {
    return {
        botbuilder: function (session, next) {
            if (session.message.source !== 'facebook') {
                next();
                return;
            }
            var userDataFields = session.userData;
            if (options.container && options.container.length > 0) {
                userDataFields[options.container] = {};
                userDataFields = userDataFields[options.container];
            }
            var expireMinutes = (options.expireMinutes !== undefined ? options.expireMinutes : 60 * 24) * 1000 * 60;
            var currentTime = new Date().getTime();
            var lastUpdated = userDataFields.facebook_last_updated;
            if (userDataFields.facebook_last_updated !== undefined && (lastUpdated + expireMinutes) >= currentTime) {
                next();
                return;
            }
            var fields = ((options.fields !== undefined && options.fields.length > 0) ? options.fields : defaultFields);
            var userProfileRequest = {
                url: graphApiUrl + "/" + session.message.address.user.id + "?fields=" + fields.join(),
                qs: { access_token: options.accessToken },
                method: 'GET',
                json: true
            };
            request(userProfileRequest)
                .then(function (user) {
                for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                    var field = fields_1[_i];
                    if (user[field] === undefined) {
                        continue;
                    }
                    userDataFields[field] = user[field];
                }
                userDataFields.facebook_last_updated = currentTime;
                next();
            })["catch"](function (response) {
                for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
                    var field = fields_2[_i];
                    userDataFields[field] = '';
                }
                if (response.error !== undefined) {
                    console.error(response.error);
                }
                else {
                    console.log(response);
                }
                next();
            });
        }
    };
};
