import { Message } from 'botbuilder';
export declare const MessageTags: {
    SHIPPING_UPDATE: string;
    RESERVATION_UPDATE: string;
    ISSUE_RESOLUTION: string;
};
export declare const AddMessageTag: (message: Message, tag: string) => Message;
