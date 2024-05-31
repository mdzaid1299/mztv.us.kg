import {TMDB_API_OPTIONS, popular, } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopular } from "../utils/moviesReduxSlice";    
import { useEffect } from "react";
    
const usePopular=()=>{

    const dispatch=useDispatch();

    const getPopular=async ()=>{
        const data=await fetch(popular,TMDB_API_OPTIONS);
        const json=await data.json();
        dispatch(addPopular(json.results));
    }
    
    useEffect(()=>{
        getPopular();
    },[])

}

export default usePopular;