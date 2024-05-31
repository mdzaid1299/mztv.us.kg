import { TMDB_API_OPTIONS, topRated_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addTopRatedMovies } from "../utils/moviesReduxSlice";    
import { useEffect } from "react";
    
const useTopRatedMovies=()=>{

    const dispatch=useDispatch();

    const getTopRated=async ()=>{
        const data=await fetch(topRated_URL,TMDB_API_OPTIONS);
        const json=await data.json();
        dispatch(addTopRatedMovies(json.results));
    }
    
    useEffect(()=>{
        getTopRated();
    },[])

}

export default useTopRatedMovies;