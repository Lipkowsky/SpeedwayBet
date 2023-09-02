import React from "react";

export default function DisplayResultGameComponent(props) {
  const host = props.host
  const socket = props.socket 
  const raceResults = props.socket;
  const currentRoomId = props.currentRoomId;

  const nextRaceEvent = () => {
    socket.emit("nextRaceEvent", {
      roomId: currentRoomId,
    });
  };

  return (
    <div>
      <p>Aktualne wyniki biegu:</p>
      <div>Czerwony: {raceResults.selectedOptionRedResult}</div>
      <div>Niebieski: {raceResults.selectedOptionBlueResult}</div>
      <div>Biały: {raceResults.selectedOptionWhiteResult}</div>
      <div>Żółty: {raceResults.selectedOptionYellowResult}</div>
      {host && (
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
          onClick={nextRaceEvent}
        >
          Przejdź do następnego wyścigu
        </button>
      )}
    </div>
  );
}
