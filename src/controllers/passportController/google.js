import passport from 'passport';
import passportGG from 'passport-google-oauth';
import UserModel from '../../models/userModel';
import { transErrors, transSuccess } from '../../../lang/vi';

const GGStrategy = passportGG.OAuth2Strategy;

const ggAppId = process.env.GG_APP_ID;
const ggAppSecret = process.env.GG_APP_SECRET;
const ggCallbackUrl = process.env.GG_CALLBACK_URL;

const initPassportGG = () => {
  passport.use(
    new GGStrategy(
      {
        clientID: ggAppId,
        clientSecret: ggAppSecret,
        callbackURL: ggCallbackUrl,
        passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const user = await UserModel.findByGoogleUid(profile.id);
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
            google: {
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

module.exports = initPassportGG;
