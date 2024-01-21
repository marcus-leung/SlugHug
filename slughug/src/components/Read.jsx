import React from "react";
import SlugWindow from "../assets/SlugWindow.png"

const Read = ({ message, onClick }) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="w-full h-5/6">
        <img src={SlugWindow} alt="Slug Window"/>
        <p className="absolute text-md text-white top-1/2 left-1/2">
          {message}
          </p>
        <button
          className="absolute mt-4 bg-yellow-600 shadow-md text-white px-4 py-2 rounded bottom-0 right-0 -translate-y-12 -translate-x-12"
          onClick={onClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Read;
