import React from "react";

const Login = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-blue-400">
      <div className="bg-blue-300 w-[380px] h-[320px] rounded-md">
        <h1 className="font-bold text-center pt-5">Login</h1>
        <label
          class="block text-gray-800 text-md font-bold ml-4 mb-2 mt-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow border rounded w-[300px] py-2 px-3 ml-4 text-gray-700"
          id="username"
          type="text"
          placeholder="Username"
        />
        <label
          class="block text-gray-800 text-md font-bold ml-4 mb-2 mt-4"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow border rounded w-[300px] py-2 px-3 ml-4 text-gray-700 mb-3"
          id="password"
          type="password"
          placeholder="Password"
        />
        <div class="flex items-center justify-between px-5 mt-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Sign In
          </button>
          <a
            class="inline-block font-bold text-md text-blue-500 hover:text-blue-800"
            href="#"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
