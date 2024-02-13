const express = require("express");
const socket = require("socket.io");

const app = express();
const server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening to requests on port "+ process.env.PORT);
});

// Archivos estaticos
app.use(express.static("public"));

// Socket setup
const io = socket(server);
io.on("connection", function (socket) {
  console.log("Made socket connection");
  socket.on("chat", function (data) {
    
    io.sockets.emit('chat', data)
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data)
  })
});
