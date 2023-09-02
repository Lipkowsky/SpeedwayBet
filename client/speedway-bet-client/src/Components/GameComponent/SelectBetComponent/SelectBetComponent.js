import {React, useState} from "react";

export default function SelectBetComponent(props) {
  const gameStatus = props.gameStatus;
  const socket = props.socket;
  const currentRoomId = props.currentRoomId;

  const [selectedOptionRed, setSelectedOptionRed] = useState("1"); // Tworzymy stan do śledzenia wyboru

  // Funkcja obsługująca zmianę wyboru
  const handleSelectChangeRed = (event) => {
    setSelectedOptionRed(event.target.value);
  };

  const [selectedOptionBlue, setSelectedOptionBlue] = useState("1"); // Tworzymy stan do śledzenia wyboru

  // Funkcja obsługująca zmianę wyboru
  const handleSelectChangeBlue = (event) => {
    setSelectedOptionBlue(event.target.value);
  };

  const [selectedOptionWhite, setSelectedOptionWhite] = useState("1"); // Tworzymy stan do śledzenia wyboru

  // Funkcja obsługująca zmianę wyboru
  const handleSelectChangeWhite = (event) => {
    setSelectedOptionWhite(event.target.value);
  };

  const [selectedOptionYellow, setSelectedOptionYellow] = useState("1"); // Tworzymy stan do śledzenia wyboru

  // Funkcja obsługująca zmianę wyboru
  const handleSelectChangeYellow = (event) => {
    setSelectedOptionYellow(event.target.value);
  };

  const saveRace = () => {
    socket.emit("save_race", {
      roomId: currentRoomId,
      choices: {
        selectedOptionRed: selectedOptionRed,
        selectedOptionBlue: selectedOptionBlue,
        selectedOptionWhite: selectedOptionWhite,
        selectedOptionYellow: selectedOptionYellow,
      },
    });
  };

  return (
    <div>
      <h1>{gameStatus}</h1>
      <span className="mr-4">Kask czerwony:</span>
      <select value={selectedOptionRed} onChange={handleSelectChangeRed}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <span className="mr-4">Kask niebieski:</span>
      <select value={selectedOptionBlue} onChange={handleSelectChangeBlue}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <span className="mr-4">Kask biały:</span>
      <select value={selectedOptionWhite} onChange={handleSelectChangeWhite}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <span className="mr-4">Kask żółty:</span>
      <select value={selectedOptionYellow} onChange={handleSelectChangeYellow}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <button
        onClick={saveRace}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
      >
        Zapisz stan
      </button>
    </div>
  );
}
