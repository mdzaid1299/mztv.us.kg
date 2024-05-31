import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { IMG_CDN_URL } from "../utils/constants";
import MovieCards from "./MovieCards";

const GPTSuggestion = () => {
  const { searchData, searchResults } = useSelector((store) => store.gpt);
  if (!searchData) return null;

  return (
    <div className="mx-auto w-10/12 bg-stone-900 bg-opacity-90">
      <p className="text-lg text-white font-semibold md:text-3xl m-2 pt-10 mx-10">
        {searchResults.length !== 0 ? "Movies/Series" : ""}
      </p>
      <div className="flex flex-wrap justify-center md:justify-start">
        {searchResults?.map((movie) => {
          return (
            // <Link to={"/movieInfo/" + movie.id} key={movie.id}>
              <div className="p-2 w-40">


                <MovieCards posterPath={movie.poster_path} />
              </div>
          );
        })}
      </div>
    </div>
  );
};

export default GPTSuggestion;
