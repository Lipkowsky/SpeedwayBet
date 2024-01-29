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
          className="bg-gray-300  w-full hover:bg-gray-400 text-rose-800 font-semibold py-2 px-4 rounded inline-flex items-center mt-4"
        >
          Start gry
        </button>
      )}
    </div>
  );
}
