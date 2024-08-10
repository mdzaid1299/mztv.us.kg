import React, { useState, useEffect } from "react";
import { IMG_CDN } from "../utils/constants";
import Loader from "./Loader";
import toast from "react-hot-toast";

const VideoPlayer = ({ tvShowId, season, episode, onClose }) => {
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
          src={`https://vidsrc.net/embed/tv/${tvShowId}/${season}/${episode}`}
          className="w-full aspect-video"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const TvShowInfoCard = ({ tvShowInfo }) => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    if (tvShowInfo && tvShowInfo.seasons.length > 0) {
      const filteredSeasons = tvShowInfo.seasons.filter(
        (season) => season.season_number !== 0
      );
      const defaultSeason =
        filteredSeasons.find((season) => season.season_number === 1) ||
        filteredSeasons[0];
      setSelectedSeason(defaultSeason);
    }
  }, [tvShowInfo]);

  const handleSeasonChange = (e) => {
    const seasonNumber = e.target.value;
    setSelectedSeason(
      tvShowInfo.seasons.find(
        (season) => season.season_number === parseInt(seasonNumber)
      )
    );
  };

  const handleEpisodeClick = (season, episode) => {
    if (!tvShowInfo?.id) {
      toast.error("TV Show ID is missing");
      return;
    }
    setCurrentEpisode({ season, episode });
    setShowVideo(true);
  };

  return (
    <div className="p-4 bg-stone-900 text-white rounded-lg shadow-md pt-20"> 
      {tvShowInfo ? (
        <>
          {showVideo && (
            <VideoPlayer
              tvShowId={tvShowInfo.id}
              season={currentEpisode.season}
              episode={currentEpisode.episode}
              onClose={() => {
                setShowVideo(false);
                toast("TV Show player closed");
              }}
            />
          )}
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="rounded-lg w-full md:w-48 mb-4 md:mb-0 md:mr-4"
              src={IMG_CDN + tvShowInfo.poster_path}
              alt="tv-show-poster"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{tvShowInfo.original_name}</h2>
              <p className="text-gray-400 mb-2">
                {tvShowInfo.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-gray-300 mb-4">
                {tvShowInfo.overview.split(" ", 25).join(" ")}...
              </p>
              <p className="text-gray-400 mb-4">
                First air date: {tvShowInfo.first_air_date}
              </p>
              <div className="flex flex-wrap mb-4">
                <label className="text-gray-300 mr-2">Select Season:</label>
                <select
                  className="bg-stone-700 text-white p-2 rounded-lg"
                  onChange={handleSeasonChange}
                  value={selectedSeason ? selectedSeason.season_number : ""}
                >
                  {tvShowInfo.seasons
                    .filter((season) => season.season_number !== 0)
                    .map((season) => (
                      <option key={season.id} value={season.season_number}>
                        Season {season.season_number}
                      </option>
                    ))}
                </select>
              </div>
              {selectedSeason && (
                <div className="mb-4">
                  <p className="text-red-200 text-lg font-semibold mb-2">
                    Episodes in Season {selectedSeason.season_number}
                  </p>
                  <div className="flex flex-wrap">
                    {Array.from(
                      { length: selectedSeason.episode_count },
                      (_, i) => (
                        <button
                          key={i}
                          className="bg-red-700 text-white rounded-lg px-4 py-2 m-2 hover:bg-red-800"
                          onClick={() =>
                            handleEpisodeClick(
                              selectedSeason.season_number,
                              i + 1
                            )
                          }
                        >
                          Episode {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TvShowInfoCard;
