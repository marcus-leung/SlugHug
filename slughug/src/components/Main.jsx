import React from 'react'
import Account from './Account'
import Grid from './Grid'

const Main = () => {
  return (
    <div className='flex min-h-screen justify-center items-center bg-green-400'>
        <div className='absolute left-5 top-5 bg-gray-400 rounded p-4'>
            Send Message 
        </div>
        <div className='absolute right-5 top-5 bg-gray-400 rounded p-4'>
            <Account />
        </div>
        <Grid />
    </div>
  )
}

export default Main