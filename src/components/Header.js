import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userReduxSlice";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { NAV_CROSS_IMG_URL, NAV_IMG_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast(user.displayName + " is logged out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        if (window.location.pathname === "/") {
          navigate("/browse");
        }
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        if (window.location.pathname !== "/") {
          navigate("/");
        }
      }
    });
  }, []);

  return (
    <>
      <div className="absolute z-20 bg-stone-800 p-2 py-2 opacity-95 shadow-md flex justify-between w-full">
        <div className="text-red-500 font-sans text-3xl p-2 ml-4 font-bold">
          <Link to={"/browse"}>CinemixMZ</Link>
        </div>
        {user && (
          <>
            <div className="hidden xl:flex xl:flex-row">
              <Link to={"/browse"}>
                <button className="text-white hover:text-red-500 text-base font-bold p-3 mr-3">
                  Home
                </button>
              </Link>
              <Link to={"/movies"}>
                <button className="text-white hover:text-red-400 text-base font-bold p-3 mr-3">
                  Movies
                </button>
              </Link>
              <Link to={"/tvShow"}>
                <button className="text-white hover:text-red-400 text-base font-bold p-3 mr-3">
                  TV Shows
                </button>
              </Link>
              <Link to={"/search"}>
                <button className="text-white hover:text-red-400 text-base font-bold p-3 mr-3">
                  Search 🔎
                </button>
              </Link>
              <button
                className="text-white hover:text-red-400 text-base font-bold p-3 mr-3"
                onClick={handleSignOut}
              >
                Log out
              </button>
            </div>
            <div
              onClick={() => setShowLinks(!showLinks)}
              className="text-white text-lg font-bold p-3 mr-3 flex xl:hidden"
            >
              {!showLinks ? (
                <img className="h-6" src={NAV_IMG_URL} alt="Nav-Bar" />
              ) : (
                <img className="h-6" src={NAV_CROSS_IMG_URL} alt="Nav-Bar-Cross" />
              )}
            </div>
          </>
        )}
      </div>
      {user && (
        <>
          {showLinks && (
            <div className="flex flex-col absolute w-screen z-10 bg-stone-800 pt-16 justify-center mx-auto xl:hidden">
              <Link to={"/browse"}>
                <button className="text-white hover:text-red-400 text-lg font-bold p-4 w-full mx-auto">
                  Home
                </button>
              </Link>
              <Link to={"/movies"}>
                <button className="text-white hover:text-red-400 text-lg font-bold p-4 w-full mx-auto">
                  Movies
                </button>
              </Link>
              <Link to={"/tvShow"}>
                <button className="text-white hover:text-red-400 text-lg font-bold p-4 w-full mx-auto">
                  TV Shows
                </button>
              </Link>
              <Link to={"/search"}>
                <button className="text-white hover:text-red-400 text-lg font-bold p-4 w-full mx-auto">
                  Search
                </button>
              </Link>
              <button
                className="text-white hover:text-red-400 text-lg font-bold p-4 w-full mx-auto"
                onClick={handleSignOut}
              >
                Log out
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Header;
