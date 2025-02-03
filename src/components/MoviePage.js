import React, { useEffect, useState } from "react";
import Header from "./Header";
import { TMDB_API_OPTIONS } from "../utils/constants";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import Footer from "./Footer";
import { Trending_Movies_URL } from "../utils/constants";

const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-700 w-[150px] h-[225px] rounded-md"></div>
);

const MoviePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skeletons, setSkeletons] = useState(new Array(10).fill(0));

  const getTrendingMovies = async () => {
    if (totalPages && page > totalPages) return;

    setLoading(true);

    try {
      const [data] = await Promise.all([
        fetch(`${Trending_Movies_URL}${page}`, TMDB_API_OPTIONS).then((res) =>
          res.json()
        ),
      ]);

      setTotalPages(data.total_pages);

      const filteredMovies = data.results.filter(
        (movie) => movie.poster_path !== null
      );

      setTrendingMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, [page]);

  return (
    <div className="h-screen text-white bg-stone-900 font-serif">
      <Header />
      <div className="pt-3 bg-stone-900">
        <div className="w-full mx-auto bg-stone-900 p-10 pt-20">
          <p className="text-3xl font-semibold text-red-300 mb-4 text-center">
            Movies Trending
          </p>
          <div className="flex mx-auto mt-4 p-2 justify-between flex-wrap gap-4">
            {trendingMovies.length > 0
              ? trendingMovies.map((movie) => (
                  <Link to={`/movieInfo/${movie.id}`} key={movie.id}>
                    <ItemCard
                      title={movie.original_title}
                      poster={movie.poster_path}
                    />
                  </Link>
                ))
              : skeletons.map((_, index) => <SkeletonCard key={index} />)}
          </div>
          <div className="w-full flex justify-center font-serif">
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
                className="bg-orange-700 hover:bg-orange-800 mt-10 rounded-lg text-sm p-2"
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

export default MoviePage;
