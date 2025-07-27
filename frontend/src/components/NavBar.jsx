// import React, { useContext, useState } from 'react';
// import { assets } from '../assets/assets';
// import { Link, NavLink } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';

// const NavBar = () => {
//   const [visible, setVisible] = useState(false);
//   const { setShowSearch, navigate, token, setToken } = useContext(PriceContext);

//   const logout = () => {
//     navigate('/login');
//     localStorage.removeItem('token');
//     setToken('');
//   };

//   return (
//     <div className="flex items-center justify-between px-4 py-4 sm:px-10 font-medium relative">
//       {/* Logo */}
//       <Link to="/">
//         <img src={assets.logoardevaz} className="w-32 sm:w-40" alt="Logo" />
//       </Link>

//       {/* Navigation Links - Hidden on small screens */}
//       <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
//         <NavLink to="/" className="flex flex-col items-center gap-1">
//           <p>Home</p>
//         </NavLink>
//         <NavLink to="/items" className="flex flex-col items-center gap-1">
//           <p>Items</p>
//         </NavLink>
//         <NavLink to="/documents" className="flex flex-col items-center gap-1">
//           <p>Documents</p>
//         </NavLink>
//         <NavLink to="/about" className="flex flex-col items-center gap-1">
//           <p>About</p>
//         </NavLink>
//       </ul>

//       {/* Right Side Icons */}
//       <div className="flex items-center gap-5">
//         {/* Search Icon */}
//         <img
//           onClick={() => setShowSearch(true)}
//           src={assets.search_icon}
//           className="w-5 cursor-pointer"
//           alt="Search"
//         />

//         {/* Profile Dropdown */}
//         <div className="relative group">
//           <img
//             onClick={() => (token ? null : navigate('/login'))}
//             src={assets.profile_icon}
//             className="w-5 cursor-pointer"
//             alt="Profile"
//           />
//           {token && (
//             <div className="absolute right-0 hidden group-hover:block mt-2 z-50 bg-amber-50 shadow-xl rounded">
//               <div className="flex flex-col w-36 text-sm text-gray-700">
//                 <button
//                   onClick={() => navigate('/contact')}
//                   className="py-2 hover:bg-amber-300 hover:text-black transition"
//                 >
//                   My Profile
//                 </button>
//                 <button
//                   onClick={() => navigate('/payment')}
//                   className="py-2 hover:bg-amber-300 hover:text-black transition"
//                 >
//                   Status
//                 </button>
//                 <button
//                   onClick={logout}
//                   className="py-2 hover:bg-amber-300 hover:text-black transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Warehouse Dropdown */}
//         <div className="relative group">
//           <img
//             src={assets.warehouse_icon}
//             className="w-6 cursor-pointer"
//             alt="Warehouse"
//           />
//           {token && (
//             <div className="absolute left-0 hidden group-hover:block mt-2 z-50 bg-amber-50 shadow-xl rounded">
//               <div className="flex flex-col w-36 text-sm text-gray-700">
//                 <Link
//                   to="/pricelist"
//                   className="py-2 text-center hover:bg-amber-300 hover:text-black transition"
//                 >
//                   PRICE LIST
//                 </Link>
//                 <Link
//                   to="/stocks"
//                   className="py-2 text-center hover:bg-amber-300 hover:text-black transition"
//                 >
//                   STOCKS
//                 </Link>
//                 <Link
//                   to="/credit"
//                   className="py-2 text-center hover:bg-amber-300 hover:text-black transition"
//                 >
//                   CREDIT
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Icon */}
//         <img
//           onClick={() => setVisible(true)}
//           src={assets.menu_icon}
//           className="w-5 cursor-pointer sm:hidden"
//           alt="Menu"
//         />
//       </div>

//       {/* Mobile Sidebar Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-amber-100 z-50 transition-all duration-300 ${
//           visible ? 'w-full sm:w-72' : 'w-0'
//         } overflow-hidden`}
//       >
//         <div className="flex flex-col bg-amber-50 h-full">
//           {/* Back button */}
//           <div
//             onClick={() => setVisible(false)}
//             className="flex items-center gap-3 p-4 cursor-pointer border-b"
//           >
//             <img
//               src={assets.dropdown_icon}
//               className="h-4 rotate-180"
//               alt="Back"
//             />
//             <p className="text-gray-700">Back</p>
//           </div>

