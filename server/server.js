const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const { generateMessage } = require('./utils/message')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcom to the chat app')
  )

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user joined')
  )

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    io.emit(
      'newMessage',
      generateMessage(message.from, message.text)
    )
    callback('this is from server')
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
