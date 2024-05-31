import {TMDB_API_OPTIONS, nowPlayingMovies } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesReduxSlice";    
import { useEffect } from "react";
    
const useNowPlayingMovies=()=>{

    const dispatch=useDispatch();

    const getNowPlayingMovies=async ()=>{
        const data=await fetch(nowPlayingMovies,TMDB_API_OPTIONS);
        const json=await data.json();
        dispatch(addNowPlayingMovies(json.results));

    }
    
    useEffect(()=>{
        getNowPlayingMovies();
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    },[ ])

}

export default useNowPlayingMovies;