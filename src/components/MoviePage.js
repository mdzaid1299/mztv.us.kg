import React, { useEffect, useState } from "react";
import Header from "./Header";
import { TMDB_API_OPTIONS} from "../utils/constants";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import Footer from "./Footer";
import { Trending_Movies_URL } from "../utils/constants";


const MoviePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const getTrendingMovies = async () => {
    if (totalPages && totalPages === page) return;
    const data = await fetch(
      Trending_Movies_URL +
        page,
      TMDB_API_OPTIONS
    );
    const json = await data.json();
    setTotalPages(json.total_pages);
    const filter = await json?.results.filter((data) => {
      return data.poster_path !== null;
    });
    const list = trendingMovies;
    const newList = await list.concat(filter);
    setTrendingMovies(newList);
  };

  useEffect(() => {
    getTrendingMovies();
  }, [page]);
  return (
    <div className="h-screen text-white bg-stone-900 font-serif">
      <Header />
      <div className="pt-24 bg-stone-900">
        {trendingMovies?.length > 0 ? (
          <div className="w-full mx-auto bg-stone-900 p-10 pt-20">
            <p className=" text-3xl font-semibold text-red-300 mb-10 text-center"> Movies Trending </p>
            <div className="flex mx-auto mt-4 p-2 justify-between flex-wrap">
              {trendingMovies?.map((movie) => {
                return (
                  <Link to={"/movieInfo/" + movie.id} key={movie.id}>
                    <ItemCard
                      title={movie.original_title}
                      poster={movie.poster_path}
                    />
                  </Link>
                );
              })}
            </div>
            <div className="w-full flex justify-center font-serif">
              <button
                onClick={() =>{
                  setPage(page + 1)
                } }
                className="bg-orange-700 hover:bg-orange-800 mt-10 rounded-lg text-sm p-2"
              >
                View More
              </button>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default MoviePage;