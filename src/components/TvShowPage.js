import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  Get_Trending_TV_Shows_URL,
  TMDB_API_OPTIONS,
} from "../utils/constants";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import Footer from "./Footer";

const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-700 w-[150px] h-[225px] rounded-md"></div>
);

const TvShowPage = () => {
  const [trendingShows, setTrendingShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skeletons] = useState(new Array(10).fill(0));

  const getTrendingShows = async () => {
    if (totalPages && page > totalPages) return;

    setLoading(true);

    try {
      const [data] = await Promise.all([
        fetch(`${Get_Trending_TV_Shows_URL}${page}`, TMDB_API_OPTIONS).then(
          (res) => res.json()
        ),
      ]);

      setTotalPages(data.total_pages);

      const filteredShows = data.results.filter(
        (show) => show.poster_path !== null
      );

      setTrendingShows((prevShows) => [...prevShows, ...filteredShows]);
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrendingShows();
  }, [page]);

  return (
    <div className="h-screen text-white bg-stone-900 font-serif">
      <Header />
      <div className="pt-5 bg-stone-900 font-serif">
        <div className="w-full mx-auto bg-stone-900 p-10 pt-20">
          <p className="text-3xl text-red-400 font-semibold text-center mb-3">
            Trending Shows
          </p>
          <div className="flex mx-auto mt-4 p-2 justify-between flex-wrap gap-4">
            {trendingShows.length > 0
              ? trendingShows.map((show) => (
                  <Link to={`/tvShow/${show.id}`} key={show.id}>
                    <ItemCard
                      title={show.original_name}
                      poster={show.poster_path}
                    />
                  </Link>
                ))
              : skeletons.map((_, index) => <SkeletonCard key={index} />)}
          </div>
          <div className="w-full flex justify-center">
            {loading ? (
              <button
                disabled
                className="bg-orange-500 text-gray-200 mt-10 rounded-lg text-sm p-2"
              >
                Loading...
              </button>
            ) : (
              <button
                onClick={() => setPage(page + 1)}
                className="bg-orange-700 hover:bg-orange-800 rounded-lg text-sm p-2 mt-10"
              >
                View More
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TvShowPage;
