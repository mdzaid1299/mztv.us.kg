import React, { useState, useRef } from "react";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LOGIN_BACKGROUND, USER_PROFILE } from "../utils/constants";

const Login = () => {
  const [errormsg, setErrormsg] = useState(null);
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    // Sign Up Logic
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: fullName.current.value,
          photoURL: USER_PROFILE,
        })
        .then(() => {
          // Profile updated!
          navigate("/movies");
        }).catch((error) => {
          // An error occurred
          setErrormsg(error.message);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrormsg(errorMessage);
      });
  };

  return (
    <div className="w-full">
      <Header />
      <div>
        <img
          className="fixed object-cover h-screen w-full -z-10"
          src={LOGIN_BACKGROUND}
          alt="Login-Background Img"
        />
      </div>

      {/* Sign-Up Form */}
      <form
        className="w-8/12 md:w-5/12 xl:w-3/12 absolute mx-auto right-0 left-0 my-[20%] md:my-[13%] bg-black p-8 opacity-95 rounded-md text-white"
        onSubmit={handleButtonClick}
      >
        <h1 className="text-3xl py-4 mb-4 font-bold">Login Formality</h1>
        <input
          ref={fullName}
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-700 hover:bg-gray-700"
        />
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 hover:bg-gray-770"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 hover:bg-gray-770"
        />
        <p className="text-red-500 font-semibold text-lg py-2">{errormsg}</p>
        <button
          className="p-4 my-4 cursor-pointer bg-red-600 w-full hover:opacity-95"
          type="submit"
        >
          Sign Up
        </button>
        
      </form>
    </div>
  );
};

export default Login;
