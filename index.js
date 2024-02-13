const express = require("express");
const socket = require("socket.io");

const app = express();
const server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening to requests on port "+ process.env.PORT);
});

const mensajes = [{usuario: 'Aldo', mensaje: 'Buenos dias familia', fecha: '13/2/2024, 08:10:05 '}]

// Archivos estaticos
app.use(express.static("public"));

// Socket setup
const io = socket(server);
io.on("connection", function (socket) {
  console.log("Made socket connection");
  socket.on("chat", function (data) {
    mensajes.push(data)
    io.sockets.emit('chat', data)
  });
  socket.emit("clientLoad", mensajes)
});
