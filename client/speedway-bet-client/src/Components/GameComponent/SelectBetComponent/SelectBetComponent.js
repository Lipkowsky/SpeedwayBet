import { React, useRef, useState } from "react";
import DraggableList from "../../../Utils/DraggableList";


export default function SelectBetComponent(props) {
  const gameStatus = props.gameStatus;
  const socket = props.socket;
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

  const saveRace = () => {
    socket.emit("save_race", {
      roomId: currentRoomId,
      helmets: helmets,
    });
  };


 
  return (
    <div>
      <main className="flex h-fit flex-col items-center justify-center space-y-4">
        <div>
          <h3 className="italic font-bold">Komunikat:</h3>
          <p className="text-sm">
            Wybierz kolejność w jakiej zawodnicy dojadą na metę.
          </p>
          <DraggableList items={helmets} setHelmets={setHelmets}/>
        </div>
        <div>
          <button
            onClick={saveRace}
            className="bg-sky-950   w-full hover:bg-gray-400 text-white text-sm py-2 px-4 rounded inline-flex items-center mt-8"
          >
            Potwierdź wynik
          </button>
        </div>
      </main>
    </div>
  );
}
