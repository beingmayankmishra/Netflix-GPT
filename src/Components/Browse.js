import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from './hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from './hooks/usePopularMovies';


const Browse = () => {
// customhook
 useNowPlayingMovies();
 usePopularMovies();

   return (
    <div>
    <Header/>
    <MainContainer/>
    <SecondaryContainer/>
   
    </div>
  )
}

export default Browse;