import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm =()=>{
       setIsSignInForm(!isSignInForm);
    };



  return (
    <div className="relative h-screen">
      <Header />

      {/* Background Banner */}

      <div className="absolute inset-0">
        <img
          src="/loginbanner.jpg"
          alt="Login banner"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      {/* Login Form / signup */}
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 py-10 px-8 rounded-md w-[400px] shadow-lg">
        <h1 className="font-bold text-3xl text-white mb-8">{isSignInForm ? "Sign In" :"Sign up" }</h1>
       
        {!isSignInForm && (<input
          type="text"
          placeholder="Full Name"
          className="p-4 mb-6 w-full text-white rounded-md outline-none bg-gray-800 focus:ring-2  hover:border-white border-transparent border-2 transition"
        />)}
       
        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-4 mb-6 w-full text-white rounded-md outline-none bg-gray-800 focus:ring-2  hover:border-white border-transparent border-2 transition"
        />

        <input
          type="password"
          placeholder="Password"
          className="p-4 mb-8 w-full text-white rounded-md outline-none bg-gray-800 focus:ring-2 hover:border-white border-transparent border-2 transition"
        />
        <button className="bg-red-600 text-white font-semibold py-3 w-full rounded-md hover:bg-red-700 transition">
        {isSignInForm ? "Sign In" :"Sign up" }
        </button>
        <div className="flex justify-between items-center mt-6 text-gray-400 text-sm">

          <label>
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
         
        </div>
        <div className="text-gray-400 text-sm mt-8 text-center">
         
          <p onClick={toggleSignInForm} className="text-white font-bold cursor-pointer">
          {isSignInForm ? "New to Netflix? Sign up now." :"Already Registered? Sign In Now" }
          
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-6">
          This page is protected by Google reCAPTCHA to ensure you're not a
          bot. <Link to="#" className="text-blue-500 hover:underline">Learn more</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
