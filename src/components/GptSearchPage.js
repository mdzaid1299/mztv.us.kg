import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../utils/configReduxSlice";
import lang from "../utils/LanguageConstant";
import Header from "./Header";
import {
  IMG_CDN,
  LOGIN_BACKGROUND,
  Search_Api_URL1,
  Search_Api_URL2,
  TMDB_API_OPTIONS,
} from "../utils/constants";

const GptSearchPage = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [person, setPerson] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const savedSearch = localStorage.getItem("searchQuery");
    const savedResults = localStorage.getItem("searchResults");
    if (savedSearch && savedResults) {
      setSearchQuery(savedSearch);
      const parsedResults = JSON.parse(savedResults);
      setMovies(parsedResults.movies);
      setPerson(parsedResults.person);
      setTvShows(parsedResults.tvShows);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      getSearchItems(searchQuery);
    }
  }, [searchQuery]);

  const getSearchItems = async (searchData) => {
    // Encode spaces properly for API call
    const encodedSearchData = encodeURIComponent(searchData);
    const data = await fetch(
      Search_Api_URL1 + encodedSearchData + Search_Api_URL2,
      TMDB_API_OPTIONS
    );
    const json = await data.json();
    const movieData = json.results.filter(
      (movie) => movie.media_type === "movie" && movie.poster_path
    );
    const personData = json.results.filter(
      (p) => p.media_type === "person" && p.profile_path
    );
    const tvData = json.results.filter(
      (tv) => tv.media_type === "tv" && tv.poster_path
    );

    setMovies(movieData);
    setPerson(personData);
    setTvShows(tvData);

    localStorage.setItem("searchQuery", searchData);
    localStorage.setItem(
      "searchResults",
      JSON.stringify({ movies: movieData, person: personData, tvShows: tvData })
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <img
        className="fixed object-cover h-screen w-full -z-10 opacity-50"
        src={LOGIN_BACKGROUND}
        alt="Background"
      />
      <Header />

      <div className="w-full pt-40">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            ref={searchText}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-10/12 md:w-8/12 p-3 text-lg bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-red-600"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {movies.length > 0 && (
          <CategorySection
            title="Movies"
            data={movies}
            linkPath="/movieInfo/"
          />
        )}
        {tvShows.length > 0 && (
          <CategorySection
            title="TV Shows"
            data={tvShows}
            linkPath="/tvShow/"
          />
        )}
        {person.length > 0 && (
          <CategorySection title="People" data={person} linkPath="/person/" />
        )}

        {movies.length === 0 &&
          tvShows.length === 0 &&
          person.length === 0 &&
          searchQuery && (
            <p className="text-center text-2xl text-gray-300 mt-10">
              No results found
            </p>
          )}
      </div>
    </div>
  );
};

const CategorySection = ({ title, data, linkPath }) => (
  <div className="mt-10">
    <h2 className="text-center text-3xl font-semibold text-red-500">{title}</h2>
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {data.map((item) => (
        <Link to={`${linkPath}${item.id}`} key={item.id}>
          <div className="w-40 p-2 hover:scale-105 transition transform duration-200">
            <img
              className="w-full rounded-lg shadow-lg"
              alt="poster"
              src={IMG_CDN + (item.poster_path || item.profile_path)}
            />
            <p className="text-center text-sm mt-2">
              {item.title || item.original_name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default GptSearchPage;
