import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:"gpt",
    initialState:{
        showGPTSearchbtn:false,
        moviesNamesovies:null,
        moviesResults:null,
    },
    reducers:{
        toggleGPTSearchbtn:(state,action)=>{
            state.showGPTSearchbtn=!state.showGPTSearchbtn;
        },
        addGptMoviesResults:(state,action)=>{
            const {moviesNames,moviesResults}=action.payload;
            state.moviesNames=moviesNames;
            state.moviesResults=moviesResults;
        }
    }
})
export const {toggleGPTSearchbtn,addGptMoviesResults}=gptSlice.actions;
export default gptSlice.reducer;