import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
       navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }


  return (
    <div className="absolute top-0 left-0 w-full px-4 py-2 bg-gradient-to-b from-black via-transparent z-10 flex justify-between">
      <img
        className="w-48"
        src="/netflixlogo.png"
        alt="Netflix Logo"
      />

     {user && (<div className="flex p-2">

        <img className="w-12 h-12 " 
        alt="usericon" 
        src="/userimg.png"/>
        <button onClick={handleSignOut} className=" font-bold text-white">(Sign Out)</button>

      </div>

    )}



    </div>
  );
};

export default Header;