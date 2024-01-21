import React, { useState } from "react";
import Account from "./Account";
import Grid from "./Grid";
import Write from "./Write";
import SlugIcon from "../assets/SlugIcon.png";

const Main = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isNewMessageOpen, setNewMessageOpen] = useState(false);

  return (
    <div className="flex min-h-screen justify-center items-center bg-green-400">
      <div className="cursor-pointer absolute left-5 top-5 bg-gray-400 rounded p-4" onClick={() => setNewMessageOpen(true)}>
        Send Message
      </div>
      {isNewMessageOpen && (
          <Write onClick={() => setNewMessageOpen(false)} />
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
  );
};

export default Main;
