import { contact } from '../services/index';

let findUsers = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let searchKey = req.params.keyword;

    let users = await contact.findUsers(currentUserId, searchKey);
    return res.render('main/contact/sessions/searchResult', { users });
  } catch (error) {
    return res.status(500).send(error);
  }
};

let addNew = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let newContact = await contact.addNew(currentUserId, contactId);
    return res.status(200).send(newContact);
  } catch (error) {
    return res.status(500).send(error);
  }
};

let removeReqCon = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let removeCon = await contact.removeReqCon(currentUserId, contactId);
    return res.status(200).send(removeCon);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  findUsers: findUsers,
  addNew: addNew,
  removeReqCon: removeReqCon
};
