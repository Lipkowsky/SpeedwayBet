import { React, useRef, useState } from "react";

export default function SelectGameRaceComponent(props) {
  const socket = props.socket;
  const gameStatus = props.gameStatus;
  const currentRoomId = props.currentRoomId;

  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);

  const [helmets, setHelmets] = useState([
    { id: 1, name: "Czerwony" },
    { id: 2, name: "Niebieski" },
    { id: 3, name: "Biały" },
    { id: 4, name: "Żółty" },
  ]);

  function handleSort() {
    const helmetsClone = [...helmets];
    const temp = helmetsClone[dragPerson.current];
    helmetsClone[dragPerson.current] = helmetsClone[draggedOverPerson.current];
    helmetsClone[draggedOverPerson.current] = temp;
    setHelmets(helmetsClone);
  }

  const saveHostRaceResult = () => {
    socket.emit("saveHostRaceResult", {
      roomId: currentRoomId,
      currentResults: helmets,
    });
  };
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center space-y-4">
        <h1 className="text-xl font-bold mt-4">HOST: PODAJ WYNIKI OSTATNIEGO WYŚCIGU</h1>
        {helmets.map((person, index) => (
          <div
            className="relative flex space-x-3 border rounded p-2 bg-gray-100"
            draggable
            onDragStart={() => (dragPerson.current = index)}
            onDragEnter={() => (draggedOverPerson.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>{person.name}</p>
          </div>
        ))}
        <div>
        <button
          onClick={saveHostRaceResult}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
        >
          Zapisz stan
        </button>
      </div>
      </main>
      
    </div>
  );
}
