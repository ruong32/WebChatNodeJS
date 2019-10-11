import passport from 'passport';
import passportLocal from 'passport-local';
import UserModel from '../../models/userModel';
import { transErrors, transSuccess } from '../../../lang/vi';

const LocalStrategy = passportLocal.Strategy;

const initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          const user = await UserModel.findByEmail(email);
          if (!user) {
            return done(
              null,
              false,
              req.flash('errors', transErrors.login_failed)
            );
          }
          if (!user.local.isActive) {
            return done(
              null,
              false,
              req.flash('errors', transErrors.account_not_active)
            );
          }

          const checkPassword = await user.comparePassword(password);
          if (!checkPassword) {
            return done(
              null,
              false,
              req.flash('errors', transErrors.login_failed)
            );
          }

          return done(
            null,
            user,
            req.flash('success', transSuccess.login_success(user.username))
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
    UserModel.findById(id, (err, user) => {
      return done(err, user);
    });
  });
};

module.exports = initPassportLocal;
