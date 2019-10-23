/* eslint-disable no-param-reassign */
export const pushSocketIdToArray = (clients, userId, socketId) => {
  if (clients[userId]) {
    clients[userId].push(socketId);
  } else {
    clients[userId] = [socketId];
  }
  return clients;
};

export const emitNotification = (clients, userId, io, event, data) => {
  clients[userId].forEach(socketId =>
    io.sockets.connected[socketId].emit(event, data)
  );
};

export const removeSocketIdFromArray = (clients, userId, socket) => {
  clients[userId] = clients[userId].filter(socketId => socketId !== socket.id);
  if (!clients[userId].length) {
    delete clients[userId];
  }
  return clients;
};
