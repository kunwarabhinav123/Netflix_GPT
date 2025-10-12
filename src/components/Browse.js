import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import usePopularMovies from "../hooks/usePopularMovies.js";
import GPTSearch from "./GPTSearch.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const showGPT = useSelector((store) => store.gpt.showGPTSearchbtn);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  //fetch data from TDMB api and update store(movieSlice)
  useNowPlayingMovies();
  usePopularMovies();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="">
      <Header></Header>
      {showGPT ? (
        <GPTSearch></GPTSearch>
      ) : (
        <>
          <MainContainer></MainContainer>
          <SecondaryContainer></SecondaryContainer>
        </>
      )}
    </div>
  );
};

export default Browse;
