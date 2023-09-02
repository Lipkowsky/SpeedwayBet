import {React, useState} from "react";

export default function SelectGameRaceComponent(props) {
  const socket = props.socket;
  const gameStatus = props.gameStatus;
  const currentRoomId = props.currentRoomId;

  const [selectedOptionRedResult, setSelectedOptionRedResult] = useState("1"); // Tworzymy stan do śledzenia wyboru

  // Funkcja obsługująca zmianę wyboru
  const handleSelectChangeRedResult = (event) => {
    setSelectedOptionRedResult(event.target.value);
  };

  const [selectedOptionBlueResult, setSelectedOptionBlueResult] = useState("1"); // Tworzymy stan do śledzenia wyboru

  // Funkcja obsługująca zmianę wyboru
  const handleSelectChangeBlueResult = (event) => {
    setSelectedOptionBlueResult(event.target.value);
  };

  const [selectedOptionWhiteResult, setSelectedOptionWhiteResult] =
    useState("1"); // Tworzymy stan do śledzenia wyboru

  // Funkcja obsługująca zmianę wyboru
  const handleSelectChangeWhiteResult = (event) => {
    setSelectedOptionWhiteResult(event.target.value);
  };

  const [selectedOptionYellowResult, setSelectedOptionYellowResult] =
    useState("1"); // Tworzymy stan do śledzenia wyboru

  // Funkcja obsługująca zmianę wyboru
  const handleSelectChangeYellowResult = (event) => {
    setSelectedOptionYellowResult(event.target.value);
  };

  const saveHostRaceResult = () => {
    socket.emit("saveHostRaceResult", {
      roomId: currentRoomId,
      currentResults: {
        selectedOptionRedResult: selectedOptionRedResult,
        selectedOptionBlueResult: selectedOptionBlueResult,
        selectedOptionWhiteResult: selectedOptionWhiteResult,
        selectedOptionYellowResult: selectedOptionYellowResult,
      },
    });
  };
  return (
    <div>
      <h1>{gameStatus}</h1>
      <p>Wpisz aktualne wyniki</p>
      <div>
        <span className="mr-4">Kask czerwony:</span>
        <select
          value={selectedOptionRedResult}
          onChange={handleSelectChangeRedResult}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <span className="mr-4">Kask niebieski:</span>
        <select
          value={selectedOptionBlueResult}
          onChange={handleSelectChangeBlueResult}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <span className="mr-4">Kask biały:</span>
        <select
          value={selectedOptionWhiteResult}
          onChange={handleSelectChangeWhiteResult}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <span className="mr-4">Kask żółty:</span>
        <select
          value={selectedOptionYellowResult}
          onChange={handleSelectChangeYellowResult}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <button
          onClick={saveHostRaceResult}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
        >
          Zapisz stan
        </button>
      </div>
    </div>
  );
}
