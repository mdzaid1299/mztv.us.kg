import React from "react";
import {IMG_CDN_URL } from "../utils/constants";

const ItemCard = ({ title, poster }) => {
  return (
    <div className="mx-auto mt-2 md:m-2 hover:underline hover:cursor-pointer w-32 md:w-44">
      <img className="w-full rounded-md hover:border-2 hover:border-red-300" src={IMG_CDN_URL+poster}  alt=""/>
      <p className="text-center text-lg font-serif">{title}</p>
    </div>
  );
};

export default ItemCard;