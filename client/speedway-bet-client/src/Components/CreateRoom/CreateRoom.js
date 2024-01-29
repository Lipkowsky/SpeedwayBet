import { React, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateRoom(props) {
  const socket = props.socket;
  const setCurrentRace = props.setCurrentRace;
  const [roomId, setRoomId] = useState("");

  const raceValue = props.raceValue;
  const setRaceValue = props.setRaceValue;

  const setHost = props.setHost;
  const host = props.host;
  const [selectedValue, setSelectedValue] = useState('');
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setRaceValue(value)
  };

  const generateRoom = () => {
    const uuid = uuidv4();
    setRoomId(uuid);
    setCurrentRace(1);
    socket.emit("create_room", {
      roomId: uuid,
      raceLimit: raceValue,
    });

    socket.emit("join_room", {
      roomId: uuid,
    });
  };

  const joinRoom = () => {
    if (roomId !== "") {
      socket.emit("join_room", {
        roomId: roomId,
      });
    }
  };

  useEffect(() => {
    socket.on("SET_HOST", (data) => {
      setHost(true);
    });
  }, [socket]);

  return (
    <div className="container mx-auto">
      <div class="bg-gray-100 w-full border border-gray-200 p-4">
        {
          <button
            onClick={() => generateRoom()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            Utwórz pokój
          </button>
        }
        <section className="container mx-auto mt-5">
          <div className="flex flex-wrap">
            <label className="w-1/4 block mb-2 text-sm font-medium text-gray-950">
              Wybierz ilość biegów:
            </label>
            <select
              id="races"
              value={selectedValue}
              onChange={handleSelectChange}
              className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Wybierz ilość biegów</option>
              <option value="15">15 biegów</option>
              <option value="23">23 biegi</option>
            </select>
          </div>
        </section>
        <p className="block mb-2 text-sm font-medium text-gray-950 mt-5">
          Jeśli posiadasz id pokoju, wklej go poniżej
        </p>
        <input
          value={roomId}
          onChange={(event) => setRoomId(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
          type="text"
          placeholder="Podaj id pokoju"
        ></input>
        <p>{roomId}</p>
        <button
          onClick={joinRoom}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center mt-4"
        >
          Przejdź do pokoju
        </button>
      </div>
    </div>
  );
}
