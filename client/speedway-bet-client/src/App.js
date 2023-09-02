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
  useEffect(() => {
    socket.on("updateNumerOfUsers", (data) => {
      setCurrentRoomUsersNumber(data.usersNumber);
    });
    socket.on("joined_room", (data) => {
      setCurrentRoomId(data.roomId);
      setCurrentRoomUsersNumber(data.usersNumber);
    });
  }, [socket]);

 

  return (
    <div className="App">
      {!currentRoomId && (
        <CreateRoom
          setHost={setHost}
          host={host}
          setCurrentRace={setCurrentRace}
          socket={socket}
        ></CreateRoom>
      )}
      {currentRoomId && (
        <GameComponent
          host={host}
          socket={socket}
          currentRoomUsersNumber={currentRoomUsersNumber}
          currentRoomId={currentRoomId}
          currentRace={currentRace}
          setCurrentRace={setCurrentRace}
        ></GameComponent>
      )}
    </div>
  );
}

export default App;
