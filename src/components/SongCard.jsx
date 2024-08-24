import React from "react";

const SongCard = ({ title, img, rank }) => {
  return (
    <div className="flex flex-wrap bg-gray-900/90 w-80 h-full rounded-md p-12">
      <div className="h-fit text-balance text-center w-full">
        <p className="w-full text-white text-center py-2">
          <b>{title}</b>
          {/* <h1 className="text-3xl text-white"> {rank}</h1> */}
        </p>
      </div>
      <div className="w-full  aspect-square bg-gray-900 rounded-lg overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SongCard;
