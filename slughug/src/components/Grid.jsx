import React, { useState, useEffect } from "react";
import Slug from "./Slug";
import Read from "./Read";

const Grid = () => {
  const [messageContent, setMessageContent] = useState("");
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [db, setDBState] = useState([])
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

  const handleSlugClick = (text) => {
    if (!isMessageOpen) {
      setMessageContent(text);
      setIsMessageOpen(true);
    }
  };

  // Call to server and get the shiz
  useEffect(() => {
    getMessages()
  }, [])

  return (
    <div className="pt-2 w-5/6 h-3/4 mt-40 justify-center items-center ">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-5 py-5 bg-green-500">
        {db.map((item, index) => (
        <div key={index} onClick={() => handleSlugClick(item.messageContent)}>
          <Slug type={item.messageType} sender={item.messageSender} receiver={item.messageReceiver} head={item.messageHead} content={item.messageContent}/>
        </div>
      ))}
      </div>

      {isMessageOpen && (
          <Read message={messageContent} onClick={() => setIsMessageOpen(false)}/>
      )}
    </div>
  );
};

export default Grid;
