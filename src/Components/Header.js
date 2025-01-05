import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          dispatch(addUser({ uid, email, displayName }));
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
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute top-0 left-0 w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-b from-black via-transparent to-transparent z-10 flex items-center justify-between">
      {/* Logo */}
      <img
        className="w-24 sm:w-32 cursor-pointer"
        src="/netflixlogo.png"
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
      />

      {/* Right Section */}
      {user && (
        <div className="flex items-center space-x-4 sm:space-x-6 relative">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-3 sm:px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm transition-all"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>

          {/* User Profile and Dropdown */}
          <div
            className="relative flex items-center space-x-1 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {/* User Image */}
            <div className="w-8 h-8 rounded-md overflow-hidden bg-red-600 flex items-center justify-center">
              <img className="w-full h-full" alt="User Icon" src="/userimg.png" />
            </div>

            {/* Dropdown Icon */}
            <span className="text-white text-xs sm:text-sm">▼</span>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-12 right-0 bg-gray-800 text-white rounded-md shadow-lg py-2 w-36 sm:w-40">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-sm sm:text-base"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
