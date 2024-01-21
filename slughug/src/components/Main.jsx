import React, { useState } from "react";
import Account from "./Account";
import Grid from "./Grid";
import Write from "./Write";
import SlugIcon from "../assets/SlugIcon.png";
import composeButton from "../assets/compose.png";
import backgroundImage from '../assets/bgdone.png';
import { useAuth0 } from "@auth0/auth0-react";

const Main = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isNewMessageOpen, setNewMessageOpen] = useState(false);
  const [writeContent, setWriteContent] = useState("");
  const [writeHead, setWriteHead] = useState("");
  const [userData, updateUserData] = useState("");
  const { user, isAuthenticated } = useAuth0();

  const openMessage = () => {
    setNewMessageOpen(false);
  };

  const closeMessage = () => {
    setNewMessageOpen(false);
  };

  const onMessageChange = (content) => {
    setWriteContent(content);
  };

  const onHeadChange = (content) => {
    setWriteHead(content);
  };

  // Create a message
  async function createMessage(data) {
    try {
      const response = await fetch('http://localhost:5000/messages/add', {
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

  // Get user server id from auth0 username
  async function getUser(name) {
    try {
      const response = await fetch('http://localhost:5000/users/getID/'+name)
      updateUserData(await response.json());

      console.log("Success:", userData)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSend = () => {
    setNewMessageOpen(false);
    // Get User
    console.log(user)
    //getUser(user.email)

    const writeObj = {
      messageSender: null, 
      messageHead: writeHead, 
      messageContent: writeContent, 
      messageType: "regular", 
      messageVisibility: "private"
    }

    // THIS BAD BOY SENDS THAT DATA YKNOW
    console.log("WE'RE POSTING A MESSAGE BOIS")
    console.log(writeObj)
    createMessage(writeObj)
  }


  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensures it covers the whole viewport height
      minWidth: '100vw'  // Ensures it covers the whole viewport width
    }}>
    <div className="flex min-h-screen justify-center items-center">
      <div className="absolute top-0 left-0 rounded p-4" onClick={() => setNewMessageOpen(true)}>
      <div onClick={() => setNewMessageOpen(true)}>
        {/* new button for compose */}
        <img src={composeButton} alt="Send Message" height={75} width={75} className="cursor-pointer" draggable="false"/>
      </div>
      </div>


      {isNewMessageOpen && (
          <Write
            open={isNewMessageOpen}
            close={closeMessage}
            send={handleSend}
            content={writeContent}
            head={writeHead}
            onHeadChange={onHeadChange}
            onMessageChange={onMessageChange}
          />
      )}

      <div className="absolute top-0 right-0 rounded p-4">
        <button onClick={() => setIsAccountOpen(true)}>
          <img alt="Slug Icon" src={SlugIcon} height={75} width={75} draggable="false"/>
        </button>
      </div>
      {isAccountOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Account onClick={() => setIsAccountOpen(false)} />
        </div>
      )}

      <Grid />
    </div>
    </div>
  );
};

export default Main;
