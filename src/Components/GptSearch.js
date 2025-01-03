import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'

const GptSearch = () => {
  return (
    <div>
          <div className="absolute -z-10 inset-0">
        <img
          src="/loginbanner.jpg"
          alt="Login banner"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

    <GptSearchBar/>
    <GptMovieSuggestions/>

    </div>
  )
}

export default GptSearch