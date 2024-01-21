import React from "react";
import SlugWindow from "../assets/SlugWindow.png"

const Read = ({ open, close, reply, send, content, head}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="w-full h-5/6">
        <img src={SlugWindow} alt="Slug Window" draggable="false"/>
        <h1 className="absolute text-md text-black top-1/2 left-1/2 -translate-y-5">{head}</h1>
        <p className="absolute text-md text-black top-1/2 left-1/2 pt-5">
          {content}
          </p>
        <button
          className="absolute mt-4 bg-yellow-600 shadow-md text-white px-4 py-2 rounded bottom-0 left-0 -translate-y-12 translate-x-12"
          onClick={close}
        >
          Close
        </button>
        <button
          className="absolute mt-4 bg-green-600 shadow-md text-white px-4 py-2 rounded bottom-0 right-0 -translate-y-12 -translate-x-12"
          onClick={reply}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default Read;
