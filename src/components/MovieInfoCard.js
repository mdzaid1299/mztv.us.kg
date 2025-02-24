import {X} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Get_Youtube_Video_URL1,
  Get_Youtube_Video_URL2,
  IMG_CDN,
} from "../utils/constants";
import Loader from "./Loader";
import toast from "react-hot-toast";

const VideoPlayer = ({ movieId, onClose }) => {
  const [source, setSource] = useState("vidsrcICU");
  const [loading, setLoading] = useState(true);

  const sources = [
    { id: "vidsrcICU", name: "VidSrc ICU" },
    { id: "autoembed", name: "Autoembed" },
    { id: "vidsrc", name: "VidSrc" },
    { id: "videasy", name: "Videasy" },
    { id: "vidsrcRip", name: "VidSrc Rip" },
    { id: "embedSu", name: "Embed Su" },
    { id: "vidsrcCc", name: "VidSrc CC" },
    { id: "warezcdn", name: "WarezCDN" },
    { id: "primewireTMDB", name: "PrimeWire TMDB" },
    { id: "vidsrcXYZTMDB", name: "VidSrc XYZ TMDB" },
    { id: "2embedTMDB", name: "2Embed TMDB" },
  ];

  const getEmbedUrl = () => {
    switch (source) {
      case "autoembed":
        return `https://player.autoembed.cc/embed/movie/${movieId}`;
      case "vidsrc":
        return `https://vidsrc.net/embed/movie/${movieId}`;
      case "videasy":
        return `https://player.videasy.net/movie/${movieId}`;
      case "vidsrcRip":
        return `https://vidsrc.rip/embed/movie/${movieId}`;
      case "embedSu":
        return `https://embed.su/embed/movie/${movieId}`;
      case "vidsrcCc":
        return `https://vidsrc.cc/v2/embed/movie/${movieId}`;
      case "vidsrcICU":
        return `https://vidsrc.icu/embed/movie/${movieId}`;
      case "warezcdn":
        return `https://embed.warezcdn.link/filme/${movieId}`;
      case "primewireTMDB":
        return `https://www.primewire.tf/embed/movie?tmdb=${movieId}`;
      case "vidsrcXYZTMDB":
        return `https://vidsrc.xyz/embed/movie?tmdb=${movieId}`;
      case "2embedTMDB":
        return `https://www.2embed.cc/embed/${movieId}`;
      default:
        return "";
    }
  };

  useEffect(() => {
    setLoading(true);
  }, [source]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden relative">
        {/* Controls at the top, outside the player */}
        <div className="p-3 flex justify-between items-center bg-gray-800">
          <div className="relative inline-block text-left w-48">
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="block w-full bg-gray-700 text-white border-0 rounded-md py-2 pl-3 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundPosition: "right 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
              }}
            >
              {sources.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onClose}
            className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-md transition-all"
            aria-label="Close player"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative w-full">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            src={getEmbedUrl()}
            className="w-full aspect-video"
            allowFullScreen
            onLoad={() => setLoading(false)}
          ></iframe>
        </div>
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
          <div className="flex flex-col items-center">
            <img
              className="rounded-lg w-full md:w-48 mb-4"
              src={IMG_CDN + movieInfo.poster_path}
              alt="movie-poster"
            />
            <div className="text-center">
              <h2 className="text-2xl font-semibold">
                {movieInfo.original_title}
              </h2>
              <p className="text-gray-400 mb-2">
                {movieInfo.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-gray-300 mb-4">
                {movieInfo.overview.split(" ", 25).join(" ")}...
              </p>
              <p className="text-gray-400 mb-4">
                Released date: {movieInfo.release_date}
              </p>
              <div className="flex justify-center space-x-2">
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
