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
  players: Array,
  currentRace: String,
  results: Object,
  raceLimit: Number,
});
const ServerList = mongoose.model("ServerList", serverList);

io.on("connection", async (socket) => {
  socket.on("create_room", async (data) => {
    const serverStarter = new ServerList({
      roomId: data.roomId,
      raceLimit: parseInt(data.raceLimit),
      players: {
        id: socket.id,
        selectedOptions: false,
        host: true,
        score: 0,
        userName: data.userName,
      },
    });
    serverStarter.save();
    socket.emit("SET_HOST", {
      roomId: data.roomId,
      hostId: socket.id,
    });
  });

  socket.on("join_room", async (data) => {
    try {
      const tryFindServer = await ServerList.findOne({
        roomId: data.roomId,
      });

      if (tryFindServer === null) {
        const doc = new ServerList({ roomId: data.roomId });
        doc.save();
      }
      if (tryFindServer?.currentRace >= 1) {
        socket.emit("cannot_join", {
          message: "GAME JUST STARTED, YOU CANNOT JOIN TO ROOM",
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
    socket.join(data.roomId);
    // DODAWANIE UŻYTKOWNIKA DO LISTY W POKOJU
    const users = [...io.sockets.adapter.rooms.get(data.roomId)];

    for (let [index, user] of users.entries()) {
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
                score: 0,
                userName: data.userName,
              },
            },
          },
          { new: true }
        );
      }
    }

    const room = io.sockets.adapter.rooms.get(data.roomId);

    socket.emit("joined_room", {
      message: `You joined room: ${data.roomId}`,
      roomId: data.roomId,
      usersNumber: room.size,
    });
    socket.to(data.roomId).emit("updateNumerOfUsers", {
      message: `Someone joined to: ${data.roomId}`,
      usersNumber: room.size,
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
        currentRace: 1,
      },
      { new: true }
    );

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
          "players.$.helmets": data.helmets,
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

  function isOnTheSamePosition(array1, array2, element) {
    const index1 = array1.findIndex((item) => item.id === element.id);

    const index2 = array2.findIndex((item) => item.id === element.id);

    if (index1 === -1 || index2 === -1) {
      return false;
    }

    return index1 === index2;
  }

  socket.on("saveHostRaceResult", async (data) => {
    const results = data.currentResults;

    let server = await ServerList.findOne({
      roomId: data.roomId,
    });

    const currentRace = parseInt(server.currentRace) + 1;

    io.in(data.roomId).emit("UPDATE_RESULTS", {
      gameStatus: "RESULTS_DONE",
      results: results,
      currentRace: currentRace,
    });

    await ServerList.findOneAndUpdate(
      {
        roomId: data.roomId,
      },
      {
        currentRace: currentRace,
        results: results,
      },
      { new: true }
    );

    server = await ServerList.findOne({
      roomId: data.roomId,
    });

    /// PORÓWNANIE WYNIKÓW GRACZY
    for (let player of server.players) {
      const helmetsArray = [
        { id: 1, name: "Czerwony" },
        { id: 2, name: "Niebieski" },
        { id: 3, name: "Biały" },
        { id: 4, name: "Żółty" },
      ];
      let playerResult = [];
      helmetsArray.forEach((element) => {
        const result = isOnTheSamePosition(player.helmets, results, element);
        playerResult.push(result);
      });
      // PODLICZANIE POPRAWNYCH ODPOWIEDZI GRACZA
      const playerScore = playerResult.filter(Boolean).length;
      player.score += playerScore;
      playerResult = [];
      await ServerList.updateOne(
        { roomId: data.roomId, "players.id": player.id },
        {
          $set: {
            "players.$.selectedOptions": false,
            "players.$.score": player.score,
          },
        }
      );
      // WYSYŁANIE WYNIKÓW DO HOSTA ORAZ INNYCH UŻYTKOWNIKÓW
      if (player.id === socket.id) {
        socket.emit("update_score_user", {
          score: player.score,
        });
      } else {
        socket.broadcast.to(player.id).emit("update_score_user", {
          score: player.score,
        });
      }
    }

    const compareValues = (key, order = "desc") => {
      return (a, b) => {
        const varA = a[key];
        const varB = b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }

        return order === "desc" ? comparison * -1 : comparison;
      };
    };
  
    if (currentRace > parseInt(server.raceLimit)) {
      const players = server.players;

      let playersMap = players.map((player) => {
        return {
          id: player.id,
          player: player.userName,
          score: player.score,
        };
      });
      let playersSorted = playersMap.sort(compareValues("score", "desc"));

      io.in(data.roomId).emit("END_GAME", {
        gameStatus: "END_GAME",
        playersMap: playersSorted,
      });
      return;
    }
  });

  socket.on("nextRaceEvent", async (data) => {
    io.in(data.roomId).emit("set_game_status", {
      gameStatus: "STARTED",
    });
  });
});

server.listen(3001, () => {
  console.log("SERWER START");
});
