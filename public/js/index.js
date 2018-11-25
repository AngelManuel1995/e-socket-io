let socket = io();

socket.on('connect', function() { //Este evento corresponde o escucha a connection 
    socket.on('newMessage', function(message){
        console.log(message)
    })
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
    let li = document.createElement('LI')
    li.textContent = `${message.from}: ${message.text}`
    document.getElementById('messages').appendChild(li)
})

document.querySelector('#message-form').addEventListener('submit', function(ev){
    ev.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: ev.target.elements[0].value
    }, function(message){
       
    })
})