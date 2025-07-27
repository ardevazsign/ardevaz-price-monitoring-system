import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PriceContext } from '../context/PriceContext';

const PriceListItem = ({
  id,
  image,
  item,
  unit,
  supplierName,
  price,
  category,
  subCategory,
  updated,
}) => {
  //
  const { currency } = useContext(PriceContext);

  const supplierPriceFormated = price.toFixed(2);
  // const retailerPriceFormated = retailerPrice.toFixed(2);

  return (
    <Link
      className="text-gray-700 cursor-pointer flex items-center justify-center gap-3"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden shadow-lg">
        <img
          className="md:w-16 md:h-16 w-10 h-10 hover:scale-110 transition ease-in-out rounded "
          src={image}
          alt=""
        />
      </div>
      <div
        className="bg-gradient-to-r from-amber-400
      via-white to-black p-3  w-240 mt-2 h-10 flex items-center justify-around gap-x-1 shadow-lg overflow-hidden sm:text-xs"
      >
        <p className="text-sm ">{item}</p>
        <p className=" text-sm text-green-500">{unit}</p>

        <p className="text-sm text-blue-500">
          <span className="text-gray-700 text-sm">Supplier Price : </span>
          {currency}
          {supplierPriceFormated}
        </p>
        {/* <p className="text-sm text-red-500">
          <span className="text-gray-700  text-sm">Retailer Price : </span>
          {currency}
          {retailerPriceFormated}
        </p> */}
        <p className="hidden md:block pt-1 text-sm text-white ">
          {supplierName}
        </p>
        <p className="hidden md:block text-xs text-white ">{category}</p>
        <p className="hidden md:block text-xs text-white ">{subCategory}</p>
        <p className="pt-1 text-sm">{updated}</p>
      </div>
    </Link>
  );
};

export default PriceListItem;
