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
  phase: String,
  players: Array,
  currentRace: String,
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
    socket.to(data.roomId).emit("updateNumerOfUsers", {
      message: `Someone joined to: ${data.roomId}`,
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
    const update = await ServerList.findOneAndUpdate(
      {
        roomId: data.roomId,
      },
      {
        gameStatus: "STARTED",
        phase: "1",
        currentRace: 1,
      },
      { new: true }
    );

    const users = [...io.sockets.adapter.rooms.get(data.roomId)];

    for (let [index, user] of users.entries()) {
      if (index === 0) {
        const updateServerStatus = await ServerList.findOneAndUpdate(
          {
            roomId: data.roomId,
          },
          {
            $push: {
              players: {
                id: user,
                selectedOptions: false,
                host: true,
              },
            },
          },
          { new: true }
        );
      }
      if (index !== 0) {
        const updateServerStatus = await ServerList.findOneAndUpdate(
          {
            roomId: data.roomId,
          },
          {
            $push: {
              players: {
                id: user,
                selectedOptions: false,
                host: false,
              },
            },
          },
          { new: true }
        );
      }
    }

    const server = await ServerList.findOne({
      roomId: data.roomId,
    });

    io.in(data.roomId).emit(data.roomId, server);
  });

  socket.on("save_race", async (data) => {
    // ZAPISZ WYBORY UŻYTKOWNIKA
    await ServerList.updateOne(
      { roomId: data.roomId, "players.id": socket.id },
      {
        $set: {
          "players.$.selectedOptions": true,
          "players.$.options": data.choices,
        },
      }
    );

    // WYŚLIJ DO NIEGO KOMUNIKAT O OCZEKIWANIU NA WYBÓR INNYCH
    socket.emit("set_game_status", {
      gameStatus: "LOADING",
    });

    const server = await ServerList.findOne({
      roomId: data.roomId,
    });
    // JEŚLI WSZYSCY ZAZNACZYLI ODPOWIEDŹ TO PRZEJDZ DO PODAWANIA WYNIKÓW
    if (server.players.every((e) => e.selectedOptions)) {
      io.in(data.roomId).emit("set_game_status", {
        gameStatus: "WAIT_FOR_RESULTS",
      });
    }
  });

  socket.on("saveHostRaceResult", async (data) => {
    const results = data.currentResults;
    console.log(results);
    const server = await ServerList.findOne({
      roomId: data.roomId,
    });

    const currentRace = parseInt(server.currentRace) + 1;

    io.in(data.roomId).emit("UPDATE_RESULTS", {
      gameStatus: "RESULTS_DONE",
      results: results,
      currentRace: currentRace
    });
   
    await ServerList.findOneAndUpdate(
      {
        roomId: data.roomId,
      },
      {
        currentRace: currentRace,
      },
      { new: true }
    );
  });
});

server.listen(3001, () => {
  console.log("SERWER START");
});
