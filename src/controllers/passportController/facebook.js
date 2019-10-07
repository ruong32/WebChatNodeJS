import passport from 'passport';
import passportFB from 'passport-facebook';
import UserModel from '../../models/userModel';
import { transErrors, transSuccess } from '../../../lang/vi';

const FBStrategy = passportFB.Strategy;

const fbAppId = process.env.FB_APP_ID;
const fbAppSecret = process.env.FB_APP_SECRET;
const fbCallbackUrl = process.env.FB_CALLBACK_URL;

const initPassportFB = () => {
  passport.use(
    new FBStrategy(
      {
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbCallbackUrl,
        passReqToCallback: true,
        profileFields: ['email', 'gender', 'displayName']
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const user = await UserModel.findByFacebookUid(profile.id);
          if (user) {
            return done(
              null,
              user,
              req.flash('success', transSuccess.login_success(user.username))
            );
          }

          const newUserItem = {
            username: profile.displayName,
            gender: profile.gender,
            local: { isActive: true },
            facebook: {
              uid: profile.id,
              token: accessToken,
              email: profile.emails[0].value
            }
          };

          const newUser = await UserModel.createNew(newUserItem);
          return done(
            null,
            newUser,
            req.flash('success', transSuccess.login_success(newUser.username))
          );
        } catch (error) {
          console.log(error);
          return done(
            null,
            false,
            req.flash('errors', transErrors.server_error)
          );
        }
      }
    )
  );

  // save user's id to session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    const user = UserModel.findUserById(id);
    return done(null, user);
  });
};

module.exports = initPassportFB;
