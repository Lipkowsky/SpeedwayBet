const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log(`User Connected: ${socket.id}`);
    socket.join(data.roomId);
    const users = io.sockets.adapter.rooms.get(data.roomId);

    socket.emit('joined_room', {
        message: `You joined room: ${data.roomId}`,
        roomId: data.roomId,
        usersNumber: users.size
    });

    

  });
});

server.listen(3001, () => {
  console.log("SERWER START");
});
