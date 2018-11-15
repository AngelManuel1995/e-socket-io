let socket = io();

socket.on('connect', function() {
    console.log('Connected to server')
    // socket.emit('createEmail',{
    //     to:'elpoli@gmail.com',
    //     text:'Hey this is from client'
    // })

    // socket.emit('createMessage',{
    //     to:'Angel',
    //     text:'Nope',
    //     createdAt:123
    // })

    socket.on('newMessage', function(message){
        console.log(message)
    })
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('newEmail', function(mail){
    console.log('Nuevo Email emitido', mail)
})