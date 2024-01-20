import React, { useState } from "react";
import Account from "./Account";
import Grid from "./Grid";
import SlugIcon from "../assets/SlugIcon.png";

const Main = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <div className="flex min-h-screen justify-center items-center bg-green-400">
      <div className="absolute left-5 top-5 bg-gray-400 rounded p-4">
        Send Message
      </div>
      <div className="relative">
        <div className="fixed right-5 top-5 rounded p-4">
          <button onClick={() => setIsAccountOpen(true)}>
            <img alt="Slug Icon" src={SlugIcon} height={75} width={75} />
          </button>
          {isAccountOpen && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 popup">
              <Account onClick={() => setIsAccountOpen(false)} />
            </div>
          )}
        </div>
      </div>

      <Grid />
    </div>
  );
};

export default Main;
