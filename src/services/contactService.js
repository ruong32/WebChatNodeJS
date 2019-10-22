import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';

let findUsers = (currentUserId, searchKey) => {
  return new Promise(async (resolve, reject) => {
    let usersContacted = await ContactModel.findAllUserById(currentUserId);
    let userFilter = [];
    if (usersContacted) {
      userFilter.push(usersContacted[0].userId);
    }
    usersContacted.forEach(user => {
      userFilter.push(user.contactId);
    });
    let contacts = await UserModel.findUserForAdding(userFilter, searchKey);
    resolve(contacts);
  });
};

let addNew = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    const newContactItem = {
      userId: currentUserId,
      contactId: contactId
    };
    let newContact = await ContactModel.createNew(newContactItem);
    resolve(newContact);
  });
};

let removeReqCon = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeReq = await ContactModel.removeRequestContact(
      currentUserId,
      contactId
    );
    if (removeReq.n === 0) {
      return reject(false);
    }
    resolve(true);
  });
};

module.exports = {
  findUsers: findUsers,
  addNew: addNew,
  removeReqCon: removeReqCon
};
