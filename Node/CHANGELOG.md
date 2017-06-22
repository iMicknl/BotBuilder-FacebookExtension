# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 1.2.4 - 2017-06-23
### Changed
- Add basic support for Message Tags (not functional yet due to BotBuilder limitations)
- Rewrite documentation and examples to ES5 style

## 1.2.3 - 2017-06-10
### Changed
- Update dependencies

### Fixed
- Retrieval of User Profile now happens always in advance of the dialog (thanks @RespawnDespair)

## 1.2.2 - 2017-04-17
### Changed
- Update documentation 

## 1.2.1 - 2017-04-17
### Changed
- Renamed `EventRecognizer` to `CallbackRecognizer` (still backwards compatible)
- Update documentation

## 1.2.0 - 2017-04-16
### Added
- Added support for postins to EventRecognizer (previously ReferralRecognizer)

### Changed
- Renamed `ReferralRecognizer` to `EventRecognizer` (still backwards compatible)
- Fix wrong type on postback result

## 1.1.0 - 2017-04-15
### Added
- Recognizer for referrals and postbacks

### Changed
- Renamed `FBUserProfile` to `RetrieveUserProfile` (still backwards compatible).

## 1.0.0 - 2017-04-12
### Added
- Support for Facebook [User Profile API](https://developers.facebook.com/docs/messenger-platform/user-profile)
