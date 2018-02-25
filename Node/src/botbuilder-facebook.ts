export * from './middleware/user-profile'
export * from './recognizers/callback-recognizer';
export * from './types/message-tags';

// Deprecated since 1.2.0
export { CallbackRecognizer as ReferralRecognizer } from './recognizers/callback-recognizer';
export { CallbackRecognizer as EventRecognizer } from './recognizers/callback-recognizer';