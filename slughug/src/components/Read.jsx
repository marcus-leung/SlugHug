import React from "react";
import SlugWindow from "../assets/SlugWindow.png"

const Read = ({ message, onClick, isClosing }) => {
  const windowClass = isClosing ? 'read-container-closing' : 'read-container';
  return (
    
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="w-full h-5/6">
        <div className="read-container">
          <div className={windowClass}>
            <img src={SlugWindow} alt="Slug Window"/>
          </div>
          {/* <p>{message}</p> */}
          <p className="text-front absolute text-md text-white top-1/2 left-1/2">
            TEXT
            </p>
          <button
            className="absolute mt-4 bg-yellow-600 shadow-md text-white px-4 py-2 rounded bottom-0 right-0 -translate-y-12 -translate-x-12"
            onClick={onClick}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Read;
