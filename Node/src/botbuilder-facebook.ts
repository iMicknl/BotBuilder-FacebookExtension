import { RetrieveUserProfile } from './middleware/user-profile'
import { EventRecognizer } from './recognizers/event-recognizer';

declare var exports: any;

exports.FBUserProfile = RetrieveUserProfile;
exports.RetrieveUserProfile = RetrieveUserProfile;
exports.ReferralRecognizer = EventRecognizer;
exports.EventRecognizer = EventRecognizer;