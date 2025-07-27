import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen ">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {/* One */}
        <NavLink
          className="flex items-center gap-3 border border-amber-300    px-3 py-2 rounded-l shadow-lg bg-gradient-to-r from-amber-400 via-white to-amber-500 "
          to="/add"
        >
          <img className="w-5 h-5 border-b " src={assets.sackIcon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        {/* Two */}
        <NavLink
          className="flex items-center gap-3 border border-amber-300   px-3 py-2 rounded-l shadow-lg bg-gradient-to-r from-amber-400 via-white to-amber-500 "
          to="/productlist"
        >
          <img className="w-5 h-5 border-b" src={assets.listview} alt="" />
          <p className="hidden md:block">Product Total List</p>
        </NavLink>
        {/* Three */}
        <NavLink
          className="flex items-center gap-3 border border-amber-300   px-3 py-2 rounded-l shadow-lg bg-gradient-to-r from-amber-400 via-white to-amber-500 "
          to="/createreceipt"
        >
          <img className="w-5 h-5 border-b" src={assets.receiptIcon} alt="" />
          <p className="hidden md:block">Create Receipt</p>
        </NavLink>
        {/* Four */}
        <NavLink
          className="flex items-center gap-3 border border-amber-300   px-3 py-2 rounded-l shadow-lg bg-gradient-to-r from-amber-400 via-white to-amber-500 "
          to="/receiptlist"
        >
          <img className="w-5 h-5 border-b" src={assets.listview} alt="" />
          <p className="hidden md:block">Receipt List</p>
        </NavLink>
        {/* Five */}
        <NavLink
          className="flex items-center gap-3 border border-amber-300   px-3 py-2 rounded-l shadow-lg bg-gradient-to-r from-amber-400 via-white to-amber-500 "
          to="/viewstocks"
        >
          <img className="w-5 h-5 border-b" src={assets.listview} alt="" />
          <p className="hidden md:block">View Stocks</p>
        </NavLink>
        {/* Six */}
        <NavLink
          className="flex items-center gap-3 border border-amber-300   px-3 py-2 rounded-l shadow-lg bg-gradient-to-r from-amber-400 via-white to-amber-500 "
          to="/ricepos"
        >
          <img className="w-5 h-5 border-b" src={assets.warehouse} alt="" />
          <p className="hidden md:block">Rice Store POS</p>
        </NavLink>
        {/* Seven */}
        <NavLink
          className="flex items-center gap-3 border border-amber-300   px-3 py-2 rounded-l shadow-lg bg-gradient-to-r from-amber-400 via-white to-amber-500 "
          to="/creditstatus"
        >
          <img className="w-5 h-5 border-b" src={assets.creditCard} alt="" />
          <p className="hidden md:block">Edit Credit Status</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
