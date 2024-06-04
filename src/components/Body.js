import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import {
  createBrowserRouter,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Error from "./Error";
import MovieInfo from "./MovieInfo";
import TvPage from "./TvPage";
import TvShowPage from "./TvShowPage";
import GptSearhPage from "./GptSearchPage";
import Developer from "./Developer";
import MoviePage from "./MoviePage";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Browse />,
      errorElement:<Error/>
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path:"/movieInfo/:movieId",
      element:<MovieInfo/>
    },
    {
      path:"/search",
      element:<GptSearhPage/>
    },
    {
      path:"/tvShow/:showId",
      element:<TvPage/>
    },
    {
      path:"/movies",
      element:<MoviePage/>
    },{
      path:"/tvShow",
      element:<TvShowPage/>
    },

    {
      path:"/developerPage",
      element:<Developer/>
    }
  ]);
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default Body;