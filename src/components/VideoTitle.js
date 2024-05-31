import React from 'react';

const VideoTitle = ({title,overview}) => {

    
  return (
    <div className='w-3/12 p-2 mx-6 text-white absolute my-[25%] sm:my-[21%] md:my-[17%]'>
     <div className='text-lg sm:text-xl md:text-3xl p-2 m-2 font-bold'>
        {title}
     </div>
     <div className='hidden text-gray-300 lg:block p-2 m-2'>
        {overview}
     </div>
    </div>
  )
}

export default VideoTitle