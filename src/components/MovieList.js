import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);

  // Early return if movies is null or empty
  if (!movies || movies.length === 0) {
    return (
      <div>
        <h1>{title}</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="px-6">
        <h1 className="text-l md:text-3xl py-4 text-white" >{title}</h1>
        <div className="flex overflow-x-scroll">
          <div className="flex">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
