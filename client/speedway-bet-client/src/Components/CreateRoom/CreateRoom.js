import { React, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TextField from "../../Utils/TextField";

export default function CreateRoom(props) {
  const socket = props.socket;
  const setCurrentRace = props.setCurrentRace;
  const [roomId, setRoomId] = useState("");

  const raceValue = props.raceValue;
  const setRaceValue = props.setRaceValue;

  const setHost = props.setHost;
  const setUserName = props.setUserName;
  const userName = props.userName;
  const host = props.host;
  const [userNameError, setUserNameError] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setRaceValue(value);
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const generateRoom = () => {
    if (userName.length <= 0) {
      setUserNameError("Nazwa użytkownika jest wymagana");
      return;
    }
    const uuid = uuidv4();
    setRoomId(uuid);
    setCurrentRace(1);
    socket.emit("create_room", {
      roomId: uuid,
      raceLimit: raceValue,
      userName: userName,
    });

    socket.emit("join_room", {
      userName: userName,
      roomId: uuid,
    });
  };

  const joinRoom = () => {
    if (roomId !== "") {

      if (userName.length <= 0) {
        setUserNameError("Nazwa użytkownika jest wymagana");
        return;
      }

      socket.emit("join_room", {
        roomId: roomId,
        userName: userName,
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
        <div className="container flex mx-auto mb-1">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z"
                clip-rule="evenodd"
              />
            </svg>
       
        </div>
        <div className="mb-4">
        <TextField
            label="Nazwa użytkownika"
            placeholder="Podaj swoją nazwę użytkownika"
            onChange={handleChange}
            value={userName}
          />
          <span className="text-sm font-semibold text-rose-600">{userNameError}</span>
        </div>
        {
          <button
            onClick={() => generateRoom()}
            className="bg-blue-950 hover:bg-blue-800 text-white text-sm  py-2 px-4 rounded inline-flex items-center mt-3"
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
              <option value="default" disabled>
                Wybierz ilość biegów
              </option>
              <option value="15">15 biegów</option>
              <option value="23">23 biegi</option>
            </select>
          </div>
        </section>
        <p className="block mb-1 text-sm font-semibold text-gray-950 mt-2">
          Jeśli posiadasz ID pokoju, wklej go poniżej
        </p>
        <input
          value={roomId}
          onChange={(event) => setRoomId(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
          type="text"
          placeholder="Podaj id pokoju"
        ></input>
        <p>{roomId}</p>
        <button
          onClick={joinRoom}
          className="bg-blue-950 hover:bg-blue-800 text-white text-sm py-2 px-4 rounded inline-flex items-center mt-4"
        >
          Przejdź do pokoju
        </button>
      </div>
    </div>
  );
}
