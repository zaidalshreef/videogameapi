import { useState } from "react";
import "./App.css";

function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchedGames(data);
        setGameTitle("")
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
        {searchedGames.map((game,key) => (
          <div key={key} className="game">
            {game.external}
             </div>
        ))}
        </div>
    
      </div>
      <div className="dealsSection">
        <h1> last Deals</h1>
        

      </div>
    </div>
  );
}

export default App;
