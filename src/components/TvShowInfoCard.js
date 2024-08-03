import React, { useState, useEffect } from 'react';
import { IMG_CDN } from '../utils/constants';
import Loader from './Loader';

const TvShowInfoCard = ({ tvShowInfo }) => {
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    if (tvShowInfo && tvShowInfo.seasons.length > 0) {
      const filteredSeasons = tvShowInfo.seasons.filter(season => season.season_number !== 0);
      const defaultSeason = filteredSeasons.find(season => season.season_number === 1) || filteredSeasons[0];
      setSelectedSeason(defaultSeason);
    }
  }, [tvShowInfo]);

  const handleSeasonChange = (e) => {
    const seasonNumber = e.target.value;
    setSelectedSeason(tvShowInfo.seasons.find(season => season.season_number === parseInt(seasonNumber)));
  };

  const handleEpisodeClick = (season, episode) => {
    if (!tvShowInfo?.id) {
      console.error("TV Show ID is missing");
      return;
    }
    const apiUrl = `https://vidsrc.net/embed/tv/${tvShowInfo.id}/${season}/${episode}`;
    window.open(apiUrl, "_blank");
  };

  return (
    <div className="h-auto bg-stone-900 -z-10">
      {tvShowInfo ? (
        <>
          <div className="mx-auto pt-32 md:pt-28 rounded-lg bg-stone-800 w-8/12 flex flex-wrap">
            <div className="w-full p-4 md:p-8 mx-auto md:w-1/2">
              <img
                className="rounded-lg w-full md:w-3/4"
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
              <p className="my-6 text-gray-300">
                First air date: {tvShowInfo.first_air_date}
              </p>
              <p className="my-6 text-gray-300">
                Number of seasons: {tvShowInfo.number_of_seasons}
              </p>
              <p className="my-6 text-gray-300">
                Number of episodes: {tvShowInfo.number_of_episodes}
              </p>
              <div className="my-6">
                <label className="text-gray-300">Select Season: </label>
                <select
                  className="bg-stone-700 text-white p-2 rounded-lg ml-2"
                  onChange={handleSeasonChange}
                  value={selectedSeason ? selectedSeason.season_number : ""}
                >
                  {tvShowInfo.seasons
                    .filter(season => season.season_number !== 0)
                    .map((season) => (
                      <option key={season.id} value={season.season_number}>
                        Season {season.season_number}
                      </option>
                    ))}
                </select>
              </div>
              {selectedSeason && (
                <div className="my-6">
                  <p className="text-red-200 text-xl font-semibold my-3">
                    Episodes in Season {selectedSeason.season_number}
                  </p>
                  <div className="flex flex-wrap">
                    {Array.from({ length: selectedSeason.episode_count }, (_, i) => (
                      <button
                        key={i}
                        className="bg-red-700 text-white rounded-lg p-3 m-2 hover:bg-red-800"
                        onClick={() => handleEpisodeClick(selectedSeason.season_number, i + 1)}
                      >
                        Episode {i + 1}
                      </button>
                    ))}
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
