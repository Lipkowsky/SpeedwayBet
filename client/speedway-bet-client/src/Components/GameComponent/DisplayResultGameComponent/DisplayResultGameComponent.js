import { React, useRef, useState } from "react";

export default function DisplayResultGameComponent(props) {
  const host = props.host;
  const socket = props.socket;
  const raceResults = props.raceResults;
  const currentRoomId = props.currentRoomId;


  const [helmets, setHelmets] = useState(raceResults);

  const nextRaceEvent = () => {
    socket.emit("nextRaceEvent", {
      roomId: currentRoomId,
    });
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center space-y-4">
        <h1 className="text-xl font-bold mt-4">Wyniki ostatniego wyścigu:</h1>
        {helmets.map((person, index) => (
          <div className="relative flex space-x-3 border rounded p-2 bg-gray-100">
            <p>{person.name}</p>
          </div>
        ))}
        <div>
          {host && (
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
              onClick={nextRaceEvent}
            >
              Przejdź do następnego wyścigu
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
