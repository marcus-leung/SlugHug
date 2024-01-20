import React, { useState } from "react";
import Slug from "./Slug";
import Read from "./Read";

const Grid = () => {
  const [messageContent, setMessageContent] = useState("");
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleSlugClick = (text) => {
    if (!isMessageOpen) {
      setMessageContent(text);
      setIsMessageOpen(true);
    }
  };

  return (
    <div className="pt-2 w-5/6 h-3/4 mt-40 justify-center items-center ">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-5 py-5 bg-green-500">
        {Array(50).fill(
          <div onClick={() => handleSlugClick("bruh")}>
            <Slug />
          </div>
        )}
      </div>

      {isMessageOpen && (
        <Read message="This is a message" onClick={() => setIsMessageOpen(false)}/>
      )}
    </div>
  );
};

export default Grid;
