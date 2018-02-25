import { Message } from 'botbuilder';
export declare const MessageTags: {
    PAIRING_UPDATE: string;
    APPLICATION_UPDATE: string;
    ACCOUNT_UPDATE: string;
    PAYMENT_UPDATE: string;
    PERSONAL_FINANCE_UPDATE: string;
    SHIPPING_UPDATE: string;
    RESERVATION_UPDATE: string;
    ISSUE_RESOLUTION: string;
    APPOINTMENT_UPDATE: string;
    GAME_EVENT: string;
    TRANSPORTATION_UPDATE: string;
    FEATURE_FUNCTIONALITY_UPDATE: string;
    TICKET_UPDATE: string;
};
export declare const AddMessageTag: (message: Message, tag: string) => Message;
