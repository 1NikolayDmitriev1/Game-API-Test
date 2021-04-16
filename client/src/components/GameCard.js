import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { saveGameData } from "../redux/action-creaters/game-data.actions";
import AddOrDellImg from "./AddOrDellImg";
function GameCard({ data, saveGameData, type, userId }) {
  const [message, setMess] = useState("");
  const requestGameData = async () => {
    const res = await fetch(`/api/app/game/${data.name}`, {
      method: "POST",
      body: JSON.stringify({ id: data.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataGame = await res.json();
    saveGameData(dataGame, data.short_screenshots, type);
  };
  return (
    <div className="game-card-wrapper">
      <NavLink
        onClick={() => {
          requestGameData();
        }}
        to={`/game/${data.name}`}
      >
        <div className="card-medi">
          <img src={data.background_image} alt="/"></img>
        </div>
      </NavLink>
      <div className="card-info">
        <h4>{data.name}</h4>
        <AddOrDellImg data={{ data, type, userId, setMess }}></AddOrDellImg>
        {message}
      </div>
    </div>
  );
}

const mapDispath = {
  saveGameData: saveGameData,
};
const mapProps = (state) => {
  return {
    state,
    userId: state.authReduser.userId,
  };
};
const connector = connect(mapProps, mapDispath);
export default connector(GameCard);
