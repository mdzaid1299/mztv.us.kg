import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userReduxSlice";
import { Link, useNavigate } from "react-router-dom";
import { NAV_CROSS_IMG_URL, NAV_IMG_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
        if (window.location.pathname === "/") navigate("/browse");
      } else {
        dispatch(removeUser());
        if (window.location.pathname !== "/") navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => toast.success(`${user.displayName} logged out`))
      .catch(() => toast.error("Logout failed"));
  };

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md shadow-lg p-3 flex justify-between items-center z-50">
      {/* Logo */}
      <Link to="/browse" className="ml-4">
        <img
          src="https://i.postimg.cc/pXyVHyhh/image.jpg"
          alt="MZ Tv Logo"
          className="w-20 h-10 rounded-lg hover:scale-105 transition-transform"
        />
      </Link>

      {/* Desktop Navigation */}
      {user && (
        <nav className="hidden xl:flex space-x-6">
          {["browse", "movies", "tvShow", "search"].map((route) => (
            <Link
              key={route}
              to={`/${route}`}
              className="text-gray-300 hover:text-red-500 text-lg font-semibold transition-all duration-200"
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="text-gray-300 hover:text-red-500 text-lg font-semibold transition-all duration-200"
          >
            Logout
          </button>
        </nav>
      )}

      {/* Mobile Menu Toggle */}
      {user && (
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="xl:hidden text-white text-lg p-3 mr-3"
        >
          <img
            className="h-6"
            src={showMenu ? NAV_CROSS_IMG_URL : NAV_IMG_URL}
            alt="Menu Toggle"
          />
        </button>
      )}

      {/* Mobile Navigation Menu */}
      {showMenu && user && (
        <div className="absolute top-16 left-0 w-full bg-black/80 backdrop-blur-lg shadow-md flex flex-col items-center xl:hidden transition-all duration-300 animate-slide-in">
          {["browse", "movies", "tvShow", "search"].map((route) => (
            <Link
              key={route}
              to={`/${route}`}
              className="text-gray-300 hover:text-red-500 text-lg font-semibold p-4 w-full text-center transition-all duration-200"
              onClick={() => setShowMenu(false)}
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </Link>
          ))}
          <button
            onClick={() => {
              setShowMenu(false);
              handleSignOut();
            }}
            className="text-gray-300 hover:text-red-500 text-lg font-semibold p-4 w-full text-center transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
