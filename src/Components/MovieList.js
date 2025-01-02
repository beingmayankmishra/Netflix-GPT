import React from "react";
import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-2 ">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll ">
        <div className="flex">
          {movies && movies.length > 0 ? (
            // Corrected map function
            movies.map((movie) => (
              <MovieCards key={movie.id} posterPath={movie.poster_path} />
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
