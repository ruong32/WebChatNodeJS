import {
  pushSocketIdToArray,
  emitNotification,
  removeSocketIdFromArray
} from '../../helpers/socketHelpers';

let removeRequestContact = io => {
  let clients = {};
  io.on('connection', socket => {
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);
    socket.on('remove-request-contact', data => {
      let currentUser = {
        id: socket.request.user._id
      };

      if (clients[data.contactId]) {
        emitNotification(
          clients,
          data.contactId,
          io,
          'respond-remove-request-contact',
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

module.exports = removeRequestContact;
