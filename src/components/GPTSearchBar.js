import React, { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMoviesResults } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const searchmovies = async (movieName) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}+&include_adult=false&language=en-US&page=1`,API_OPTIONS
    );
    const data = await response.json();
    return data.results;
  }
  const handleSearch = async () => {
    console.log(searchText.current.value);
    const gptQuery = `Act as a movie recommendation system and suggest some movie for the query:"+ ${searchText.current.value}".only give me names of 5 movies, comma separated like the example result given ahead. Example Result:"Gadar,Sholay,Don,Golmaal,Koi mil gya;`
    const gptResults = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: gptQuery },
      ],
    });
    if(!gptResults.choices)
    {
        //error handling
    }
    console.log(gptResults.choices?.[0].message.content);
    //for each moive i will search in TMDB API
    const movieNames = gptResults.choices?.[0].message.content.split(",");
    const data = movieNames.map((movie) => searchmovies(movie));
    const finalData = await Promise.all(data);
    dispatch(addGptMoviesResults({movieNames:movieNames,movieResults:finalData}));
    console.log(finalData);
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder="What would you like to watch today?"
        ></input>
        <button
          className="py-2 px-4 bg-red-700 col-span-3 m-4 text-white rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
