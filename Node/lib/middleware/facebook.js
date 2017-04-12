"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var graphApiUrl = 'https://graph.facebook.com/v2.6';
var defaultFields = ['first_name', 'last_name', 'profile_pic', 'locale', 'timezone', 'gender', 'is_payment_enabled', 'last_ad_referral'];
var Facebook = (function () {
    function Facebook() {
    }
    Facebook.userProfile = function (options) {
        return {
            botbuilder: function (session, next) {
                if (session.message.source !== 'facebook') {
                    next();
                    return;
                }
                var expireMinutes = (options.expireMinutes ? options.expireMinutes : 60 * 24) * 1000 * 60;
                var currentTime = new Date().getTime();
                if (session.userData.facebook_last_updated !== undefined && (currentTime - expireMinutes) < session.userData.facebook_last_updated) {
                    next();
                    return;
                }
                var fields = ((options.fields !== undefined && options.fields.length > 0) ? options.fields : defaultFields);
                request({
                    url: graphApiUrl + "/" + session.message.address.user.id + "?fields=" + fields.join(),
                    qs: { access_token: options.accessToken },
                    method: 'GET'
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var user = JSON.parse(body);
                        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                            var field = fields_1[_i];
                            if (user[field] === undefined) {
                                continue;
                            }
                            session.userData[field] = user[field];
                        }
                        session.userData.facebook_last_updated = new Date().getTime();
                    }
                    else {
                        for (var _a = 0, fields_2 = fields; _a < fields_2.length; _a++) {
                            var field = fields_2[_a];
                            session.userData[field] = '';
                        }
                        console.error(error);
                    }
                });
                next();
            }
        };
    };
    return Facebook;
}());
exports.Facebook = Facebook;
