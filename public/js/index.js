const socket = io()
socket.on('connect', () => {
  console.log('connected to server');
})

socket.on('disconnect', () => {
  console.log('Unable to connect from server');
})

socket.on('newMessage', (message) => {
  console.log('newMessage', message)
  const li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (data) {
    console.log('Got it', data)
  })
})
