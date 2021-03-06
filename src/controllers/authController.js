import { validationResult } from 'express-validator/check';
import { auth } from '../services/index';
import { transSuccess } from '../../lang/vi';

const getLoginRegister = (req, res) => {
  return res.render('auth/master', {
    errors: req.flash('errors'),
    success: req.flash('success')
  });
};

const postRegister = async (req, res) => {
  const errorArr = [];
  const successArr = [];

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    req.flash('errors', errorArr);
    return res.redirect('login-register');
  }
  try {
    const createUserSuccessfully = await auth.register(
      req.body.email,
      req.body.gender,
      req.body.password,
      req.protocol,
      req.get('host')
    );
    successArr.push(createUserSuccessfully);
    req.flash('success', successArr);
    return res.redirect('/login-register');
  } catch (error) {
    errorArr.push(error);
    req.flash('errors', errorArr);
    return res.redirect('/login-register');
  }
};

const verifyAccount = async (req, res) => {
  const errorArr = [];
  const successArr = [];
  try {
    const verifySuccess = await auth.verifyAccount(req.params.token);
    successArr.push(verifySuccess);

    req.flash('success', successArr);
    return res.redirect('/login-register');
  } catch (error) {
    errorArr.push(error);
    req.flash('errors', errorArr);
    return res.redirect('/login-register');
  }
};

const getLogout = (req, res) => {
  req.logout(); // remove session passort user
  req.flash('success', transSuccess.logout_success);
  return res.redirect('/login-register');
};

const checkLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login-register');
  }
  next();
};

const checkLogout = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
  next();
};

module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister,
  verifyAccount: verifyAccount,
  getLogout: getLogout,
  checkLogin: checkLogin,
  checkLogout: checkLogout
};
