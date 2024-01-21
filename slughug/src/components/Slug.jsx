import React from 'react'
import Slug1 from '../assets/Slugs/GridSlug1.png';
import Slug2 from '../assets/Slugs/GridSlug2.png';
import Slug3 from '../assets/Slugs/GridSlug3.png';

const Slug = () => {
  const slug_arr = [Slug1, Slug2, Slug3];

  const rand_index = Math.floor(Math.random() * slug_arr.length)
  
  return (
    <div className='cursor-pointer aspect-square w-[170px] h-[170px] justify-center items-center'>
        <img src={slug_arr[rand_index]} alt="slug" />
    </div>
  )
}

export default Slug