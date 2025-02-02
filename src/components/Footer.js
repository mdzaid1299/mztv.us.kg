import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="relative bg-black/80 text-gray-300 py-8 px-6 text-center flex flex-col items-center backdrop-blur-md shadow-xl">
      {/* Logo & Branding */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl">
        <div className="flex items-center space-x-3">
          <img
            src="https://i.postimg.cc/pXyVHyhh/image.jpg"
            alt="MZ Tv Logo"
            className="w-18 h-14 rounded-xl shadow-md"
          />
        
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 max-w-lg text-sm text-gray-400">
        Enjoy a vast collection of **free movies** online. No subscriptions, just pure entertainment! 🍿  
      </p>

      {/* Other Apps */}
      <div className="mt-6 bg-gray-900/70 p-4 rounded-lg shadow-md backdrop-blur-md">
        <h2 className="text-lg font-semibold text-white mb-2">🚀 Other Apps by Developer</h2>
        <div className="flex items-center space-x-3">
          <img
            src="https://i.postimg.cc/cLrmLh4y/mztools-logo.png"
            alt="MZ Tools Logo"
            className="w-12 h-12 rounded-lg"
          />
          <div className="text-left">
            <h3 className="text-white text-base font-bold">MZ Tools</h3>
            <p className="text-xs text-gray-400">Simple tools for everyday tasks.</p>
          </div>
          <Link
            to="https://mztools.us.kg"
            target="_blank"
            className="ml-auto bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Explore 🚀
          </Link>
        </div>
      </div>

      {/* Contact */}
      <p className="mt-4 text-gray-400 text-xs">📧 Contact: info@mdzaid.us.kg</p>
      <p className="text-gray-500 text-xs">© {date} No-Copyright</p>
    </footer>
  );
};

export default Footer;
