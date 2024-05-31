import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const RecomendationMovieContainer = () => {
  const movies = useSelector((store) => store.movies);
  
  if (!movies) return (<Loader/>);
  const { nowPlayingMovies, popular, topRated, upComing } = movies;
  return (
    movies.nowPlayingMovies && movies.popular && movies.topRated && movies.upComing &&
    movies.upComing &&(
      <div className=" w-full pt-8 bg-black z-20  ">
        <div className=" -mx-10 my-20 md:mt-[2%]  mt-[2%] pl-12 relative">
          <MovieList title="Now Playing" movies={nowPlayingMovies} />
          <MovieList title="Popular Movies" movies={popular} />
          <MovieList title="Top Rated Movies" movies={topRated} />
          <MovieList title="Up Coming Movies" movies={upComing} />
        </div>


      </div>
    )
  );
};

export default RecomendationMovieContainer;


