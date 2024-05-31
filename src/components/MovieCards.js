import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

const MovieCards = (props) => {
  
    const {posterPath} = props;
    if(!posterPath) return ;
  return (
    <div className='w-40 p-1 m-2 hover:border-2 hover:border-red-200 cursor-pointer'>
      <img src={IMG_CDN_URL+posterPath} alt="Movie Cards" />
    </div>
  )
}

export default MovieCards;