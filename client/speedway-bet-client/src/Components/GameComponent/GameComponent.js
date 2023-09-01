import React from "react";

export default function GameComponent(props) {
  const currentRoomId = props.currentRoomId;
  const currentRoomUsersNumber = props.currentRoomUsersNumber;
  return (
    <div className="container mx-auto">
      <p>{currentRoomId}</p>
      <p>Ile osób połączonych: {currentRoomUsersNumber}</p>
    </div>
  );
}
