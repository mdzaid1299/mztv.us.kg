import { TMDB_API_OPTIONS, upComing_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesReduxSlice";    
import { useEffect } from "react";
    
const useUpComing=()=>{

    const dispatch=useDispatch();

    const getUpComing=async ()=>{
        const data=await fetch(upComing_URL,TMDB_API_OPTIONS);
        const json=await data.json();
        dispatch(addUpcomingMovies(json.results));
    }
    
    useEffect(()=>{
        getUpComing();
    },[])

}

export default useUpComing;