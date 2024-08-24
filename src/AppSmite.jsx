import { useState, useEffect } from "react";
import axios from "axios";
import { GodCard } from "./components/godCard";
import { BuildBar } from "./components/BuildBar";

function AppSmite() {
  const [data, setData] = useState([]);
  const [randomGodNumber, setRandomGodNumber] = useState(null);
  const [buildForGod, setBuildForGod] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://www.smite-master.com/api/matches?casual=0&mode=joust&lang=en"
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col  overflow-hidden w-full bg-slate-800 items-center justify-center">
      <div className="flex flex-col gap-2 items-center justify-center m-2 ">
        {randomGodNumber !== null ? (
          <GodCard title={data.matches[randomGodNumber]?.alias} image={data.matches[randomGodNumber]?.icon} />
        ) : null}
        <button
          onClick={() => {
            setRandomGodNumber(Math.floor(Math.random() * data.matches.length));
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Random God
        </button>
        {randomGodNumber !== null ? (
          <button
            onClick={() => {
              setBuildForGod(data.matches[randomGodNumber]?.alias);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Random Build
          </button>
        ) : null}
        {buildForGod ? <BuildBar godname={buildForGod} role={data.matches[randomGodNumber]?.role} /> : null}
      </div>
      <div className="flex flex-wrap w-screen">
        {/* map over data.matches */}
        {data.matches &&
          data.matches.map((match) => {
            return (
              <div key={match.alias} className="p-4">
                <GodCard title={match.alias} image={match.icon} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AppSmite;
