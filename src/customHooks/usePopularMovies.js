import { TMDB_API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesReduxSlice";    
import { useEffect } from "react";
    
const usePopularMovies=()=>{

    const dispatch=useDispatch();

    const getPopular=async ()=>{
        const data=await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',TMDB_API_OPTIONS);
        const json=await data.json();
        dispatch(addPopularMovies(json.results));
    }
    
    useEffect(()=>{
        getPopular();
    },[])

}

export default usePopularMovies;