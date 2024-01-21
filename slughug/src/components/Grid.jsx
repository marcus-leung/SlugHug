import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Slug from "./Slug";
import Read from "./Read";
import Reply from "./Reply";

const Grid = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");  
  const [isClosing, setIsClosing] = useState(false); //to handle closing animation
  const [repliedContent, setRepliedContent] = useState("");
  const [repliedHead, setRepliedHead] = useState("");
  const [messageHead, setMessageHead] = useState("");
  const [messageSender, setMessageSender] = useState("");
  const [messageReceiver, setMessageReceiver] = useState("");
  const [db, setDBState] = useState([]);
  const [ib, setIBState] = useState([]);
  const [reply, setReplyState] = useState({})
  const [authObject, setAuth] = useState(useAuth0());
  // adjust let -> setState
  // instead of db = -> setDBContent(data)

  // Meaningcloud Sentiment Analysis API
  function analyzeSentiment(text) { 
    //event.preventDefault(); 
    const apiKey = "e1c2247e1f181a436994dbbc262adffb"; 
    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&txt=${encodeURIComponent( text )}&lang=en`; 
  
    fetch(url) 
    .then((response) => { 
      if (response.ok) { 
        return response.json(); 
      } else { 
        throw new Error("Request failed"); 
      } 
    }) 
    .then((data) => { 
      const sentiment = data.score_tag; 
      // console.log(`Text: ${text}`); 
      // console.log(`Sentiment: ${sentiment}`); 
      if (sentiment == "P+") { 
        return "Strong Positive"; 
      } if (sentiment == "P") { 
        return "Positive"; 
      } if (sentiment == "NEU") { 
        return "Neutral"; 
      } if (sentiment == "N") { 
        return "Negative"; 
      } if (sentiment == "N+") { 
        return "Strong Negative"; 
      } if (sentiment == "NONE") { 
        return "Without Polarity"; 
      } 
    }) 
    .catch((error) => { 
      console.error("Error:", error); 
    }); 
  } 

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

  // Get an inbox by inbox receiver
  async function getInbox() {
    try {
      const response = await fetch('http://localhost:5000/inbox')
      const result = await response.json();

      console.log("Success:", result)
      setIBState(result)
    } catch (err) {
      console.error(err)
    }
  }

  // Create a response to a given userID, it's in the data object
  async function createResponse(data) {
    try {
      data.messageType = "response"
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
    const sentiment = analyzeSentiment(replyObj.messageContent)
    console.log(sentiment)
    if (sentiment != "Strong Negative" || sentiment != "Negative") {
      createResponse(replyObj)
    } else {
      console.log("That wasn't a nice response at all, heck no >:(")
    }
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
    getInbox()
    console.log("CURRENT DATABASE FOR RENDER")
    console.log(db)
    console.log(ib)
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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-5 py-5">
        {db.concat(ib).map((item, index) => (
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
