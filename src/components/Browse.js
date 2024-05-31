import React from "react";
import Header from "./Header";
import VideoContainer from "./VideoContainer";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import MovieContainer from "./MovieContainer";
import usePopular from "../customHooks/usePopular";
import useTopRated from "../customHooks/useTopRated";
import useUpComing from "../customHooks/useUpcoming";
import Footer from "./Footer";

const Browse = () => {
  useNowPlayingMovies();
  usePopular();
  useTopRated();
  useUpComing();
  return (
    <div className="bg-black">
      <Header />
      <VideoContainer />
      <MovieContainer/>
      <Footer/>
    </div>
  );
};

export default Browse;