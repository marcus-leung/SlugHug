import React from "react";
import SlugPic from "../assets/SlugPic.png";
import LoginButton from "./LoginButton";

const Account = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-blue-300 w-[480px] h-[340px] rounded-md">
        <h1 className="font-bold text-xl text-center pt-5">Account</h1>

        <img src={SlugPic} alt="Slug Picture" className="mx-auto transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-120" height={190} width={190} />
        
        <div class="flex items-center justify-between px-5 mt-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            <LoginButton />
          </button>
          <button onClick={onClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Close 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
