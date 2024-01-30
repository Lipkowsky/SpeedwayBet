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
        <main className="flex h-fit flex-col items-left space-y-4">
        <div>
          <h3 className="italic font-bold">Komunikat:</h3>
          <p className="text-sm">Wyniki wyścigu</p>
        </div>
        {helmets.map((helmet, index) => (
          <div
            className={`draggable text-sm tracking-tight  antialiased hover:subpixel-antialiased space-x-6 border rounded shadow-lg p-2 h-15 w-60 ${helmet.boxShadow} ${helmet.textColor} ${helmet.bg}`}
          >
            <p className="flex text-sm">
              <span className="font-semibold mr-1">
                Pozycja: {index + 1} {helmet.name}
              </span>
            </p>
          </div>
        ))}
        <div>
          {host && (
            <button
              className="bg-sky-950  w-full hover:bg-gray-400 text-white text-sm py-2 px-4 rounded inline-flex items-center mt-8"
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
