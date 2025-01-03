import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: [],
        popularMovies: [], // Added
        topRatedMovies: [],
        upcomingMovies: [], // Added
        trailerVideo: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },

        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            console.log("Payload for topRatedMovies:", action.payload);
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => { // Add this
            state.upcomingMovies = action.payload;
        },
        addTrailerVideo:(state, action) =>{
            state.trailerVideo = action.payload;
        }
    },
});

export const {addNowPlayingMovies,
    addPopularMovies,
    addTopRatedMovies,
    addUpcomingMovies, 
    addTrailerVideo, } = moviesSlice.actions;
export default moviesSlice.reducer;
