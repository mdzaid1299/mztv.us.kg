import React, { useEffect, useState } from "react";
import Header from "./Header";
import {Get_Trending_TV_Shows_URL, TMDB_API_OPTIONS} from "../utils/constants";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import Footer from "./Footer";

const TvShowPage = () => {
  const [trendingShows, setTrendingShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const getTrendingShows = async () => {
    if (totalPages && totalPages === page) return;
    const data = await fetch(
      Get_Trending_TV_Shows_URL +
        page,
      TMDB_API_OPTIONS
    );
    const json = await data.json();
    setTotalPages(json.total_pages);
    const filter = await json?.results.filter((data) => {
      return data.poster_path !== null;
    });
    const list = trendingShows;
    const newList = await list.concat(filter);
    setTrendingShows(newList);
  };

  useEffect(() => {
    getTrendingShows();
  }, []);
  return (
    <div className="h-screen text-white bg-stone-900 font-serif">
      <Header />
      <div className="pt-5 bg-stone-900 font-serif">
        {trendingShows?.length > 0 ? (
          <div className="w-full mx-auto bg-stone-900 p-10 pt-20">
            <p className=" text-3xl text-red-400 font-semibold text-center mb-3">Trending Shows</p>
            <div className="flex mx-auto mt-4 p-2 justify-between flex-wrap">
              {trendingShows?.map((show) => {
                return (
                  <Link to={"/tvShow/" + show.id} key={show.id}>
                    <ItemCard
                      title={show.original_name}
                      poster={show.poster_path}
                    />
                  </Link>
                );
              })}
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={() => setPage(page + 1)}
                className="bg-orange-700 hover:bg-orange-800 rounded-lg text-sm p-2"
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

export default TvShowPage;