import React from "react";
import { IMG_CDN } from "../utils/constants";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay,Pagination} from 'swiper/modules';


const MoviesList = ({ title, movies }) => {
  return (
    <div className="w-10/12 mx-auto text-white">
      {movies && (
        <>
        <p className="p-2 m-2 text-2xl font-bold">{movies.length? title: ""}</p>
        <div className="">
          <Swiper
          className="ml-2"
        spaceBetween={30}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay,Pagination ]}
      >
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
              <Link to={"/movieInfo/" + movie.id} >
                <div className="w-36 p-1 m-2 hover:underline  ">
                  {/* <ItemCard title={movie.original_title} poster={movie.poster_path} /> */}
                  <img
                    className="rounded-lg hover:border-2 hover:border-red-300"
                    src={IMG_CDN + movie.poster_path}
                    alt="movie"
                  />
                  <p className="text-center">{movie.original_title}</p>
                </div>
              </Link>
              </SwiperSlide>
            );
          }
          )}
          </Swiper>
        </div>
        </>
      )}
    </div>
  );
};

export default MoviesList;