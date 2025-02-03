import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [hoveredPlatform, setHoveredPlatform] = useState(null);
  const date = new Date().getFullYear();

  const platforms = [
    {
      name: "VidBinge",
      url: "https://www.vidbinge.com/",
      icon: "🎬",
      isNew: true,
    },
    { name: "PStream", url: "https://pstream.org/", icon: "📺" },
    {
      name: "Heartive (Ads)",
      url: "https://heartive.pages.dev/movies/",
      icon: "⚠️",
      warning: true,
    },
    {
      name: "YupMovie (Downloads)",
      url: "https://yupmovie.com/",
      icon: "🍿",
      highlight: true,
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black/90 to-black/95 text-gray-300 py-8 overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[gradient_3s_linear_infinite]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Platforms Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">✨</span>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Ad-Free Alternatives
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <Link
                  key={platform.name}
                  to={platform.url}
                  target="_blank"
                  className={`
                    relative group p-4 rounded-xl transition-all duration-300
                    ${
                      platform.warning
                        ? "bg-red-900/20 hover:bg-red-900/30"
                        : platform.highlight
                        ? "bg-green-900/20 hover:bg-green-900/30"
                        : "bg-gray-800/50 hover:bg-gray-800/70"
                    }
                    backdrop-blur-sm
                  `}
                  onMouseEnter={() => setHoveredPlatform(platform.name)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{platform.icon}</span>
                    <span className="font-medium">{platform.name}</span>
                  </div>

                  <span
                    className={`absolute right-3 top-3 text-sm transition-opacity duration-300 
                      ${
                        hoveredPlatform === platform.name
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                  >
                    ↗️
                  </span>

                  {platform.isNew && (
                    <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold bg-yellow-500 text-black rounded-full">
                      NEW
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Developer Tools Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-400">🛠️</span>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Explore More by the Creator              </h2>
            </div>

            <Link
              to="https://mztools.us.kg"
              target="_blank"
              className="block p-4 bg-gray-700/50 hover:bg-gray-800/70 rounded-xl transition-all duration-300 group backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://i.postimg.cc/sDtFTrWh/image.png"
                  alt="MZ Tools Logo"
                  className="w-26 h-14 rounded-xl group-hover:scale-105 transition-transform duration-300"
                />

                <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ↗️
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col items-center pt-6 border-t border-gray-800">
          <img
            src="https://i.postimg.cc/pXyVHyhh/image.jpg"
            alt="MZ Tv Logo"
            className="w-21 h-16 rounded-xl shadow-lg mb-4 hover:scale-105 transition-transform duration-300"
          />

          <p className="text-sm text-gray-400 mb-4 max-w-md text-center">
            Stream unlimited movies for free. No subscriptions, pure
            entertainment!
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>info@mdzaid.us.kg</span>
            <span>•</span>
            <span>© {date} No-Copyright</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
