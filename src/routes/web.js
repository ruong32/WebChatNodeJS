import express from 'express';
import passport from 'passport';
import { home, auth } from '../controllers/index';
import { authValid } from '../validation/index';
import initPassportLocal from '../controllers/passportController/local';

// init all passport
initPassportLocal();

const router = express.Router();

const initRoutes = app => {
  router.get('/login-register', auth.checkLogout, auth.getLoginRegister);
  router.post(
    '/register',
    auth.checkLogout,
    authValid.register,
    auth.postRegister
  );
  router.get('/verify/:token', auth.checkLogout, auth.verifyAccount);
  router.post(
    '/login',
    auth.checkLogout,
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login-register',
      successFlash: true,
      failureFlash: true
    })
  );
  router.get('/', auth.checkLogin, home.getHome);
  router.get('/logout', auth.checkLogin, auth.getLogout);

  return app.use('/', router);
};

module.exports = initRoutes;
