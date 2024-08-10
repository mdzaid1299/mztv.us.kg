import React, { useState } from "react";
import {
  Get_Youtube_Video_URL1,
  Get_Youtube_Video_URL2,
  IMG_CDN,
} from "../utils/constants";
import Loader from "./Loader";
import toast from "react-hot-toast";

const VideoPlayer = ({ movieId, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-4">
        <div className="flex justify-end mb-2">
          <button
            className="text-white p-2 hover:bg-red-700 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <iframe
          src={`https://vidsrc.net/embed/movie/${movieId}`}
          className="w-full aspect-video"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const MovieInfoCard = ({ movieInfo, trailer }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleWatchNowClick = () => {
    if (!movieInfo?.id) {
      toast.error("Movie ID is missing");
      return;
    }
    setShowVideo(true);
  };

  return (
    <div className="p-4 bg-stone-900 text-white rounded-lg shadow-md pt-20"> 
      {movieInfo ? (
        <>
          {showTrailer && (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
              <div className="w-full max-w-2xl mx-4">
                <div className="flex justify-end mb-2">
                  <button
                    className="text-white p-2 hover:bg-red-700 rounded"
                    onClick={() => {
                      setShowTrailer(false);
                      toast("Movie trailer closed");
                    }}
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
          )}
          {showVideo && (
            <VideoPlayer
              movieId={movieInfo.id}
              onClose={() => {
                setShowVideo(false);
                toast("Movie player closed");
              }}
            />
          )}
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="rounded-lg w-full md:w-48 mb-4 md:mb-0 md:mr-4"
              src={IMG_CDN + movieInfo.poster_path}
              alt="movie-poster"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{movieInfo.original_title}</h2>
              <p className="text-gray-400 mb-2">
                {movieInfo.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-gray-300 mb-4">
                {movieInfo.overview.split(" ", 25).join(" ")}...
              </p>
              <p className="text-gray-400 mb-4">
                Released date: {movieInfo.release_date}
              </p>
              <div className="flex space-x-2">
                {trailer && (
                  <button
                    onClick={() => {
                      setShowTrailer(true);
                      toast("Movie Trailer Played");
                    }}
                    className="bg-red-700 text-white rounded-lg px-4 py-2 hover:bg-red-800"
                  >
                    Watch Trailer
                  </button>
                )}
                <button
                  onClick={handleWatchNowClick}
                  className="bg-red-700 text-white rounded-lg px-4 py-2 hover:bg-red-800"
                >
                  Watch Now
                </button>
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
