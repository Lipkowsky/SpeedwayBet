const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("./db");
app.use(cors());
const server = http.createServer(app);
const moongose2 = require("mongoose");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

const { Schema } = moongose2;

const serverList = new Schema({
  roomId: String,
  raceValue: String,
  gameStatus: String,
});
const ServerList = mongoose.model("ServerList", serverList);

io.on("connection", async (socket) => {
  socket.on("join_room", async (data) => {
    console.log(`User Connected: ${socket.id}`);
    socket.join(data.roomId);

    try {
      const tryFindServer = await ServerList.findOne({
        roomId: data.roomId,
      });
      if (tryFindServer === null) {
        const doc = new ServerList({ roomId: data.roomId });
        doc.save();
      }
    } catch (error) {
      console.log(error);
    }

    const users = io.sockets.adapter.rooms.get(data.roomId);

    socket.emit("joined_room", {
      message: `You joined room: ${data.roomId}`,
      roomId: data.roomId,
      usersNumber: users.size,
    });
  });
  // #################################################################################
  socket.on("select_race_value", async (data) => {
    const update = await ServerList.findOneAndUpdate(
      {
        roomId: data.roomId,
      },
      {
        raceValue: data.raceValue,
      },
      { new: true }
    );
  });
  socket.on("start_game", async (data) => {
    console.log("START GRY");
    const update = await ServerList.findOneAndUpdate(
      {
        roomId: data.roomId,
      },
      {
        gameStatus: "START",
      },
      { new: true }
    );

    const server = await ServerList.findOne({
      roomId: data.roomId,
    });
 
    io.in(data.roomId).emit(data.roomId, server);
  });
});

server.listen(3001, () => {
  console.log("SERWER START");
});
