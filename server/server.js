const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'john',
    text: 'see you then',
    createdAt: 12334
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail)
  })
})

app.use(express.static(publicPath))

server.listen(port, () => {
  console.log(`Server is up on ${port} port`)
})
