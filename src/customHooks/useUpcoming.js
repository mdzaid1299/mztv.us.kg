import { TMDB_API_OPTIONS, upComing } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpComing } from "../utils/moviesReduxSlice";    
import { useEffect } from "react";
    
const useUpComing=()=>{

    const dispatch=useDispatch();

    const getUpComing=async ()=>{
        const data=await fetch(upComing,TMDB_API_OPTIONS);
        const json=await data.json();
        dispatch(addUpComing(json.results));
    }
    
    useEffect(()=>{
        getUpComing();
    },[])

}

export default useUpComing;