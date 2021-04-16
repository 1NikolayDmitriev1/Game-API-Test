import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import PrevNext from "../components/PrevNext";
import { connect } from "react-redux";
function Search({ gameName }) {
  const [gameData, setData] = useState(null);
  const [coutPages, setPages] = useState(1);
  const uppPagesCount = (count) => {
    setPages(count);
  };
  const fetchData = async (gameName, coutPages) => {
    const res = await fetch(`/api/app/search`, {
      method: "POST",
      body: JSON.stringify({ params: gameName, count: coutPages }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchData(gameName, coutPages);
  }, [gameName, coutPages]);

  if (gameData !== null) {
    return (
      <>
        <h2 className="heading">{gameName}</h2>
        <PrevNext uppPagesCount={uppPagesCount} count={coutPages}></PrevNext>
        <div className="game-wrapper">
          {gameData.map((game) => {
            return <GameCard key={game.id} data={game} type="add"></GameCard>;
          })}
        </div>
      </>
    );
  } else {
    return null;
  }
}
const mapProps = (store) => {
  return { gameName: store.gameReduser.gameName };
};

const connector = connect(mapProps, null);
export default connector(Search);
