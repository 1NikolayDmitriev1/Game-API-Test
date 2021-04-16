import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { connect } from "react-redux";
function MyList({ userId, count }) {
  const [data, setData] = useState([]);
  const [genersValue, setGenersValue] = useState("");
  const changeGenersHandler = (event) => {
    setGenersValue(event.target.value);
  };
  const getMyList = async (userId, geners) => {
    const res = await fetch(`/api/app/get-list`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        geners,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    getMyList(userId, genersValue);
  }, [count, genersValue, userId]);

  return (
    <div>
      <select
        value={genersValue}
        className="form-select  text-white filter   bg-dark"
        aria-label="Default select example"
        onChange={changeGenersHandler}
      >
        <option value="">Geners</option>
        <option value="action">Action</option>
        <option value="indie">Indie</option>
        <option value="role-playing-games-rpg">RPG</option>
        <option value="strategy">Strategy</option>
        <option value="shooter">Shooter</option>
        <option value="racing">Racing</option>
        <option value="fighting">Fighting</option>
        <option value="arcade">Arcade</option>
        <option value="massively-multiplayer">Massively Multiplayer</option>
      </select>
      <h1 className="heading">Мой список</h1>
      <div className="game-wrapper">
        {data.map((game) => {
          return <GameCard key={game.id} data={game} type={"del"}></GameCard>;
        })}
      </div>
    </div>
  );
}

const mapProps = (store) => {
  return { userId: store.authReduser.userId, count: store.gameReduser.count };
};
const connector = connect(mapProps, null);
export default connector(MyList);
