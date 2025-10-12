import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowPopularMovies: null,
    trailerVideo: null,
  },
  reducers: {
    addnowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.nowPopularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});
export const { addnowPlayingMovies, addTrailerVideo, addPopularMovies } =
  movieSlice.actions;
export default movieSlice.reducer;
