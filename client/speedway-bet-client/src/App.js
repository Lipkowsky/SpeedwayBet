import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "./App.css";
import CreateRoom from "./Components/CreateRoom/CreateRoom";
import GameComponent from "./Components/GameComponent/GameComponent";

const socket = io.connect("http://localhost:3001");

function App() {
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [currentRoomUsersNumber, setCurrentRoomUsersNumber] = useState(0);
  const [currentRace, setCurrentRace] = useState(0);
  const [host, setHost] = useState(false);
  const [raceValue, setRaceValue] = useState("15");
  const [cannotJoin, setCannotJoin] = useState(false);
  useEffect(() => {
    socket.on("updateNumerOfUsers", (data) => {
      setCurrentRoomUsersNumber(data.usersNumber);
    });
    socket.on("joined_room", (data) => {
      setCurrentRoomId(data.roomId);
      setCurrentRoomUsersNumber(data.usersNumber);
    });

    socket.on("cannot_join", (data) => {
      setCannotJoin(true);
    });
  }, [socket]);

  return (
    <div className="App">
      {cannotJoin && <div>GRA JUZ SIĘ ROZPOCZETA NIE MOZNA DOLACZYC</div>}
      {!currentRoomId && !cannotJoin && (
        <CreateRoom
          setHost={setHost}
          host={host}
          setCurrentRace={setCurrentRace}
          socket={socket}
          raceValue={raceValue}
          setRaceValue={setRaceValue}
        ></CreateRoom>
      )}
      {currentRoomId && !cannotJoin && (
        <GameComponent
          host={host}
          socket={socket}
          currentRoomUsersNumber={currentRoomUsersNumber}
          currentRoomId={currentRoomId}
          currentRace={currentRace}
          setCurrentRace={setCurrentRace}
          raceValue={raceValue}
          setRaceValue={setRaceValue}
          cannotJoin={cannotJoin}
        ></GameComponent>
      )}
    </div>
  );
}

export default App;
