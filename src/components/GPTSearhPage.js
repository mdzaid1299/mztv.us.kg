import React from "react";
import GPTSearchBar from "./GPTSearchBar";

import { LOGIN_BACKGROUND } from "../utils/constants";


const GPTSearhPage = () => {
  return (
    <>

      <div className="absoulte -z-10">
        <img
          className="fixed object-cover h-screen w-full  -z-10 opacity-85"
          src={LOGIN_BACKGROUND}
          alt="Login-Background Img"
        />
      </div>

      <div className=" md:py-5">
      <GPTSearchBar />
      </div>

    </>
  );
};

export default GPTSearhPage;
