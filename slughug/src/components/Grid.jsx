import React from 'react'
import Slug from './Slug'

const Grid = () => {
  return (
    <div className='pt-2 w-5/6 h-3/4 mt-40 justify-center items-center '>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-5 py-5 bg-green-500'>
            {Array(50).fill(<Slug />)}
        </div>
    </div>
  )
}

export default Grid