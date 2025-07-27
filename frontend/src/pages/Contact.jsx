import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 ">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px] rounded-md"
          src={assets.computer_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            6782 Ardevaz Building <br /> Tanauan City, Philippines.
          </p>
          <p className="text-gray-500">
            Tel: (063) 916-7522487 <br /> Email: admin@ardevaz.com
          </p>
          <p className="text-gray-500">newojunior@gmail.com</p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Ardevaz
          </p>
          <p className="text-gray-500">Learn more about our teams.</p>
          <div className="flex flex-col justify-center gap-1">
            <button className="border rounded border-amber-400 px-8 py-4 text-sm hover:bg-amber-500 hover:text-white transition-all duration-500">
              Explore our Jobs
            </button>
            <a
              href="http://localhost:5174"
              target="_blank"
              rel="noopener noreferrer"
              className="border rounded border-amber-400 px-8 py-4 text-sm hover:bg-amber-500 hover:text-white transition-all duration-500"
            >
              Admin Panel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
