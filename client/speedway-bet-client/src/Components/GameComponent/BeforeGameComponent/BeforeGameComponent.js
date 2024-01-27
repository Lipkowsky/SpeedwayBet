import React from "react";

export default function BeforeGameComponent(props) {
  const currentRoomId = props.currentRoomId;
  const currentRoomUsersNumber = props.currentRoomUsersNumber;
  const socket = props.socket;
  const host = props.host;

  const startGame = () => {
    socket.emit("start_game", {
      roomId: currentRoomId,
    });
  };

  return (
    <div>
    

      {host && (
        <button
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
        >
          Start gry
        </button>
      )}
    </div>
  );
}
