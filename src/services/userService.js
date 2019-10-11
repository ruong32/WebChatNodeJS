import UserModel from '../models/userModel';

let updateUser = (id, item) => {
  return UserModel.updateUser(id, item);
};

module.exports = {
  updateUser: updateUser
};
