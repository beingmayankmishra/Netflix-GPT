import React from "react";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full px-8 py-4 bg-gradient-to-b from-black via-transparent z-10">
      <img
        className="w-48"
        src="/netflixlogo.png"
        alt="Netflix Logo"
      />
    </div>
  );
};

export default Header;