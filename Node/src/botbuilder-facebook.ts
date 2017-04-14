import { RetrieveUserProfile } from './middleware/user-profile'
import { ReferralRecognizer } from './recognizers/referral-recognizer';

declare var exports: any;

exports.FBUserProfile = RetrieveUserProfile;
exports.RetrieveUserProfile = RetrieveUserProfile;
exports.ReferralRecognizer = ReferralRecognizer;