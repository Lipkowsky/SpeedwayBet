import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "./App.css";
import CreateRoom from "./Components/CreateRoom/CreateRoom";
import GameComponent from "./Components/GameComponent/GameComponent";

const socket = io.connect("http://localhost:3001");

function App() {
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [currentRoomUsersNumber, setCurrentRoomUsersNumber] = useState(0);

  useEffect(() => {
    socket.on("joined_room", (data) => {
      setCurrentRoomId(data.roomId);
      setCurrentRoomUsersNumber(data.usersNumber);
    });
  }, [socket]);

  return (
    <div className="App">
      {!currentRoomId && <CreateRoom socket={socket}></CreateRoom>}
      {currentRoomId && (
        <GameComponent
          currentRoomUsersNumber={currentRoomUsersNumber}
          currentRoomId={currentRoomId}
        ></GameComponent>
      )}
    </div>
  );
}

export default App;
