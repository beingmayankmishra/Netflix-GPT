const MovieCards = ({ posterPath }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt="Movie Poster"
        className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
};

export default MovieCards;