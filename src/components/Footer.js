import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const date=new Date().getFullYear();
  return (
    <div className='bg-zinc-900 shadow-inner text-xs pb-4 sm:text-base text-white w-auto '>
        <div className='w-10/12 mx-auto h-auto flex-wrap items-center flex justify-evenly'>
        <div className=' w-[40%] md:w-[20%] p-1'>
            <div className='flex justify-start'>
                <span className='font-semibold text-center pb-2'>CineMania</span>
            </div>
            <p className='break-words text-gray-300 w-full'>Copyright @{date}. CineMania by Mridul Dutt</p>     
        </div>
        <div className='w-[40%] md:w-[20%] p-2'>
            <ul className='m-1 p-1'>
                <li className='font-semibold m-2 '>
                    Company
                </li>
                <li className='text-gray-300 m-2'>
                    <Link to="/developerPage" className='hover:underline'>Developer</Link>
                </li>
                <li className='text-gray-300  m-2'>
                    <Link to="/movies" className='hover:underline'>Movies</Link>
                </li>
                <li className='text-gray-300 m-2'>
                    Career
                </li>
            </ul>
        </div>
        <div className='w-[40%] md:w-[20%] p-2'>
            <ul className='m-1 text-gray-300 p-1'>
            <li className='m-2'>
                    Privacy Policy
                </li>
                <li className='m-2'>
                    Terms & Conditions
                </li>
   
            </ul>
        </div>
        <div className='w-[40%] md:w-[20%] p-2'>
            <ul className='m-1 p-1'>
                <li className='font-semibold m-2'>
                    Contact Us
                </li>
                <li className='m-2 text-gray-300'>
                    Vaishali,Delhi-NCR
                </li>
                <li className='m-2 break-words text-gray-300'>
                    mirdul12dutt@gmail.com
                </li>
            </ul>
        </div>
    </div>


    </div>
      )
}

export default Footer