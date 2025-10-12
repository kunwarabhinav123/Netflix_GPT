import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestion = () => {
  const { moviesName, moviesResults } = useSelector((store) => store.gpt);
  if (!moviesName) return null;
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {moviesName.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={moviesResults[index]}
          ></MovieList>
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestion;
