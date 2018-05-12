const socket = io()
socket.on('connect', () => {
  console.log('connected to server');

  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'Hey'
  })

  socket.emit('createMessage', {
    from: 'Andrew',
    text: 'Yup'
  })
})

socket.on('disconnect', () => {
  console.log('Unable to connect from server');
})

socket.on('newMessage', (message) => {
  console.log('newMessage', message)
})
