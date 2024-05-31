import React from 'react'
import { Link,useRouteError } from 'react-router-dom';
import { Error_Img_URL } from '../utils/constants';

const Error = () => {
    const error=useRouteError();
  return (
    <>
    <div className='w-full bg-stone-900 h-screen text-white'>
      <div className='w-10/12 h-full  mx-auto p-4  flex flex-col justify-center flex-wrap items-center'>
      <div className='w-8/12'>
      <img className=' rounded-3xl' src={Error_Img_URL} alt='Error'/>
      </div>
      <div className='w-10/12 text-center'>
        <h1 className='text-5xl  m-2 p-2 font-semibold'>{error.status}-{error.statusText}</h1>
        <p className='text-xl m-2 p-2'>Sorry,the page you're looking for could not be found.</p>
        <button className='m-2 p-2 bg-blue-400 rounded-lg hover:bg-blue-500'>
          <Link to="/">Go to homepage</Link>
          </button>
      </div>
    </div>
    </div>
    </>
    
    
  )
}

export default Error