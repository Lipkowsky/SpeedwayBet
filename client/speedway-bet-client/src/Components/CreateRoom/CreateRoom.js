import { React, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateRoom(props) {
  const socket = props.socket;
  const setCurrentRace = props.setCurrentRace;
  const [roomId, setRoomId] = useState("");
  const [raceValue, setRaceValue] = useState("15");
 
  const setHost = props.setHost;
  const host = props.host;

  const generateRoom = () => {
    const uuid = uuidv4();
    setRoomId(uuid);
    setCurrentRace(1);
    socket.emit("create_room", {
      roomId: uuid,
      raceLimit: raceValue
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
      <h1 className="text-3xl font-bold underline">Dołącz do aplikacji</h1>

      {
        <button
          onClick={() => generateRoom()}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-4"
        >
          Utwórz pokój
        </button>
      }
      <section className="container mx-auto mt-5">
        <div className="flex">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Wybierz ilość biegów:
          </label>
          <select
            id="races"
            value={raceValue}
            onChange={setRaceValue}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Wybierz ilość biegów</option>
            <option value="15">15 biegów</option>
            <option value="23">23 biegi</option>
          </select>
        </div>
      </section>

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
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
      >
        Przejdź do pokoju
      </button>
    </div>
  );
}
