import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black to-transparent">
      {/* Title */}
      <h1 className="font-bold text-6xl transition-all duration-1000">
        {title}
      </h1>

      {/* Overview */}
      <p className="py-6 text-lg w-1/4 transition-opacity duration-500">
        {overview}
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 mt-10 transition-all duration-1000">
        <button className="bg-white font-bold text-black p-3 px-10 text-lg rounded-md flex items-center hover:bg-gray-200 transition-all">
          <span className="text-2xl mr-2">▶️</span> Play
        </button>
        <button className="bg-gray-700 font-bold text-white p-3 px-10 text-lg rounded-md flex items-center hover:bg-gray-600 transition-all">
          <span className="text-xl mr-2">ℹ️</span> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
