import { createSlice } from "@reduxjs/toolkit";

const moviesReduxSlice=createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        trailer:null,
        popular:null,
        topRated:null,
        upComing:null,
        movieInfo:null,
        similarMovies:null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        addTrailer:(state,action)=>{
            state.trailerVideo=action.payload;
        },
        addPopular:(state,action)=>{
            state.popular=action.payload;
        },
        addTopRated:(state,action)=>{
            state.topRated=action.payload;
        },
        addUpComing:(state,action)=>{
            state.upComing=action.payload;
        },
        addMovieInfo:(state,action)=>{
            state.movieInfo=action.payload
        },
        addSimilarMovies:(state,action)=>{
            state.similarMovies=action.payload
        }

    }
})

export default moviesReduxSlice.reducer;
export const 
{addNowPlayingMovies,
    addTrailer,
addPopular,
addTopRated,
addUpComing,
addMovieInfo,addSimilarMovies
}=moviesReduxSlice.actions;