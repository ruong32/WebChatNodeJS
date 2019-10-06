import express from 'express';
import { home, auth } from '../controllers/index';
import { authValid } from '../validation/index';

const router = express.Router();

const initRoutes = app => {
  router.get('/', home.getHome);
  router.get('/login-register', auth.getLoginRegister);
  router.post('/register', authValid.register, auth.postRegister);

  return app.use('/', router);
};

module.exports = initRoutes;
