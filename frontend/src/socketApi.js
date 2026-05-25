export default socket => ({
  sendMessage: message => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('newMessage', message, (err, response) => {
      if (err) {
        reject(err)
      }
 else if (response?.status === 'ok') {
        resolve(response.data)
      }
 else {
        reject(new Error('Unknown error'))
      }
    })
  }),

  addChannel: channelData => new Promise((resolve, reject) => {
    console.log('=== [socketApi] Состояние сокета:', { id: socket.id, connected: socket.connected })

    socket.timeout(5000).emit('newChannel', channelData, (err, response) => {
      if (err) {
        reject(err)
      }
 else if (response?.status === 'ok') {
        resolve(response.data)
      }
 else {
        reject(new Error('Unknown error'))
      }
    })
  }),

  renameChannel: channelData => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('renameChannel', channelData, (err, response) => {
      if (err) {
        reject(err)
      }
 else if (response?.status === 'ok') {
        resolve(response.data)
      }
 else {
        reject(new Error('Unknown error'))
      }
    })
  }),

  removeChannel: id => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('removeChannel', { id }, (err, response) => {
      if (err) {
        reject(err)
      }
 else if (response?.status === 'ok') {
        resolve(response.data)
      }
 else {
        reject(new Error('Unknown error'))
      }
    })
  }),
})
