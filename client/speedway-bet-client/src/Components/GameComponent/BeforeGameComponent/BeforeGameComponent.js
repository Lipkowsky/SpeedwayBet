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
      <header className="border-b border-gray-300 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between relative">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>

            <span className="font-medium cursor-pointer">{currentRoomId}</span>
          </div>

          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>

            <span className="font-medium">
              {currentRoomUsersNumber} użytkowników
            </span>
          </div>
        </div>
      </header>

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
