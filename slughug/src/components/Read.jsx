import React from "react";

const Read = ({ message, onClick }) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-yellow-500 p-8 border-4 border-amber-800 rounded-lg shadow-md max-w-md w-full">
        <p>{message}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Read;
