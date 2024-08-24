import React from "react";

export const GodCard = ({ title, image }) => {
  return (
    <div className="bg-slate-700 mx-2 p-4 rounded-lg shadow-lg w-64">
      <div className="flex flex-col items-center">
        <div className="w-full h-44 bg-gray-800 rounded-lg overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <p className="mt-4 text-white text-lg font-semibold">{title}</p>
      </div>
    </div>
  );
};
