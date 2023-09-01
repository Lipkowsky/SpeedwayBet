import { React, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateRoom(props) {
  const socket = props.socket;
  const [roomId, setRoomId] = useState("");
  const generateRoom = () => {
    const uuid = uuidv4();
    setRoomId(uuid);
  };

  const joinRoom = () => {
    if (roomId !== "") {
      socket.emit("join_room", {
        roomId: roomId,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">Dołącz do aplikacji</h1>
      <button
        onClick={() => generateRoom()}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-4"
      >
        Utwórz pokój
      </button>
      <input
        value={roomId}
        onChange={(event) => setRoomId(event.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
        type="text"
        placeholder="Podaj id pokoju"
      ></input>
      <p>{roomId}</p>
      <button
        onClick={joinRoom}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
      >
        Przejdź do pokoju
      </button>
    </div>
  );
}
