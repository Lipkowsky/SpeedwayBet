import { React, useState, useEffect } from "react";
import BeforeGameComponent from "./BeforeGameComponent/BeforeGameComponent";
import WaitForHostComponent from "./WaitForHostCopomnent/WaitForHostComponent";
import SelectBetComponent from "./SelectBetComponent/SelectBetComponent";
import LoadingGameComponent from "./LoadingGameComponent/LoadingGameComponent";
import SelectGameRaceComponent from "./EnterResultGameComponent/SelectGameRaceComponent";
import DisplayResultGameComponent from "./DisplayResultGameComponent/DisplayResultGameComponent";

export default function GameComponent(props) {
  const socket = props.socket;
  const currentRoomId = props.currentRoomId;
  const currentRoomUsersNumber = props.currentRoomUsersNumber;
  const currentRace = props.currentRace;
  const setCurrentRace = props.setCurrentRace;
  const host = props.host;
  const raceValue = props.raceValue;
  const cannotJoin = props.cannotJoin;

  const [gameStatus, setGameStatusType] = useState("BEFORE_START");
  const [score, setScoreValue] = useState(0);
  const [endGame, setEndGame] = useState(false);

  const [raceResults, setRaceResults] = useState({
    selectedOptionRedResult: 0,
    selectedOptionBlueResult: 0,
    selectedOptionWhiteResult: 0,
    selectedOptionYellowResult: 0,
  });

  useEffect(() => {
    socket.on(currentRoomId, (data) => {
      setGameStatusType(data.gameStatus);
      setCurrentRace(data.currentRace);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("set_game_status", (data) => {
      setGameStatusType(data.gameStatus);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("UPDATE_RESULTS", (data) => {
      setGameStatusType(data.gameStatus);
      setRaceResults(data.results);
      setCurrentRace(data.currentRace);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("update_score_user", (data) => {
      setScoreValue(data.score);
    });
  }, [socket]);

  useEffect(() => {
    console.log(currentRace)
    console.log(raceValue)
    console.log(Number(currentRace) === Number(raceValue))
    if (Number(currentRace) > Number(raceValue)) {
      setEndGame(true);
    }
  }, [currentRace]);

  return (
    <div class="h-screen flex">
      <div className="w-1/4 flex flex-row bg-white">
        <div class="flex flex-col space-y-8">
          <div class="bg-white p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>

            <span className="font-medium cursor-pointer">{currentRoomId}</span>
          </div>

          <div class="bg-white p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>

            <span className="font-medium">
              {currentRoomUsersNumber} użytkowników
            </span>
          </div>

          <div class="bg-white p-4 font-medium">Bieg: {currentRace}</div>

          <div class="bg-white p-4 font-medium">Twoje punkty: {score}</div>
        </div>
      </div>

      <div className="w-3/4">
        {gameStatus === "BEFORE_START" && host && (
          <BeforeGameComponent
            socket={socket}
            currentRoomId={currentRoomId}
            currentRoomUsersNumber={currentRoomUsersNumber}
            host={host}
          ></BeforeGameComponent>
        )}
        {gameStatus === "BEFORE_START" && <WaitForHostComponent />}
        <div>
          {gameStatus === "STARTED" && (
            <SelectBetComponent
              socket={socket}
              gameStatus={gameStatus}
              currentRoomId={currentRoomId}
            />
          )}

          {gameStatus === "LOADING" && <LoadingGameComponent />}
          {gameStatus === "WAIT_FOR_RESULTS" && host && (
            <SelectGameRaceComponent
              socket={socket}
              gameStatus={gameStatus}
              currentRoomId={currentRoomId}
            />
          )}
          {gameStatus === "WAIT_FOR_RESULTS" && !host && (
            <div>
              <LoadingGameComponent />
            </div>
          )}
          {gameStatus === "RESULTS_DONE" && !endGame &&  (
            <DisplayResultGameComponent
              socket={socket}
              host={host}
              currentRoomId={currentRoomId}
              raceResults={raceResults}
            />
          )}

          {endGame && (
            <div>
              Koniec gry, ilość wyścigów: {currentRace} / {raceValue}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
