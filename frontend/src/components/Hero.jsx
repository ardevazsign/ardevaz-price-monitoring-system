import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-amber-500">
      {/* hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-amber-50">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[8px] bg-amber-500"></p>
            <p className="font-medium text-sm md:text-base">
              "Simplifying Life, One Tap at a Time"
            </p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Price Monitoring System
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">
              "Effortless Living , At Your Fingertips."
            </p>
            <p className="w-8 md:w-11 h-[8px] bg-amber-500"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img className="w-full sm:w-1/2" src={assets.image200} alt="" />
    </div>
  );
};

export default Hero;
