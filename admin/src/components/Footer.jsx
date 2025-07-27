import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-amber-50 w-full px-4 sm:px-10 md:px-20 lg:px-40 py-10">
      <div className="flex flex-col gap-20 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 lg:gap-16 mb-10">
        {/* Logo & Description */}
        <div>
          <img
            src={assets.logoardevaz}
            className="mb-4 w-36 sm:w-40"
            alt="Logo"
          />
          <p className="sm:text-[12px] text-gray-600 font-mono indent-10 text-justify leading-relaxed ">
            Turning ideas into reality where creativity meets credibility—web
            development you can trust. Code with precision, design with passion,
            bringing your vision to life with transparency and expertise.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg sm:text-xl font-semibold text-amber-600 mb-3">
            COMPANY
          </p>
          <ul className="flex flex-col gap-1 text-gray-700 text-sm sm:text-base">
            <li className="sm:text-[14px] hover:text-cyan-400">
              MCS Rice Retailer
            </li>
            <li className="sm:text-[14px] hover:text-cyan-400">About Us</li>
            <li className="sm:text-[14px] hover:text-cyan-400">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg sm:text-xl font-semibold text-amber-600 mb-3">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-1 text-gray-700 text-sm sm:text-base">
            <li className="sm:text-[14px] hover:text-cyan-400">
              +63-916-752-2487
            </li>
            <li className="sm:text-[14px] hover:text-cyan-400">
              contact@ardevazsign.com
            </li>
            <li className="sm:text-[14px] hover:text-cyan-400">
              newojunior@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="space-y-0.5">
        <hr className="border-amber-400" />
        <hr className="border-amber-400" />
        <hr className="border-amber-400" />
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-sm sm:text-base mt-5 text-gray-600">
        © 2025 ardevazsign.com — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;

// Original Code

// import React from 'react';
// import { assets } from '../assets/assets';

// const Footer = () => {
//   return (
//     <div>
//       <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
//         <div>
//           <img src={assets.logoardevaz} className="mb-5 w-40" alt="" />
//           <p className="w-full md:w-2/3 text-gray-500 font-mono">
//             Turning ideas into reality where creativity meets credibility—web
//             development you can trust. Code with precision, design with passion,
//             Bringing your vision to life with transparency and expertise.
//           </p>
//         </div>
//         <div>
//           <p className="text-xl font-medium mb-5">COMPANY</p>
//           <ul className="flex flex-col gap-1 text-gray-600">
//             <li>MCS Rice Retailer</li>
//             <li>About us</li>
//             <li>Privacy policy</li>
//           </ul>
//         </div>
//         <div>
//           <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
//           <ul className="flex flex-col gap-1 text-gray-600">
//             <li>+63-916-752-2487</li>
//             <li>contact@ardevaz.com</li>
//             <li>newojunior@gmail.com</li>
//           </ul>
//         </div>
//       </div>
//       <div>
//         <hr className="text-amber-500" />
//         <hr className="text-amber-500 mt-0.25" />
//         <hr className="text-amber-500 mt-0.25" />
//         <p className="py-5 text-medium text-center">
//           Copyright 2025@ ardevaz.com - All Right Reserved.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Footer;
