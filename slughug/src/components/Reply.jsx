import React from "react";
import SlugWindow from "../assets/SlugWindow.png";

const Reply = ({ open, close, reply, send, content, head, onHeadChange, onMessageChange }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("THIS IS FROM HANDLE FUNCTION!!!!!")
    console.log(event.target.Subject.value)
    console.log(event.target.Message.value)
    //send();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="w-full h-5/6 relative">
        <div className="read-container">
            <img
            src={SlugWindow}
            alt="Slug Window"
            className="block mx-auto"
            draggable="false"
          />
        
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md mt-20 text-black">
          <form onSubmit={handleSubmit}>
            <label htmlFor="head" className="font-bold block text-center mb-2 text-xl">
              Subject
            </label>

            <textarea
              rows="1"
              cols="90"
              type="text"
              id="subject"
              name="Subject"
              value={head}
              onChange={(e) => onHeadChange(e.target.value)}
              className="block  mx-auto p-3 rounded-lg  bg-yellow-100"
            ></textarea>
            
            <label htmlFor="message" className="font-bold block text-center mb-2 text-xl pt-5">
              Reply Message
            </label>

            <textarea
              rows="8"
              cols="90"
              type="text"
              id="message"
              name="Message"
              value={content}
              onChange={(e) => onMessageChange(e.target.value)}
              className="block  mx-auto p-3 rounded-lg  bg-yellow-100"
            ></textarea>
          </form>
          </div>
        </div>

        <button
          className="absolute mt-4 bg-yellow-600 shadow-md text-white px-4 py-2 rounded bottom-0 left-0 -translate-y-12 translate-x-12"
          onClick={close}
        >
          Close
        </button>

        <button
          className="absolute mt-4 bg-green-600 shadow-md text-white px-4 py-2 rounded bottom-0 right-0 -translate-y-12 -translate-x-12"
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Reply;
