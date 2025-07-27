import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logoardevaz} className="mb-5 w-40" alt="" />
          <p className="w-full md:w-2/3 text-gray-500  indent-15 text-justify text-[12px]">
            Turning ideas into reality where creativity meets credibility—web
            development you can trust. Code with precision, design with passion,
            Bringing your vision to life with transparency and expertise.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="hover:text-cyan-400">MCS Rice Retailer</li>
            <li className="hover:text-cyan-400">About us</li>
            <li className="hover:text-cyan-400">Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="hover:text-cyan-400">+63-916-752-2487</li>
            <li className="hover:text-cyan-400">contact@ardevaz.com</li>
            <li className="hover:text-cyan-400">newojunior@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="text-amber-500 " />
        <hr className="text-amber-500 mt-0.25" />
        <hr className="text-amber-500 mt-0.25" />
        <p className="py-5 text-medium text-center">
          Copyright 2025@ ardevaz.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
