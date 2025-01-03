import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGE } from "../utils/constants";

import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          const { uid, email, displayName } = user;
          dispatch(
            addUser({ uid: uid, email: email, displayName: displayName })
          );
          navigate("/browse");
        } else {
          signOut(auth); // Automatically sign out unverified users
          dispatch(removeUser());
          navigate("/");
        }
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  const handleGptSearchClick = () => {
    // toggle GPT search

    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute top-0 left-0 w-full px-4 py-2 bg-gradient-to-b from-black via-transparent z-10 flex justify-between">
      <img className="w-48" src="/netflixlogo.png" alt="Netflix Logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white m-2"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          ;
          <button
            className="py-2 rounded-lg mx-4 my-2 px-4 bg-purple-800 text-white "
            onClick={handleGptSearchClick}
          >
             {showGptSearch? "Home": "GPT Search"} 
          </button>
          <img className="w-12 h-12" alt="usericon" src="/userimg.png" />
          <button onClick={handleSignOut} className="font-bold text-blue-950">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
