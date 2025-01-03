import React from 'react'
import lang from '../utils/LanguageConstant'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {

    const langkey =  useSelector((store)=>store.config.lang);


  return (
    <div className='pt-[12%] flex justify-center'>

    <form className='w-1/2 grid grid-cols-12 bg-black'>
        <input type='text' className='p-4 m-4 col-span-9 ' placeholder={lang[langkey].gptSearchPlaceholder}/>
        <button className='py-2 px-4 m-4 col-span-3 bg-red-700 rounded-lg text-white'>{lang[langkey].search}</button>
    </form>


    </div>
  )
}

export default GptSearchBar;