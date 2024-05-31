import { useState, useEffect } from "react";
import { Get_Movie_Credits_Url, Get_Movie_Info_Url1, Get_Movie_Info_Url2, Get_Movie_Recommendations_Url, Get_Movie_Videos_Url, TMDB_API_OPTIONS } from "../utils/constants";

const useMovieInfo = (movieId) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [casts,setCasts]=useState(null);
  const [trailer,setTrailer]=useState(null);
  const getMovieInfo = async () => {
    const data = await fetch(
      Get_Movie_Info_Url1 + movieId + Get_Movie_Info_Url2,
      TMDB_API_OPTIONS
    );
    const json = await data.json();
    setMovieInfo(json);
  };

  const getRecommendations = async () => {
    const data = await fetch(
      Get_Movie_Info_Url1 +
        movieId +
        Get_Movie_Recommendations_Url,
        TMDB_API_OPTIONS
    );
    const json = await data.json();
    const filter = await json.results.filter((movie) => {
      return movie.poster_path !== null;
    });
    setRecommendations(filter);
  };

  const getMovieTrailer=async ()=>{
    const data=await fetch(Get_Movie_Info_Url1+movieId+Get_Movie_Videos_Url,TMDB_API_OPTIONS);
    const json=await data.json();
    const filterData=json.results.filter((data)=>{
        return (data.name==="Official Trailer" && data.type==="Trailer")
    })
    const trailer=filterData?.length>0 ?filterData[0]:json.results[0];
    setTrailer(trailer);
}

  const getCredits=async ()=>{
    const data =await fetch(Get_Movie_Info_Url1+movieId+Get_Movie_Credits_Url,TMDB_API_OPTIONS);
    const json=await data.json();
    setCasts(json.cast);
  }

  useEffect(() => {
    getMovieInfo();
    getRecommendations();
    getCredits();
    getMovieTrailer();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [movieId]);

  return {
    movieInfo: movieInfo,
    recommendations: recommendations,
    casts:casts,
    trailer:trailer
  };
};

export default useMovieInfo;