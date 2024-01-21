import React from "react";
import SlugWindow from "../assets/SlugWindow.png";

const Write = ({ onClick }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="w-full h-5/6 relative">
        <img src={SlugWindow} alt="Slug Window" className="block mx-auto" draggable="false"/>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md mt-20 text-black">
          <form>
            <label
              htmlFor="message"
              className="font-bold block text-center mb-2 text-xl"
            >
              New Message
            </label>
            <textarea
              type="text"
              id="message"
              name="Message"
              className="block  mx-auto p-3 rounded-lg w-[600px] h-[300px] bg-yellow-100"
            ></textarea>
          </form>
        </div>

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

export default Write;
