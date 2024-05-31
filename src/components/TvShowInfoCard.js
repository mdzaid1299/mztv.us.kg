import React from 'react'
import { IMG_CDN } from '../utils/constants';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const TvShowInfoCard = ({tvShowInfo}) => {
  return (
    <div className="h-auto bg-stone-900 -z-10 ">
      {tvShowInfo ? (
        <>
          <div className=" mx-auto pt-32 md:pt-28  rounded-lg bg-stone-800 w-8/12 flex flex-wrap">
            <div className="w-full p-4  md:p-8 mx-auto md:w-1/2 ">
                <img
                  className="rounded-lg w-full  md:w-3/4"
                  src={IMG_CDN + tvShowInfo.poster_path}
                  alt="movie-poster"
                />
            </div>
            <div className="w-full p-4 font-serif md:mx-auto md:w-1/2 text-white">
                <p className="my-6">
                  <span className="text-3xl my-3 text-red-400">
                    {tvShowInfo.original_name}
                  </span>
                  <p className="my-2 text-gray-300">
                    {tvShowInfo.genres.map((genre) => genre.name).join(",")}
                  </p>
                </p>
                <p className="my-4">
                  <span className="text-red-200 text-xl font-semibold my-3">
                    Overview
                  </span>
                  <p className="text-gray-300 break-words my-2">
                    {tvShowInfo.overview.split(" ", 60).join(" ")}...
                  </p>
                </p>
                <p className="my-6 text-gray-300 ">
                  First air date :  {tvShowInfo.first_air_date}
                </p>
                <p className="my-6 text-gray-300 ">
                  Number of seasons :  {tvShowInfo.number_of_seasons}
                </p>
                <p className="my-6 text-gray-300 ">
                  Number of episodes : {tvShowInfo.number_of_episodes}
                </p>
                <div className="flex flex-start">
                  <Link
                    to={tvShowInfo.homepage}
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
    </div>  )
}

export default TvShowInfoCard