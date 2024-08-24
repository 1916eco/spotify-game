import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const BuildBar = ({ godname, role }) => {
  //
  const [data, setData] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  async function getChatResponse() {
    try {
      const response = await axios.post(
        "http://localhost:1234/v1/chat/completions",
        {
          model: "lmstudio-community/Phi-3.1-mini-4k-instruct-GGUF",
          messages: [
            {
              role: "system",
              content:
                "You are a Smite video game assistant this is not any other game only Smite. I will give you a god that you have to build 6 items for. Do not make up random items only pick from the list I give. ",
            },
            {
              role: "user",
              content:
                chatMessage +
                "Pick 6 items from all Items I send and using the descriptions and the information like pick rate and win rate to build a really good character. First tell me only the name of all 6 items you choose then explain how these items work together. You can only pick an item once you cannot get 2 of it. Do not explain each item only describe the final build. Keep it less than 250 words.",
            },
          ],
          temperature: 0.7,
          max_tokens: 250,
          stream: false, // Set to true if you handle streaming manually
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setChatResponse(response.data.choices[0].message.content);
      console.log(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.smite-master.com/api/god-stat/items?casual=0&alias=${godname}&mode=conquest&&lang=en`
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

  useEffect(() => {
    //loop through data.items and for each item get the item.name also get the item.fullDesc.Description and also if it has a SecondaryDescription get that too put it into one string and console log it
    if (data.items && chatResponse === "") {
      var fullString = "For the god " + godname + "this god has a role of " + role + " Here are all possible items: ";
      data.items.forEach((item) => {
        const itemString = `Item called: "${item.name}", Descriptions: ${
          item.fullDesc.Description ? item.fullDesc.Description : ""
        } ${item.fullDesc.SecondaryDescription || ""}, the pickrate of the item is ${
          item.pickrate
        }. with a winrate of ${item.winrate}. `;
        fullString += itemString;
      });
      setChatMessage(fullString);
      console.log(chatMessage);
      getChatResponse();
      // create a
    }
  }, [data]);

  return (
    <div className="bg-slate-600 justify-evenly text-white items-center text-center p-2 ">
      <div className="flex flex-row w-screen mx-16 gap-3 ">
        {/* <div className="w-full h-11 bg-slate-700 items-center justify-center flex"> Hello</div>
        <div className="w-full h-11 bg-slate-700 items-center justify-center flex"> Hello</div>
        <div className="w-full h-11 bg-slate-700 items-center justify-center flex"> Hello</div>
        <div className="w-full h-11 bg-slate-700 items-center justify-center flex"> Hello</div>
        <div className="w-full h-11 bg-slate-700 items-center justify-center flex"> Hello</div>
        <div className="w-full h-11 bg-slate-700 items-center justify-center flex"> Hello</div> */}
      </div>
      {/* display the response from ai */}
      <div className="mx-10">{chatResponse ? <p className="mx-11 px-7">{chatResponse}</p> : null}</div>
    </div>
  );
};

BuildBar.propTypes = {
  godname: PropTypes.string.isRequired,
};
