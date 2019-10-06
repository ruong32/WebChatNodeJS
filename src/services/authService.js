import bcryptjs from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import UserModel from '../models/userModel';
import { transErrors, transSuccess, transMail } from '../../lang/vi';
import sendMail from '../config/mailer';

const saltRounds = 7;

const register = (email, gender, password, protocol, host) => {
  return new Promise(async (resolve, reject) => {
    const userByEmail = await UserModel.findByEmail(email);
    if (userByEmail) {
      if (userByEmail.deleteAt != null) {
        return reject(transErrors.account_removed);
      }
      if (!userByEmail.local.isActive) {
        return reject(transErrors.account_not_active);
      }
      return reject(transErrors.account_in_use);
    }

    const salt = bcryptjs.genSaltSync(saltRounds);
    const userItem = {
      username: email.split('@')[0],
      gender: gender,
      local: {
        email: email,
        password: bcryptjs.hashSync(password, salt),
        verifyToken: uuidv4()
      }
    };

    const user = await UserModel.createNew(userItem);
    const linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
    // send comfirmation email
    sendMail(email, transMail.subject, transMail.template(linkVerify))
      .then(sucess => {
        resolve(transSuccess.userCreated(user.local.email));
      })
      .catch(async err => {
        // remove user
        await UserModel.removeById(user._id);
        console.log(err);
        reject(transMail.send_failed);
      });
  });
};

const verifyAccount = token => {
  return new Promise(async (resolve, reject) => {
    const userByToken = await UserModel.findByToken(token);
    if (!userByToken) {
      return reject(transErrors.token_null);
    }
    await UserModel.verify(token);
    resolve(transSuccess.account_actived);
  });
};

module.exports = {
  register: register,
  verifyAccount: verifyAccount
};
