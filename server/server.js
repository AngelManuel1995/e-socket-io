const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer((app))
let io = socketIO(server) 

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('new user connected')

    socket.on('createMessage',(message) => {
        console.log('createMessage')
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        })
    })

    // socket.emit('newEmail',{
    //     from:'angel@gmail.com',
    //     text:'Este es un nuevo mensajo',
    //     createAt: new Date()
    // })

    // socket.on('createEmail', (email) => {
    //     console.log(email)
    // })

    // socket.emit('createMessage',{
    //     from:'Server',
    //     text:'This is a messaga from server',
    //     createdAt:123412
    // })

    // socket.on('createMessage', (message) => {
    //     console.log(message)
    // })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log('3000')
})