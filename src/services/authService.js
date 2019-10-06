import bcryptjs from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import UserModel from '../models/userModel';
import { transErrors, transSuccess } from '../../lang/vi';

const saltRounds = 7;

const register = (email, gender, password) => {
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
    resolve(transSuccess.userCreated(user.local.email));
  });
};

module.exports = {
  register: register
};
