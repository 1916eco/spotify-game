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
                "You are a Smite video game assistant. The player doesn't know anything of items for the character built and you need to in less than 100 words explain the build what it's doing to help the character. The player will give you 6 items that's being used and you need to explain how they work together. ",
            },
            {
              role: "user",
              content: chatMessage + " keep it under 100 words!",
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
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
      var fullString =
        "For the god " +
        godname +
        " this god has a role of " +
        role +
        " Here are the 6 items the user is building with the description of all: ";
      // loop through the data.build.topBuild and get the name and the fullDesc.Description and SecondaryDescription
      data.build.topBuild.forEach((item) => {
        fullString += item.name + " " + item.fullDesc.Description + " " + item.fullDesc.SecondaryDescription + " ";
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
        {/* loop through data.build.topBuild and display each */}
        {data.build &&
          data.build.topBuild.map((item) => {
            return (
              <div key={item.name} className="w-full h-11 bg-slate-700 items-center justify-center flex">
                <div className="w-10 h-10 bg-gray-800 rounded-lg overflow-hidden">
                  <img src={item.icon} alt={item.name} className="" />
                </div>
                <p>{item.name}</p>
              </div>
            );
          })}
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
