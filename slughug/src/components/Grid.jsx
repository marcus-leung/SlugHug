import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Slug from "./Slug";
import Read from "./Read";
import Reply from "./Reply";

const Grid = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");  const [isClosing, setIsClosing] = useState(false); //to handle closing animation

  const [repliedContent, setRepliedContent] = useState("");
  const [repliedHead, setRepliedHead] = useState("");
  const [messageHead, setMessageHead] = useState("");
  const [messageSender, setMessageSender] = useState("");
  const [messageReceiver, setMessageReceiver] = useState("");
  const [db, setDBState] = useState([]);
  const [reply, setReplyState] = useState({})
  const [authObject, setAuth] = useState(useAuth0());
  // adjust let -> setState
  // instead of db = -> setDBContent(data)

  // HTTP Server Fetch Request definition
  async function getMessages() {
    try {
      const response = await fetch('http://localhost:5000/messages')
      const data = await response.json();
  
      console.log("Success:", data)
      setDBState(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Create a response to a given userID, it's in the data object
  async function createResponse(data) {
    try {
      const response = await fetch('http://localhost:5000/inbox/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      const result = await response.json();
      console.log("Success:", result)
    } catch (err) {
      console.error(err)
    }
  }

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
    console.log({
      messageReceiver: authObject.user, 
      messageHead: repliedHead, 
      messageContent: repliedContent, 
      messageType: "regular", 
      messageVisibility: "private"
    })
    const replyObj = {
      messageReceiver: messageSender, 
      messageHead: repliedHead, 
      messageContent: repliedContent, 
      messageType: "regular", 
      messageVisibility: "private"
    }

    // THIS BAD BOY SENDS THAT DATA YKNOW
    createResponse(replyObj)
  };

  const onMessageChange = (content) => {
    setRepliedContent(content);
  };

  const onHeadChange = (content) => {
    setRepliedHead(content);
  };

  const handleSlugClick = (text, head, sender, receiver) => {
    if (!isMessageOpen) {
      setMessageContent(text);
      setMessageHead(head);
      setMessageSender(sender);
      setMessageReceiver(receiver);
      setIsMessageOpen(true);
    }
  }

  // Call to server and get the shiz
  useEffect(() => {
    getMessages()
  }, [])

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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-5 py-5 bg-green-500">
        {db.map((item, index) => (
        <div key={index} onClick={() => handleSlugClick(item.messageContent, item.messageHead, item.messageSender, item.messageReceiver)}>
          <Slug type={item.messageType} sender={item.messageSender} receiver={item.messageReceiver} head={item.messageHead} content={item.messageContent}/>
        </div>
      ))}
      </div>

      <Read
        open={isMessageOpen}
        close={closeMessageModal}
        reply={openReply}
        send={handleSend}
        content={messageContent}
        head = {messageHead}
      />

      <Reply
        open={isReplyOpen}
        close={closeReply}
        reply={openReply}
        send={handleSend}
        content={repliedContent}
        head={repliedHead}
        onHeadChange={onHeadChange}
        onMessageChange={onMessageChange}
      />
    </div>
  );
};

export default Grid;
