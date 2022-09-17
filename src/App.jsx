import { useState, useEffect } from "react";
import useSWR from "swr";
import "./App.css";

const fetcher =  (...args) => fetch(...args)
.then((response) => response.json())
.catch((error) => {
  console.error(error)
})

function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);

  const {data , error} = useSWR(
    `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3`,
    fetcher
  );

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchedGames(data);
        setGameTitle("");
      });
  };
  

  return (
    <div className="App">
      <div className="searchSection">
        <h1> Search For a Game</h1>
        <input
          placeholder="Minecraft..."
          type="text"
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
        />
        <button onClick={searchGame}>Search Game Title</button>
        <div className="games">
          {searchedGames.map((game, key) => (
            <div key={key} className="game">
              {game.external}
              <img src={game.thumb} alt={game.external} />
              {game.cheapest}
            </div>
          ))}
        </div>
      </div>
      <div className="dealsSection">
        <h1> last Deals</h1>
        <div className="games">
          {data && data.map((game, key) => (
            <div key={key} className="game" id="deals">
              {game.title}
              <p> Normal Price : {game.normalPrice} </p>
              <p> Deal Price : {game.salePrice } </p>
              <h3> YOU SAVE {game.savings.substr(0, 2)}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
