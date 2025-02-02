import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { IMG_CDN } from "../utils/constants";
import SearchBox from "./SearchBox";

const gradients = [
  "from-blue-900 to-black",
  "from-green-900 to-gray-900",
  "from-purple-900 to-pink-900",
  "from-red-900 to-yellow-900",
  "from-indigo-900 to-blue-500",
];

const Welcome = () => {
  const [gradient, setGradient] = useState(gradients[0]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState({
    popular: [],
    topRated: [],
    upComing: [],
  });

  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    setGradient(gradients[Math.floor(Math.random() * gradients.length)]);
  }, []);

  // ✅ Fetch movies in parallel for better performance
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        if (movies) {
          const [popular, topRated, upComing] = await Promise.all([
            movies.popular || [],
            movies.topRated || [],
            movies.upComing || [],
          ]);
          setMovieData({ popular, topRated, upComing });
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movies]);

  const filteredMovies = (list) =>
    list?.filter((movie) =>
      movie.original_title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div
      className={`w-full min-h-screen bg-gradient-to-r ${gradient} text-white flex flex-col items-center py-20`}
    >
      <p className="text-lg text-gray-300 mb-2 max-w-2xl text-center">
      Unlock the Ultimate Movie Experience — From Fresh Releases to Must-See Classics, All in One Place
      </p>
      <div className="p-4 md:p-3">
        <SearchBox />
      </div>

      {loading ? (
        // ✅ Show skeleton loader while fetching data
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-40 h-64 bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        [
          { title: "Popular Movies", data: filteredMovies(movieData.popular) },
          { title: "Top-Rated Movies", data: filteredMovies(movieData.topRated) },
          { title: "Upcoming Movies", data: filteredMovies(movieData.upComing) },
        ].map(
          ({ title, data }) =>
            data &&
            data.length > 0 && (
              <div key={title} className="w-11/12 sm:w-10/12 mb-8">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <Swiper
                  spaceBetween={15}
                  breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 3, spaceBetween: 15 },
                    768: { slidesPerView: 5, spaceBetween: 20 },
                    1024: { slidesPerView: 6, spaceBetween: 25 },
                  }}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  modules={[Autoplay]}
                  className="px-2"
                >
                  {data.map((movie) => (
                    <SwiperSlide
                      key={movie.id}
                      className="flex flex-col items-center"
                    >
                      <Link to={`/movieInfo/${movie.id}`} className="group">
                        <img
                          className="rounded-lg w-40 sm:w-48 hover:scale-105 transition-transform duration-200"
                          src={IMG_CDN + movie.poster_path}
                          alt={movie.original_title}
                        />
                        <p className="mt-2 text-center text-sm font-medium group-hover:text-red-400">
                          {movie.original_title}
                        </p>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )
        )
      )}
    </div>
  );
};

export default Welcome;
