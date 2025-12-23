export default (socket) => ({
  sendMessage: (message) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('newMessage', message, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response?.status === 'ok') {
        resolve(response.data);
      } else {
        reject(new Error('Unknown error'));
      }
    });
  }),

  addChannel: (name) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('newChannel', name, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response?.status === 'ok') {
        resolve(response.data);
      } else {
        reject(new Error('Unknown error'));
      }
    });
  }),

  renameChannel: ({ id, name }) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('renameChannel', id, name, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response?.status === 'ok') {
        resolve(response.data);
      } else {
        reject(new Error('Unknown error'));
      }
    });
  }),

  removeChannel: (id) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('removeChannel', id, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response?.status === 'ok') {
        resolve(response.data);
      } else {
        reject(new Error('Unknown error'));
      }
    });
  }),
});
