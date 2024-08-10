import React from "react";
import Header from "./Header";
import MovieInfoCard from "./MovieInfoCard";
import { useParams } from "react-router-dom";
import useMovieInfo from "../customHooks/useMovieInfo";
import CastList from "./CastList";
import Footer from "./Footer";
import MoviesList from "./MoviesList";


const MovieInfo = () => {
  const { movieId } = useParams();
  // console.log(movieId);

  const { movieInfo, recommendations,casts,trailer } = useMovieInfo(movieId);


  return (
    <div className="bg-stone-900">
      <Header />
      <MovieInfoCard movieInfo={movieInfo} trailer={trailer}/>
      <MoviesList title="Recommendataions" movies={recommendations} />
      <Footer/>
    </div>
  );
};

export default MovieInfo;