const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const { generateMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
let app = express();

let server = http.createServer((app))

let io = socketIO(server) 

app.use(express.static(publicPath))

io.on('connection', (socket) => { //Evento que se dispara cuando hay una nueva conexion
    console.log('new user connected') //Se establece la conexión entre del socket del servidos y el usuario cuando alguien nuevo entrá a la página
    
    socket.emit('newMessage', generateMessage('Admin', 'Wellcome to chat socket-io'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))
   

    // socket.on('createMessage',(message) => { //Evento customizadado que se dispara el emit con el mismo nombre del evento
    //     io.emit('newMessage', generateMessage(message.from, message.text))  //io.emit Emite un evento a todos los sockets activos en el momento
    // })

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