import { React, useRef, useState } from "react";

export default function SelectBetComponent(props) {
  const gameStatus = props.gameStatus;
  const socket = props.socket;
  const currentRoomId = props.currentRoomId;

  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);

  const [helmets, setHelmets] = useState([
    {
      id: 1,
      name: "Czerwony",
      bg: "bg-red-500",
      textColor: "text-slate-100",
      boxShadow: "shadow-red-400",
    },
    {
      id: 2,
      name: "Niebieski",
      bg: "bg-blue-600",
      textColor: "text-slate-100",
      boxShadow: "shadow-blue-400",
    },
    {
      id: 3,
      name: "Biały",
      bg: "bg-white",
      textColor: "text-black-100",
      boxShadow: "shadow-neutral-400",
    },
    {
      id: 4,
      name: "Żółty",
      bg: "bg-yellow-300",
      textColor: "text-black-100",
      boxShadow: "shadow-yellow-400",
    },
  ]);

  function handleSort() {
    const helmetsClone = [...helmets];
    const temp = helmetsClone[dragPerson.current];
    helmetsClone[dragPerson.current] = helmetsClone[draggedOverPerson.current];
    helmetsClone[draggedOverPerson.current] = temp;
    setHelmets(helmetsClone);
  }

  const saveRace = () => {
    console.log(helmets);
    socket.emit("save_race", {
      roomId: currentRoomId,
      helmets: helmets,
    });
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center space-y-4">
        <div>
          <h3 className="italic font-bold">Komunikat:</h3>
          <p className="">Wybierz kolejność w jakiej zawodnicy dojadą na metę.</p>
        </div>
        {helmets.map((person, index) => (
          <div
            className={`font-bold tracking-tight antialiased hover:subpixel-antialiased space-x-6 border rounded shadow-lg p-2 h-15 w-40 ${person.boxShadow} ${person.textColor} ${person.bg}`}
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
            onClick={saveRace}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
          >
            Potwierdź wynik
          </button>
        </div>
      </main>
    </div>
  );
}
