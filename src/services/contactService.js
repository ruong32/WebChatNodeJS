import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';
import NotificationModel from '../models/notificationModel';

let findUsers = (currentUserId, searchKey) => {
  return new Promise(async (resolve, reject) => {
    let usersContacted = await ContactModel.findAllUserById(currentUserId);
    let userFilter = [];
    userFilter.push(currentUserId);
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

    // create notification
    let notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: NotificationModel.types.ADD_CONTACT
    };
    await NotificationModel.model.createNew(notificationItem);
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
    // remove notification

    resolve(true);
  });
};

module.exports = {
  findUsers: findUsers,
  addNew: addNew,
  removeReqCon: removeReqCon
};
