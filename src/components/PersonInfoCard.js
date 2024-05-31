import React from "react";
import { IMG_CDN } from "../utils/constants";
import { Link } from "react-router-dom";
import Loader from "./Loader";


const PersonInfoCard = ({ personInfo }) => {
  return (
    <div className="h-auto bg-stone-900 -z-10">
      {personInfo ? (
        <div className=" mx-auto pt-32 md:pt-28 rounded-lg bg-stone-800 w-8/12 flex flex-wrap">
          <div className="w-full p-4 md:p-8 mx-auto md:w-1/2 ">
              <img
                className="rounded-lg w-full  md:w-3/4"
                src={IMG_CDN + personInfo.profile_path}
                alt="movie-poster"
              />
          </div>
          <div className="w-full p-4 md:mx-auto md:w-1/2 text-white">
              <p className="my-6">
                <span className="text-3xl my-3">{personInfo.name}</span>
              </p>
              <p className="my-4">
                <span className="text-gray-200 text-xl font-semibold my-3">
                  Biography
                </span>
                <p className="text-gray-300 break-words my-2">
                  {personInfo.biography?.split(" ", 50).join(" ")}...
                </p>
              </p>
              <p className="my-6 text-gray-300 ">
                Birthday :-{personInfo.birthday}
              </p>
              <p className="my-6 text-gray-300 ">
                Place of Birth :-{personInfo.place_of_birth}
              </p>
              <Link
                to={personInfo.homepage}
                target="_blank"
                className="bg-red-700 text-white rounded-lg p-3 hover:bg-red-800"
              >
                More Info
              </Link>
          </div>
        </div>
      ) : (
          <Loader/>
      )}
    </div>
  );
};

export default PersonInfoCard;