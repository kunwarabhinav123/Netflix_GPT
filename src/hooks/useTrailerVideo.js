import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

//fetching trailer id and updating it in store
const useTrailerVideo=(movieId)=>{
    const dispatch=useDispatch();
    const trailerVideo=useSelector((store)=>store.movies.trailerVideo);
    const getTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    const filterdata = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterdata.length ? filterdata[0] : json.results[0];
    // console.log(trailer);
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    !trailerVideo && getTrailer();
  }, []);
};
export default useTrailerVideo;