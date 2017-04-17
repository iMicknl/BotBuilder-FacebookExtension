import { RetrieveUserProfile } from './middleware/user-profile'
import { CallbackRecognizer } from './recognizers/callback-recognizer';

declare var exports: any;

exports.FBUserProfile = RetrieveUserProfile;
exports.RetrieveUserProfile = RetrieveUserProfile;
exports.ReferralRecognizer = CallbackRecognizer;
exports.EventRecognizer = CallbackRecognizer;
exports.CallbackRecognizer = CallbackRecognizer;