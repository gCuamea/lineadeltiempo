const socket = io();

// QUERY DOM
const message = document.getElementById('message')
const handle = document.getElementById('handle')
const btn = document.getElementById('send')
const output = document.getElementById('output')

btn.addEventListener('click', function() {
    socket.emit('chat', {
        mensaje: message.value,
        usuario: handle.value,
        fecha: new Date().toLocaleString()
    })
})

socket.on("clientLoad", (data) => {
    console.log('data', data);
    data.forEach((data) => {
        output.innerHTML += `<p><strong>${data.fecha} ${data.usuario}: </strong>${data.mensaje}</p>`
    })
})

socket.on('chat', function(data) {
    output.innerHTML += `<p>${data.fecha}<strong> ${data.usuario}: </strong>${data.mensaje}</p>`
})

socket.on('typing', function(data) {
    feedback.innerHTML = `<p><em>${data} esta escribiendo un mensaje</em></p>`
})