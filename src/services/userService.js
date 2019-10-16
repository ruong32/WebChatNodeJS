import brcyptjs from 'bcryptjs';
import UserModel from '../models/userModel';
import { transErrors } from '../../lang/vi';

const saltRounds = 7;

let updateUser = (id, item) => {
  return UserModel.updateUser(id, item);
};

let updatePw = (id, item) => {
  return new Promise(async (resolve, rejects) => {
    let currentUser = await UserModel.findUserById(id);
    if (!currentUser) {
      return rejects(transErrors.user_not_found);
    }

    const checkCurrentPassword = await currentUser.comparePassword(
      item.currentPassword
    );
    if (!checkCurrentPassword) {
      return rejects(transErrors.password_incorrect);
    }

    let salt = brcyptjs.genSaltSync(saltRounds);
    await UserModel.updatePassword(
      id,
      brcyptjs.hashSync(item.newPassword, salt)
    );
    resolve(true);
  });
};

module.exports = {
  updateUser: updateUser,
  updatePw: updatePw
};
