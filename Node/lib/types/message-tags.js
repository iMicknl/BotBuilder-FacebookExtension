"use strict";
exports.__esModule = true;
exports.MessageTags = {
    SHIPPING_UPDATE: 'SHIPPING_UPDATE',
    RESERVATION_UPDATE: 'RESERVATION_UPDATE',
    ISSUE_RESOLUTION: 'ISSUE_RESOLUTION'
};
exports.AddMessageTag = function (message, tag) {
    message.sourceEvent({
        facebook: {
            tag: tag
        }
    });
    return message;
};
