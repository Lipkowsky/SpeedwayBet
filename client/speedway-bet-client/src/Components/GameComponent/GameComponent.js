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

  const [gameStatus, setGameStatusType] = useState("BEFORE_START");
  const [score, setScoreValue] = useState(0);

  const [raceResults, setRaceResults] = useState({
    selectedOptionRedResult: 0,
    selectedOptionBlueResult: 0,
    selectedOptionWhiteResult: 0,
    selectedOptionYellowResult: 0,
  });

  const nextRaceEvent = () => {
    socket.emit("nextRaceEvent", {
      roomId: currentRoomId,
    });
  };

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

  return (
    <div>
      <div>Aktualny wyścig: {currentRace}</div>
      <div>Aktualna ilość punktów: {score}</div>
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
        {gameStatus === "RESULTS_DONE" && (
          <DisplayResultGameComponent socket={socket} host={host} currentRoomId={currentRoomId} raceResults={raceResults}/>
        )}

        {Number(currentRace) === Number(raceValue) && (
          <div>
            Koniec gry, ilość wyścigów: {currentRace} / {raceValue}
          </div>
        )}
      </div>
    </div>
  );
}
