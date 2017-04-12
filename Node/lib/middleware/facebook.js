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
                var expireMinutes = (options.expireMinutes ? options.expireMinutes : 60 * 24);
                if (session.userData.facebook_last_updated === undefined || session.userData.facebook_last_updated < (new Date().getTime() - 1000 * 60 * expireMinutes)) {
                    var fields_1 = ((options.fields !== undefined && options.fields.length > 1) ? options.fields : defaultFields);
                    request({
                        url: graphApiUrl + "/" + session.message.address.user.id + "?fields=" + fields_1.join(),
                        qs: { access_token: options.accessToken },
                        method: 'GET'
                    }, function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                            var user = JSON.parse(body);
                            for (var _i = 0, fields_2 = fields_1; _i < fields_2.length; _i++) {
                                var field = fields_2[_i];
                                if (session.userData[field] === undefined) {
                                    continue;
                                }
                                session.userData[field] = user[field];
                            }
                            session.userData.facebook_last_updated = new Date().getTime();
                        }
                        else {
                            for (var _a = 0, fields_3 = fields_1; _a < fields_3.length; _a++) {
                                var field = fields_3[_a];
                                session.userData[field] = '';
                            }
                            console.error(error);
                        }
                    });
                }
                next();
            }
        };
    };
    return Facebook;
}());
exports.Facebook = Facebook;
