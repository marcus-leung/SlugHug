import React, { useState } from "react";
import Slug from "./Slug";
import Read from "./Read";
import Reply from "./Reply";

const Grid = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const openMessage = () => {
    setIsMessageOpen(true);
  };

  const closeMessageModal = () => {
    setIsMessageOpen(false);
  };

  const openReply = () => {
    setIsMessageOpen(false);
    setIsReplyOpen(true);
  };

  const closeReply = () => {
    setIsReplyOpen(false);
  };

  const handleSend = () => {
    setIsMessageOpen(false);
    setIsReplyOpen(false);
  };

  return (
    <div className="pt-2 w-5/6 h-3/4 mt-40 justify-center items-center ">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-5 py-5 bg-green-500">
        {Array(24).fill(
          <div onClick={openMessage}>
            <Slug type="professional" />
          </div>
        )}
      </div>

      <Read
        open={isMessageOpen}
        close={closeMessageModal}
        reply={openReply}
        send={handleSend}
        content="Modal message"
        head = "i like head"
      />

      <Reply
        open={isReplyOpen}
        close={closeReply}
        reply={openReply}
        send={handleSend}
        content="Reply message"
      />
    </div>
  );
};

export default Grid;
