import React, { useState, useEffect } from "react";
import {
  Search_Api_URL1,
  Search_Api_URL2,
  TMDB_API_OPTIONS,
  IMG_CDN,
} from "../utils/constants";
import { Link } from "react-router-dom";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const timer = setTimeout(() => {
        fetchSearchResults(searchTerm);
      }, 500); // Debounce API call
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const fetchSearchResults = async (query) => {
    try {
      const data = await fetch(
        `${Search_Api_URL1}${query}${Search_Api_URL2}`,
        TMDB_API_OPTIONS
      );
      const json = await data.json();
      const results = json.results || [];

      const movies = results.filter(
        (item) => item.media_type === "movie" && item.poster_path
      );
      const tvShows = results.filter(
        (item) => item.media_type === "tv" && item.poster_path
      );

      setSearchResults([...movies, ...tvShows]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 text-sm md:text-base bg-stone-800 border-b-0 rounded-md min-w-[300px] md:min-w-[500px]"
        placeholder="Search for movies or TV shows..."
      />
      {searchResults.length > 0 && (
        <div className="absolute bg-black w-full max-h-60 overflow-y-auto shadow-lg mt-1 z-10">
          {searchResults.map((item) => (
            <a
              href={
                item.media_type === "movie"
                  ? `/movieInfo/${item.id}`
                  : `/tvShow/${item.id}`
              }
              key={item.id}
            >
              <div className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                <img
                  src={IMG_CDN + item.poster_path}
                  alt={item.title || item.name}
                  className="w-12 h-12 object-cover rounded-md mr-3"
                />
                <p className="text-white">{item.title || item.name}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
