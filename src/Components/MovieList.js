import React from "react";
import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 py-8">
      <h1 className="text-4xl py-6 text-white font-bold tracking-wider">{title}</h1>
      <div className="relative group">
        {/* Left Arrow */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-70 hover:opacity-100 transition duration-300 z-10"
          onClick={() => {
            document.getElementById(`${title}-container`).scrollBy({ left: -400, behavior: 'smooth' });
          }}
        >
          ◀
        </button>

        {/* Movies Container */}
        <div
          id={`${title}-container`}
          className="flex items-center space-x-4 overflow-hidden sm:w-full lg:w-auto"
        >
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-none w-[150px] sm:w-[200px] h-[300px] hover:scale-105 transition-transform duration-300"
              >
                <MovieCards posterPath={movie.poster_path} />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No movies available</p>
          )}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-70 hover:opacity-100 transition duration-300 z-10"
          onClick={() => {
            document.getElementById(`${title}-container`).scrollBy({ left: 400, behavior: 'smooth' });
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default MovieList;
