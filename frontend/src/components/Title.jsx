import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p>
        <span className="text-2xl text-amber-600">{text1}</span>
        <span className="text-gray-600 text-2xl"> {text2}</span>
      </p>
      {/* <p className="w-8 sm:w-12 h-[1px] sm:h-[4px] bg-amber-500"></p> */}
    </div>
  );
};

export default Title;
