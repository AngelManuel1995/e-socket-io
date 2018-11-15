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

io.on('connection', (socket) => { //Evento que se dispara cuando hay una nueva conexion
    console.log('new user connected')

    socket.emit('newMessage', {
        from:'Admin',
        text:'Wellcome to chat socket-io',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from:'Admin',
        text:'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage',(message) => { //Evento customizadado que se dispara el emit con el mismo nombre del evento
        console.log('createMessage')
        io.emit('newMessage', { //io.emit Emite un evento a todos los sockets activos en el momento
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

    socket.on('disconnect', () => { //Evento que se dispara cuando un una persona se desconecta
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log('3000')
})