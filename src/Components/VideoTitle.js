import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 sm:px-12 md:px-20 absolute text-white bg-gradient-to-r from-black to-transparent">
      {/* Title */}
      <h1 className="font-bold text-3xl sm:text-4xl lg:text-6xl transition-all duration-1000">
        {title}
      </h1>

      {/* Overview */}
      <p className="py-4 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/4 transition-opacity duration-500 line-clamp-4">
        {overview}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-10 transition-all duration-1000">
        <button className="bg-white font-bold text-black p-3 px-6 sm:px-10 text-base sm:text-lg rounded-md flex items-center hover:bg-gray-200 transition-all">
          <span className="text-xl sm:text-2xl mr-2">▶️</span> Play
        </button>
        <button className="bg-gray-700 font-bold text-white p-3 px-6 sm:px-10 text-base sm:text-lg rounded-md flex items-center hover:bg-gray-600 transition-all">
          <span className="text-lg sm:text-xl mr-2">ℹ️</span> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
