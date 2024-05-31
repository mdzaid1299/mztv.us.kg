import React, { useState } from "react";
import { Get_Youtube_Video_URL1, Get_Youtube_Video_URL2, IMG_CDN } from "../utils/constants";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import toast from "react-hot-toast";

const MovieInfoCard = ({ movieInfo, trailer }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  return (
    <div className="h-auto bg-stone-900 -z-10">
      {movieInfo ? (
        <>
          {showTrailer ? (
            <>
              <div className="absolute w-full z-30">
                <div className="w-full md:w-10/12 mx-auto pt-80 mt-80 sm:mt-48 md:mt-0 md:pt-10 xl:pt-0">
                  <div className="flex flex-row bg-stone-900 opacity-95 justify-end">
                    <button
                      className="text-white p-2"
                      onClick={() =>{
                        setShowTrailer(false)
                        toast("Movie trailer closed")
                      } }
                    >
                      Close
                    </button>
                  </div>
                  <iframe
                    src={
                      Get_Youtube_Video_URL1 +
                      trailer?.key +
                      Get_Youtube_Video_URL2
                    }
                    title="YouTube video player"
                    frameBorder="0"
                    className="w-full aspect-video"
                  ></iframe>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div className=" mx-auto pt-32 md:pt-28 rounded-lg bg-stone-800 w-8/12 flex flex-wrap">
            <div className="w-full p-4 md:p-8 mx-auto md:w-1/2 ">
                <img
                  className="rounded-lg w-full  md:w-3/4"
                  src={IMG_CDN + movieInfo.poster_path}
                  alt="movie-poster"
                />
            </div>
            <div className="w-full p-4 md:mx-auto md:w-1/2 text-white">
                <p className="my-6">
                  <span className="text-3xl my-3">
                    {movieInfo.original_title}
                  </span>
                  <p className="my-2 text-gray-300">
                    {movieInfo.genres.map((genre) => genre.name).join(",")}
                  </p>
                </p>
                <p className="my-4">
                  <span className="text-gray-200 text-xl font-semibold my-3">
                    Overview
                  </span>
                  <p className="text-gray-300 break-words my-2">
                    {movieInfo.overview.split(" ", 60).join(" ")}...
                  </p>
                </p>
                <p className="my-6 text-gray-300 ">
                  Released date :-{movieInfo.release_date}
                </p>
                <div className="flex flex-start">

                  {trailer ?( <Link to=''>
                  <button
                    onClick={() => {
                      setShowTrailer(true)
                      toast("Movie Trailer Played");
                    }}
                    className="bg-red-700 mx-2 text-white rounded-lg p-3 hover:bg-red-800"
                  >
                    Watch Trailer
                  </button>
                  </Link>):""}
                  <Link
                    to={movieInfo.homepage}
                    target="_blank"
                    className="bg-red-700 text-white rounded-lg p-3 hover:bg-red-800"
                  >
                    Watch Now
                  </Link>
                </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MovieInfoCard;