//           {/* Menu Links */}
//           <NavLink
//             to="/"
//             onClick={() => setVisible(false)}
//             className="py-3 px-6 border-b text-gray-700 hover:bg-amber-200"
//           >
//             HOME
//           </NavLink>
//           <NavLink
//             to="/items"
//             onClick={() => setVisible(false)}
//             className="py-3 px-6 border-b text-gray-700 hover:bg-amber-200"
//           >
//             ITEMS
//           </NavLink>
//           <NavLink
//             to="/documents"
//             onClick={() => setVisible(false)}
//             className="py-3 px-6 border-b text-gray-700 hover:bg-amber-200"
//           >
//             DOCUMENTS
//           </NavLink>
//           <NavLink
//             to="/about"
//             onClick={() => setVisible(false)}
//             className="py-3 px-6 border-b text-gray-700 hover:bg-amber-200"
//           >
//             ABOUT
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

// The original code

import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { PriceContext } from '../context/PriceContext';

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, navigate, token, setToken } = useContext(PriceContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className=" flex items-center justify-evenly py-5 font-medium ">
      <Link to="/">
        <img src={assets.logoardevaz} className="w-40" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-5/5 border-none h-[2.5px] bg-amber-500 hidden" />
        </NavLink>
        <NavLink to="/items" className="flex flex-col items-center gap-1">
          <p>Items</p>
          <hr className="w-5/5 border-none h-[2.5px] bg-amber-500 hidden" />
        </NavLink>
        <NavLink to="/documents" className="flex flex-col items-center gap-1">
          <p>Documents</p>
          <hr className="w-5/5 border-none h-[2.5px] bg-amber-500 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-5/5 border-none h-[2.5px] bg-amber-500 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6 ">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate('/login'))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2">
              <div className="flex flex-col gap-0 w-36 py-2 px-1 bg-amber-50 text-gray-500 hover:text-black rounded shadow-2xl">
                <h4
                  onClick={() => navigate('/contact')}
                  className="cursor-pointer hover:text-black text-center hover:bg-amber-300 text-lg hover:scale-110 transition-transform duration-300"
                >
                  My Profile
                </h4>

                <h4
                  onClick={() => navigate('/payment')}
                  className="cursor-pointer hover:text-black text-center hover:bg-amber-300 text-lg hover:scale-110 transition-transform duration-300"
                >
                  My POS
                </h4>
                <h4
                  onClick={logout}
                  className="cursor-pointer hover:text-black text-center hover:bg-amber-300 text-lg hover:scale-110 transition-transform duration-300"
                >
                  Logout
                </h4>
              </div>
            </div>
          )}
        </div>
        <div className="group relative ">
          <img
            src={assets.warehouse_icon}
            className="w-6 min-w-6 cursor-pointer"
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu left-0 pt-2">
              <div className="flex flex-col gap-0 w-36 py-2 px-1 bg-amber-50 text-gray-500 hover:text-black rounded shadow-2xl">
                <Link
                  to="/pricelist"
                  className="text-lg hover:scale-110 transition-transform duration-300"
                >
                  <h4 className=" cursor-pointer hover:text-black text-center hover:bg-amber-300 text-lg hover:scale-110 transition-transform duration-300">
                    PRICE LIST
                  </h4>
                </Link>
                <Link
                  to="/stocks"
                  className="text-lg hover:scale-110 transition-transform duration-300"
                >
                  <h4 className="cursor-pointer hover:text-black text-center hover:bg-amber-300 text-lg hover:scale-110 transition-transform duration-300">
                    STOCKS
                  </h4>
                </Link>
                <Link
                  to="/credit"
                  className="text-lg hover:scale-110 transition-transform duration-300"
                >
                  <h4 className="cursor-pointer hover:text-black text-center hover:bg-amber-300 text-lg hover:scale-110 transition-transform duration-300">
                    CREDIT
                  </h4>
                </Link>
              </div>
            </div>
          )}
        </div>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* sidevar menu for small screen */}
      <div
        className={`bg-amber-100 absolute top-0 rigth-0 bottom-0 overflow-hidden transition-all md:hidden ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        {/*  */}
        <div className="flex flex-col text-slate-600 bg-amber-50">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/items"
          >
            ITEMS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/documents"
          >
            DOCUMENTS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default NavBar;
