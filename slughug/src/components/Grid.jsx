import React, { useState } from "react";
import Slug from "./Slug";
import Read from "./Read";

const Grid = () => {
  const [messageContent, setMessageContent] = useState("");
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); //to handle closing animation

  const handleSlugClick = (text) => {
    if (!isMessageOpen) {
      setMessageContent(text);
      setIsMessageOpen(true);
    }
  };

  // Animation for closing
  const handleClose = () => {
    setIsClosing(true); // Start the closing process
    setTimeout(() => {
      setIsMessageOpen(false);
      setIsClosing(false);
    }, 1000); // Timeout should match the CSS animation duration - will it cut animation short otherwise?
  };

  return (
    <div className="pt-2 w-5/6 h-3/4 mt-40 justify-center items-center ">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-5 py-5">
        {Array(24).fill(
          <div onClick={() => handleSlugClick("bruh")}>
            <Slug />
          </div>
        )}
      </div>

      {isMessageOpen && (
          <Read message={messageContent} onClick={handleClose} isClosing={isClosing} />
      )}
    </div>
  );
};

export default Grid;
