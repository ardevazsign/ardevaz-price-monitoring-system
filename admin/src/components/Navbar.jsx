import React from 'react';
import { assets } from '../assets/assets';

const NavBar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(10%,80px)]" src={assets.logoardevaz} alt="" />
      <button
        onClick={() => setToken('')}
        className="bg-amber-400 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm shadow-lg hover:bg-amber-500 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
