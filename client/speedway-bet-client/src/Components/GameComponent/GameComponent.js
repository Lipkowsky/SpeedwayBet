import { React, useState, useEffect } from "react";
import BeforeGameComponent from "./BeforeGameComponent/BeforeGameComponent";
import WaitForHostComponent from "./WaitForHostCopomnent/WaitForHostComponent";
import SelectBetComponent from "./SelectBetComponent/SelectBetComponent";
import LoadingGameComponent from "./LoadingGameComponent/LoadingGameComponent";
import SelectGameRaceComponent from "./EnterResultGameComponent/SelectGameRaceComponent";
import DisplayResultGameComponent from "./DisplayResultGameComponent/DisplayResultGameComponent";
import EndGame from "./EndGame/EndGame";
export default function GameComponent(props) {
  const socket = props.socket;
  const currentRoomId = props.currentRoomId;
  const currentRoomUsersNumber = props.currentRoomUsersNumber;
  const currentRace = props.currentRace;
  const setCurrentRace = props.setCurrentRace;
  const host = props.host;
  const raceValue = props.raceValue;
  const cannotJoin = props.cannotJoin;
  const userName = props.userName;

  const [gameStatus, setGameStatusType] = useState("BEFORE_START");
  const [score, setScoreValue] = useState(0);

  const [playersMap, setPlayersMap] = useState([]);
  const [raceResults, setRaceResults] = useState(null);

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
    socket.on("END_GAME", (data) => {
      setGameStatusType(data.gameStatus);
      setPlayersMap(data.playersMap);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("update_score_user", (data) => {
      setScoreValue(data.score);
    });
  }, [socket]);



  return (
    <div class="h-screen flex">
      <div className="w-2/4 bg-gray-100 h-fit min-h-auto border border-gray-100 p-4 mr-1">
        <div class="flex flex-col space-y-2">
          <div class="bg-gray-200 rounded flex p-2">
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
            <div className="flex flex-col">
              <span className="font-bold text-sm cursor-pointer">
                Nazwa użytkownika:
              </span>
              <span className="font-medium">{userName}</span>
            </div>
          </div>
          <div class="bg-gray-200 rounded flex p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <div className="flex flex-col">
              <span className="font-bold cursor-pointer text-sm">
                ID pokoju:
              </span>
              <span className="font-medium text-sm">{currentRoomId}</span>
            </div>
          </div>

          <div class="bg-gray-200 rounded flex p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            <div className="flex flex-col">
              <span className="font-bold cursor-pointer text-sm">
                Liczba użytkowników:
              </span>
              <span className="font-medium text-sm">
                {" "}
                {currentRoomUsersNumber}
              </span>
            </div>
          </div>

          <div class="bg-gray-200 rounded flex p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-7 h-7 mr-1"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.49998 0.5C5.49998 0.223858 5.72383 0 5.99998 0H7.49998H8.99998C9.27612 0 9.49998 0.223858 9.49998 0.5C9.49998 0.776142 9.27612 1 8.99998 1H7.99998V2.11922C9.09832 2.20409 10.119 2.56622 10.992 3.13572C11.0116 3.10851 11.0336 3.08252 11.058 3.05806L12.058 2.05806C12.3021 1.81398 12.6978 1.81398 12.9419 2.05806C13.186 2.30214 13.186 2.69786 12.9419 2.94194L11.967 3.91682C13.1595 5.07925 13.9 6.70314 13.9 8.49998C13.9 12.0346 11.0346 14.9 7.49998 14.9C3.96535 14.9 1.09998 12.0346 1.09998 8.49998C1.09998 5.13361 3.69904 2.3743 6.99998 2.11922V1H5.99998C5.72383 1 5.49998 0.776142 5.49998 0.5ZM2.09998 8.49998C2.09998 5.51764 4.51764 3.09998 7.49998 3.09998C10.4823 3.09998 12.9 5.51764 12.9 8.49998C12.9 11.4823 10.4823 13.9 7.49998 13.9C4.51764 13.9 2.09998 11.4823 2.09998 8.49998ZM7.49998 8.49998V4.09998C5.06992 4.09998 3.09998 6.06992 3.09998 8.49998C3.09998 10.93 5.06992 12.9 7.49998 12.9C8.715 12.9 9.815 12.4075 10.6112 11.6112L7.49998 8.49998Z"
                fill="#000000"
              />
            </svg>
            <div className="flex flex-col">
              <span className="font-bold cursor-pointer text-sm">Bieg:</span>
              <span className="text-sm"> {currentRace}</span>
            </div>
          </div>

          <div class="bg-gray-200 rounded flex p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="m17.829,7.762c-.141,0-.282-.045-.4-.133-.227-.17-.321-.464-.236-.734l.627-2.011-1.585-1.29c-.213-.181-.291-.476-.194-.738.096-.262.346-.437.626-.437h2.001l.708-1.987c.097-.261.346-.434.625-.434s.528.173.625.434l.708,1.987h2.001c.28,0,.53.175.626.438s.017.558-.197.739l-1.577,1.285.652,1.987c.089.269-.001.565-.226.738-.225.173-.534.185-.771.031l-1.836-1.196-1.805,1.208c-.112.075-.242.113-.371.113Zm-8,3c-.141,0-.282-.045-.4-.133-.227-.17-.321-.464-.236-.734l.627-2.011-1.585-1.29c-.213-.181-.291-.476-.194-.738.096-.262.346-.437.626-.437h2.001l.708-1.987c.097-.261.346-.434.625-.434s.528.173.625.434l.708,1.987h2.001c.28,0,.53.175.626.438s.017.558-.197.739l-1.577,1.285.652,1.987c.089.269-.001.565-.226.738-.225.173-.534.185-.771.031l-1.836-1.196-1.805,1.208c-.112.075-.242.113-.371.113ZM1.829,13.762c-.141,0-.282-.045-.4-.133-.227-.17-.321-.464-.236-.734l.627-2.011-1.585-1.29c-.213-.181-.291-.476-.194-.738.096-.262.346-.437.626-.437h2.001l.708-1.987c.097-.261.346-.434.625-.434s.528.173.625.434l.708,1.987h2.001c.28,0,.53.175.626.438s.017.558-.197.739l-1.577,1.285.652,1.987c.089.269-.001.565-.226.738-.225.173-.534.185-.771.031l-1.836-1.196-1.805,1.208c-.112.075-.242.113-.371.113Zm19.671-3.762h-2c-1.381,0-2.5,1.119-2.5,2.5v9c0,1.381,1.119,2.5,2.5,2.5h2c1.381,0,2.5-1.119,2.5-2.5v-9c0-1.381-1.119-2.5-2.5-2.5Zm-17.5,6h-1.5c-1.381,0-2.5,1.119-2.5,2.5v3c0,1.381,1.119,2.5,2.5,2.5h1.5c1.381,0,2.5-1.119,2.5-2.5v-3c0-1.381-1.119-2.5-2.5-2.5Zm8.5-3h-1.5c-1.381,0-2.5,1.119-2.5,2.5v6c0,1.381,1.119,2.5,2.5,2.5h1.5c1.381,0,2.5-1.119,2.5-2.5v-6c0-1.381-1.119-2.5-2.5-2.5Z" />
            </svg>
            <div className="flex flex-col">
              <span className="font-bold cursor-pointer text-sm">
                Twoje punkty:
              </span>
              <span className="text-sm"> {score}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/4 bg-gray-100 h-fit min-h-auto border border-gray-200 p-4 mr-5">
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
            <DisplayResultGameComponent
              socket={socket}
              host={host}
              currentRoomId={currentRoomId}
              raceResults={raceResults}
            />
          )}

          {gameStatus === "END_GAME" && <EndGame playersMap={playersMap}></EndGame>}
        </div>
      </div>
    </div>
  );
}
