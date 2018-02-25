import { IMiddlewareMap, Session, Message } from 'botbuilder';

//=========================================================
// Message Tags
// https://developers.facebook.com/docs/messenger-platform/send-api-reference/tags
//=========================================================

export const MessageTags = {
    PAIRING_UPDATE: 'PAIRING_UPDATE',
    APPLICATION_UPDATE: 'APPLICATION_UPDATE',
    ACCOUNT_UPDATE: 'ACCOUNT_UPDATE',
    PAYMENT_UPDATE: 'PAYMENT_UPDATE',
    PERSONAL_FINANCE_UPDATE: 'PERSONAL_FINANCE_UPDATE',
    SHIPPING_UPDATE: 'SHIPPING_UPDATE',
    RESERVATION_UPDATE: 'RESERVATION_UPDATE',
    ISSUE_RESOLUTION: 'ISSUE_RESOLUTION',
    APPOINTMENT_UPDATE: 'APPOINTMENT_UPDATE',
    GAME_EVENT: 'GAME_EVENT',
    TRANSPORTATION_UPDATE: 'TRANSPORTATION_UPDATE',
    FEATURE_FUNCTIONALITY_UPDATE: 'FEATURE_FUNCTIONALITY_UPDATE',
    TICKET_UPDATE: 'TICKET_UPDATE'
};

export const AddMessageTag = (message: Message, tag: string) => {

    message.sourceEvent({
        facebook: {
            messaging_type: 'MESSAGE_TAG',
            tag
        }
    });

    return message;
}

