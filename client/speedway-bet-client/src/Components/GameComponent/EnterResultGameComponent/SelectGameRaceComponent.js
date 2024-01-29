import { React, useRef, useState } from "react";
import DraggableList from "../../../Utils/DraggableList";

export default function SelectGameRaceComponent(props) {
  const socket = props.socket;
  const gameStatus = props.gameStatus;
  const currentRoomId = props.currentRoomId;

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

  // function handleSort() {
  //   const helmetsClone = [...helmets];
  //   const temp = helmetsClone[dragPerson.current];
  //   helmetsClone[dragPerson.current] = helmetsClone[draggedOverPerson.current];
  //   helmetsClone[draggedOverPerson.current] = temp;
  //   setHelmets(helmetsClone);
  // }

  const saveHostRaceResult = () => {
    socket.emit("saveHostRaceResult", {
      roomId: currentRoomId,
      currentResults: helmets,
    });
  };
  return (
    <div>
      <main className="flex h-fit flex-col items-center justify-center space-y-4">
        <div>
          <h3 className="italic font-bold">Komunikat:</h3>
          <p>Podaj wynik ostatniego wyścigu</p>

          <DraggableList items={helmets} setHelmets={setHelmets} />
        </div>

        <div>
          <button
            onClick={saveHostRaceResult}
            className="bg-sky-950  w-full hover:bg-gray-400 text-white font-medium py-2 px-4 rounded inline-flex items-center mt-8"
          >
            Zapisz stan
          </button>
        </div>
      </main>
    </div>
  );
}
