import React from 'react'

const MainVideoTitle = (props) => {
    const {original_title,overview} = props;
    return (
    <div className='w-screen aspect-video lg:w-3/12 md:w-6/12 p-2 mx-6  text-white absolute lg:my-[20%] sm:my-[20%] md:my-[15%] bg-gradient-to-r'>
      {/* bg-gradient-to-r from-black */}
      <div className='text-xl sm:text-xl md:text-2xl md:mt-0 mt-[50%] md:px-[10%] lg:px-[0%] p-2 m-2 font-bold'>
        {original_title}
      </div>
      <div className='hidden md:inline-block text-black-300 lg:text-lg md:text-sm l md:px-[10%] lg:px-[0%] lg:block p-2 m-2'>
        {overview}
     </div>
      <div className='flex md:mx-[10%]'>
      <button className='bg-white text-lg text-black mx-[10%] md:mx-0 lg:px-[12%]  lg:py-[4%] py-[2%] px-[2%]  md:px-[5%] md:py-[0%] rounded-lg   m-2  flex justify-center items-center hover:bg-opacity-80'>
        <div> ▶  </div>  &nbsp; 
        <div> Play </div>
      </button>
      <button className='bg-white text-lg text-black lg:py-[4%] lg:px-[10%]   md:px-[5%] md:py-[2%] rounded-lg  m-2 flex items-center justify-center opacity-80 hover:bg-opacity-90' >
        <div>
             ℹ️ 
        </div>&nbsp;
        <div>
            More info
        </div>
        </button>
      </div>

    </div>
  )
}

export default MainVideoTitle;
