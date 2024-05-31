import React from "react";
import { useEffect,useState } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants";
import Loader from "./Loader";


const VideoBackground = (props) => {
 
const {movieId}=props;
  console.log(movieId);
    const [trailerid,setTrailerId]=useState(null);
    const getMovieVideos= async()=>{
        const data= await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",TMDB_API_OPTIONS);
        const json=await data?.json();
        console.log(json);
        const filterData=json?.results.filter(video=>video.type==="Trailer")
        const trailer=filterData[0];
        
        setTrailerId(trailer?.key)
        
    }
    useEffect(()=>{
        getMovieVideos();
    },[movieId])
    
    
  return (
    <>
    {trailerid? (
    <div className='w-full'>
        <embed className='w-full aspect-video' width="600"   loop="true" autostart="true"     src={"https://www.youtube.com/embed/"+trailerid
        +"?controls=0&loop&autoplay=1&mute=1" 
      } controller="false"
        title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></embed>
    </div>
  ):(
    <Loader/>
  )
    }
    </>
  )
};

export default VideoBackground;






