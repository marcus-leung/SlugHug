import React, { useEffect, useState } from "react";
import Slug1 from "../assets/Slugs/GridSlug1.png";
import Slug2 from "../assets/Slugs/GridSlug2.png";
import Slug3 from "../assets/Slugs/GridSlug3.png";
import Slug4 from "../assets/Slugs/GridSlug4.png";
import Slug5 from "../assets/Slugs/GridSlug5.png";
import Slug6 from "../assets/Slugs/GridSlug6.png";
import Slug7 from "../assets/Slugs/GridSlug7.png";
import TherapistSlug1 from "../assets/Slugs/TherapistSlug1.png";
import TherapistSlug2 from "../assets/Slugs/TherapistSlug2.png";
import TherapistSlug3 from "../assets/Slugs/TherapistSlug3.png";
import ReceiveSlug1 from "../assets/Slugs/ReceiveSlug1.png";
import ReceiveSlug2 from "../assets/Slugs/ReceiveSlug2.png";


const Slug = ({ type, sender, receiver, head, content}) => {
  const slug_arr = [Slug1, Slug2, Slug3, Slug4, Slug5, Slug6, Slug7];
  const ther_arr = [TherapistSlug1, TherapistSlug2, TherapistSlug3];
  const rece_arr = [ReceiveSlug1, ReceiveSlug2]

  const rand_slug_index = Math.floor(Math.random() * slug_arr.length);
  const rand_ther_index = Math.floor(Math.random() * ther_arr.length);
  const rand_rece_index = Math.floor(Math.random() * rece_arr.length);

  let selected_type;
  switch (type) {
    case 'professional':
      selected_type = <img src={ther_arr[rand_ther_index]} alt="therapist slug" draggable="false" />
      break;
    case 'response':
      selected_type = <img src={rece_arr[rand_rece_index]} alt="response slug" draggable="false" />
      break;
    default:
      selected_type = <img src={slug_arr[rand_slug_index]} alt="slug" draggable="false" />
  }

  const [jump, setJump] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setJump(true);

      // Reset jump after animation duration (500ms)
      setTimeout(() => setJump(false), 500);
    }, Math.random() * 7500 + 500); // Random interval between 1s and 4s

    return () => clearInterval(timer);
  }, []);
  
  return (
    <div
      className={`cursor-pointer aspect-square w-[170px] h-[170px] justify-center items-center transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-120 ${
        jump ? "jump" : ""
      }`}
    >
      {selected_type}
    </div>
  );
};

export default Slug;
