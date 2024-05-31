import React from 'react'
import { useSelector } from 'react-redux'
import MainVideoTitle from './MainVideoTitle';
import VideoBackground from './VideoBackground';
import Loader from "./Loader";

const MainBackgroundContainer = () => {
    
    const movies = useSelector((store)=>store.movies?.nowPlayingMovies);
    if(!movies) return (<Loader/>);

    const {original_title,id,overview,backdrop_path}=movies[0];

    return (
    <div className="bg-stone-900 md:pt-0 pt-[45%]">
      <MainVideoTitle original_title={original_title} overview={overview} />
      <VideoBackground movieId={id}  backgroundImage={backdrop_path} />


    </div>
  )
}

export default MainBackgroundContainer
