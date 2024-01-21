import React, { useEffect, useState } from "react";
import Slug1 from "../assets/Slugs/GridSlug1.png";
import Slug2 from "../assets/Slugs/GridSlug2.png";
import Slug3 from "../assets/Slugs/GridSlug3.png";
import Slug4 from "../assets/Slugs/GridSlug4.png";
import Slug5 from "../assets/Slugs/GridSlug5.png";
import Slug6 from "../assets/Slugs/GridSlug6.png";
import Slug7 from "../assets/Slugs/GridSlug7.png";

const Slug = () => {
  const slug_arr = [Slug1, Slug2, Slug3, Slug4, Slug5, Slug6, Slug7];

  const rand_index = Math.floor(Math.random() * slug_arr.length);
  
  const [jump, setJump] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setJump(true);

      // Reset jump after animation duration (500ms)
      setTimeout(() => setJump(false), 500);
    }, Math.random() * 5000 + 3000); // Random interval between 1s and 4s

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      className={`cursor-pointer aspect-square w-[170px] h-[170px] justify-center items-center ${
        jump ? "jump" : ""
      }`}
    >
      <img src={slug_arr[rand_index]} alt="slug" draggable="false" />
    </div>
  );
};

export default Slug;
