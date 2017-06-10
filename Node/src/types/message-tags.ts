import { IMiddlewareMap, Session, Message } from 'botbuilder';

//=========================================================
// Message Tags
// https://developers.facebook.com/docs/messenger-platform/send-api-reference/tags
//=========================================================

export const MessageTags = {
    SHIPPING_UPDATE: 'SHIPPING_UPDATE',
    RESERVATION_UPDATE: 'RESERVATION_UPDATE',
    ISSUE_RESOLUTION: 'ISSUE_RESOLUTION'
};

export const AddMessageTag = (message: Message, tag: string) => {

    message.sourceEvent({
        facebook: {
            tag
        }
    });

    return message;
}

