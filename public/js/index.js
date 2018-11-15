let socket = io();

socket.on('connect', function() {
    console.log('Connected to server')
    socket.emit('createEmail',{
        to:'elpoli@gmail.com',
        text:'Hey this is from client'
    })
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('newEmail', function(mail){
    console.log('Nuevo Email emitido', mail)
})