import { React, useState, useEffect } from "react";

export default function GameComponent(props) {
  const socket = props.socket;
  const currentRoomId = props.currentRoomId;
  const currentRoomUsersNumber = props.currentRoomUsersNumber;
  const [raceValue, setRaceValue] = useState("15");
  const [gameStatus, setGameStatusType] = useState("BEFORE_START");

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

  const handleChange = (e) => {
    setRaceValue(e.target.value);
  };

  const selectRacesType = () => {
    if (raceValue !== "") {
      socket.emit("select_race_value", {
        roomId: currentRoomId,
        raceValue: raceValue,
      });
    }
  };

  const startGame = () => {
    socket.emit("start_game", {
      roomId: currentRoomId,
    });
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

  useEffect(() => {
    socket.on(currentRoomId, (data) => {
      setGameStatusType(data.gameStatus);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("set_game_status", (data) => {
      console.log(data.gameStatus)
      setGameStatusType(data.gameStatus);
    });
  }, [socket]);

  

  return (
    <div>
      {gameStatus === "BEFORE_START" && (
        <div>
          <header className="border-b border-gray-300 py-4 px-4">
            <div className="container mx-auto flex items-center justify-between relative">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                <span className="font-medium cursor-pointer">
                  {currentRoomId}
                </span>
              </div>

              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>

                <span className="font-medium">
                  {currentRoomUsersNumber} użytkowników
                </span>
              </div>
            </div>
          </header>
          <section className="container mx-auto mt-5">
            <div className="flex">
              <label
                for="races"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Wybierz ilość biegów:
              </label>
              <select
                id="races"
                value={raceValue}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Wybierz ilość biegów</option>
                <option value="15">15 biegów</option>
                <option value="23">23 biegi</option>
              </select>
            </div>
          </section>
          <button
            onClick={selectRacesType}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
          >
            Zapisz
          </button>
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
          >
            Start gry
          </button>
        </div>
      )}
      <div>
        {gameStatus === "STARTED" && (
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
            <select
              value={selectedOptionBlue}
              onChange={handleSelectChangeBlue}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <span className="mr-4">Kask biały:</span>
            <select
              value={selectedOptionWhite}
              onChange={handleSelectChangeWhite}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <span className="mr-4">Kask żółty:</span>
            <select
              value={selectedOptionYellow}
              onChange={handleSelectChangeYellow}
            >
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
        )}

        {gameStatus === "LOADING" && (
          <div>
            <h1>{gameStatus}</h1>
            <p>Trwa wybieranie....</p>
          </div>
        )}
        {gameStatus === "TYPE_RESULTS" && (
          <div>
            <h1>{gameStatus}</h1>
            <p>Wpisz aktualne wyniki</p>
          </div>
        )}
        {gameStatus === "WAIT_FOR_RESULTS" && (
          <div>
            <h1>{gameStatus}</h1>
            <p>Poczekaj na podanie wyników</p>
          </div>
        )}
      </div>
    </div>
  );
}
