import React, { useRef, useState } from "react";
import lang from "../utils/LanguageConstant";
import Header from "./Header";
import {
  IMG_CDN,
  LOGIN_BACKGROUND,
  Search_Api_URL1,
  Search_Api_URL2,
  Supported_Languages,
  TMDB_API_OPTIONS,
} from "../utils/constants";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../utils/configReduxSlice";

const GptSearhPage = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState(null);
  const [tvShows, setTvShows] = useState(null);

  const getSearchItems = async (searchData) => {
    const data = await fetch(
      Search_Api_URL1 + searchData + Search_Api_URL2,
      TMDB_API_OPTIONS
    );
    const json = await data.json();
    const movies = await json.results.filter((movie) => {
      return movie.media_type === "movie";
    });
    const movieData = await movies?.filter((movie) => {
      return movie.poster_path !== null;
    });
    const person = await json.results.filter((person) => {
      return person.media_type === "person";
    });
    const personData = await person?.filter((person) => {
      return person.profile_path !== null;
    });
    const tv = await json.results.filter((tv) => {
      return tv.media_type === "tv";
    });
    const tvData = await tv?.filter((tv) => {
      return tv.poster_path !== null;
    });
    setMovies(movieData);
    setPerson(personData);
    setTvShows(tvData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchData = searchText.current.value.split(" ").join("%20");
    getSearchItems(searchData);
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div>
      <img
        className="fixed object-cover h-screen w-full  -z-10 opacity-75"
        src={LOGIN_BACKGROUND}
        alt="Login-Background Img"
      />
      <Header />

 
      <div className=" w-full pt-40 text-white">
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl font-bold m-2 opacity-95">Choose your Language : </h1>
        <select
          className="p-2 bg-black text-white m-2 rounded-3xl"
          onChange={handleLanguageChange}
        >
          {Supported_Languages.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

        <form
          className="bg-black w-11/12 md:w-8/12 mx-auto border rounded-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            ref={searchText}
            className="w-10/12 md:w-9/12 p-3 text-sm md:text-base bg-stone-800  border-b-0"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 w-2/12 md:w-3/12 p-3 border text-sm md:text-base font-semibold rounded"
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
      <div>
        {movies && (
          <div className="mx-auto w-10/12">
            <p className="text-white text-center mt-10 font-semibold text-4xl m-2">
              {movies.length !== 0 ? "Movies" : ""}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start">
              {movies?.map((movie) => {
                return (
                  <Link to={"/movieInfo/" + movie.id} key={movie.id}>
                    <div className="p-2 w-40">
                      <img
                        className="w-full rounded-lg"
                        alt="movie-img"
                        src={IMG_CDN + movie.poster_path}
                      />
                      <p className="text-center text-white break-words">
                        {movie.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        {tvShows && (
          <div className="mx-auto w-10/12">
            <p className="text-white text-center mt-10 font-semibold text-4xl m-2">
              {tvShows.length !== 0 ? "TV Shows" : ""}
            </p>
            <div className="flex flex-wrap justify-start">
              {tvShows?.map((tvShow) => {
                return (
                  <Link to={"/tvShow/" + tvShow.id} key={tvShow.id}>
                    <div className="p-2 w-40">
                      <img
                        className="w-full rounded-lg"
                        alt="movie-img"
                        src={IMG_CDN + tvShow.poster_path}
                      />
                      <p className="text-center text-white break-words">
                        {tvShow.original_name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        {person && (
          <div className="mx-auto w-10/12">
            <p className="text-red-200 text-center mt-10 font-semibold text-4xl m-2">
              {person.length !== 0 ? "People" : ""}
            </p>
            <div className="flex flex-wrap justify-start">
              {person?.map((p) => {
                return (
                  <Link to={"/person/" + p.id} key={p.id}>
                    <div className="p-2 w-40">
                      <img
                        className="w-full rounded-lg"
                        alt="movie-img"
                        src={IMG_CDN + p.profile_path}
                      />
                      <p className="text-center text-white break-words">
                        {p.original_name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        {movies?.length === 0 &&
          tvShows?.length === 0 &&
          person?.length === 0 && (
            <div className="text-center text-4xl text-white">
              No result found
            </div>
          )}
      </div>
    </div>
  );
};

export default GptSearhPage;
