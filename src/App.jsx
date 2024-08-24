import { useState, useEffect } from "react";
import axios from "axios";
//import data.json from "./assets/data.json";
import data from "./assets/data.json";
import SongCard from "./components/SongCard";
import { ChevronBack, ChevronForward } from "react-ionicons";

function App() {
  //create a useState for cards there should be one item in the left: item and one in the right: item and keeping a track of all used items
  const [leftCard, setLeftCard] = useState(null);
  const [rightCard, setRightCard] = useState(null);
  const [usedItems, setUsedItems] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  //create a new array with the data from the json file only take the name the uri the href and the items[].album.images[0].url
  const newData = data.items.map((item, index) => {
    return {
      name: item.name,
      uri: item.uri,
      href: item.href,
      image: item.album.images[0].url,
      rank: index + 1,
    };
  });
  console.log("newdata", newData);
  //create a function that will get a random item from the data array and set it to the leftCard and rightCard and put it in used
  const getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * newData.length);
    const randomItem = newData[randomIndex];
    if (usedItems.includes(randomItem) || randomItem === leftCard) {
      getRandomItem();
    } else {
      newData.splice(randomIndex, 1);
      return randomItem;
    }
  };

  //create a function that gets isHigher passed into it true or false if the user clicks on the up arrow or down arrow check if the left song is higher rank then the right song if it is then set the right song to the left song and get a new right song if the left song is lower rank then the right song then set the right song to the left song and get a new right song
  const checker = (isHigher) => {
    if (isHigher) {
      if (leftCard.rank > rightCard.rank) {
        setLeftCard(rightCard);
        setRightCard(getRandomItem());
        setUsedItems([...usedItems, rightCard]);
      } else {
        setGameOver(true);
      }
    } else {
      if (leftCard.rank < rightCard.rank) {
        setLeftCard(rightCard);
        setRightCard(getRandomItem());
        setUsedItems([...usedItems, rightCard]);
      } else {
        setGameOver(true);
      }
    }
  };
  //function to restart everything
  const restart = () => {
    setUsedItems([]);
    setLeftCard(getRandomItem());
    setRightCard(getRandomItem());
    setGameOver(false);
    setWinner;
  };

  useEffect(() => {
    setUsedItems([]);
    setLeftCard(getRandomItem());
    setRightCard(getRandomItem());
  }, []);

  useEffect(() => {
    // if used array is more than 45 then set the game over to true
    if (usedItems.length > 15) {
      setWinner(true);
    }
  }, [usedItems]);

  // useEffect when the game is over or the winner is true then in local storage set highscore to the length of the used array if it's higher than the highscore already in there
  useEffect(() => {
    if (gameOver || winner) {
      const highScore = localStorage.getItem("highScore");
      if (highScore) {
        if (usedItems.length > highScore) {
          localStorage.setItem("highScore", usedItems.length);
        }
      } else {
        localStorage.setItem("highScore", usedItems.length);
      }
    }
  }, [gameOver, winner]);

  return (
    <div
      className="flex flex-col gap-8  overflow-hidden w-screen h-screen items-center justify-center "
      id="background"
    >
      <div className="-z-40">
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
        <span id="circle"></span>
      </div>
      <div className="flex flex-col justify-center items-center z-50">
        {!gameOver && !winner ? (
          <>
            <h1 className=" text-7xl text-white text-center py-2  ">Higher or Lower</h1>
            <br />
            <h1 className=" text-7xl text-white text-center py-2  ">{usedItems.length || ``}</h1>
            <br />
            <p className="text-white">Did you listen to right one more than left?</p>
          </>
        ) : (
          <>
            <h1 className=" text-7xl text-red-600 text-center py-2  ">Game over!!</h1> <br />
            <p className="text-white text-xl">
              Your high score is: {localStorage.getItem("highScore") || 0} and your current score was:{" "}
              {usedItems.length}
            </p>
          </>
        )}
        {winner ? <h1 className=" text-7xl text-green-500 text-center py-2  ">You Won</h1> : null}
      </div>

      <div className="flex flex-row gap-8  overflow-hidden w-screen h-fit  items-start justify-center">
        <SongCard title={leftCard?.name} img={leftCard?.image} rank={leftCard?.rank} />

        {/* Middle part */}
        <div className="flex flex-col gap-7 w-28 h-full rounded-md justify-center items-center" id="middleCard">
          {!gameOver || !winner ? (
            <div className="flex items-start  w-full">
              <ChevronForward color={"#ffffff"} height="100px" width="100px" onClick={() => checker(false)} />
            </div>
          ) : null}

          {!gameOver || !winner ? (
            <div className="flex items-start w-full">
              <ChevronBack color={"#ffffff"} height="100px" width="100px" onClick={() => checker(true)} />
            </div>
          ) : null}
        </div>

        <SongCard title={rightCard?.name} img={rightCard?.image} rank={rightCard?.rank} />
      </div>
      <p className="text-white">
        {
          // if the used more than 2 then in order display all except the last one
          usedItems.length >= 0
            ? usedItems.map((item) => {
                return <span key={item.uri}>{item.name} &gt; </span>;
              })
            : null
        }
      </p>
      {gameOver || winner ? (
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            restart();
          }}
        >
          Restart
        </button>
      ) : null}
    </div>
  );
}

export default App;
