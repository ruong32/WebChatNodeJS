import {
  pushSocketIdToArray,
  emitNotification,
  removeSocketIdFromArray
} from '../../helpers/socketHelpers';

let addNewContact = io => {
  let clients = {};
  io.on('connection', socket => {
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);
    socket.on('add-new-contact', data => {
      let currentUser = {
        id: socket.request.user._id,
        username: socket.request.user.username,
        avatar: socket.request.user.avatar
      };

      if (clients[data.contactId]) {
        emitNotification(
          clients,
          data.contactId,
          io,
          'respond-add-new-contact',
          currentUser
        );
      }
    });
    socket.on('disconnect', () => {
      clients = removeSocketIdFromArray(
        clients,
        socket.request.user._id,
        socket
      );
    });
  });
};

module.exports = addNewContact;
