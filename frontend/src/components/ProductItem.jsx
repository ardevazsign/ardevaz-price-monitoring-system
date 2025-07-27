import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PriceContext } from '../context/PriceContext';

const ProductItem = ({
  id,
  image,
  item,
  unit,
  price,
  supplierName,
  category,
  subCategory,
  updated,
}) => {
  //
  const { currency } = useContext(PriceContext);

  const shortId = (id) => id.slice(0, 7);

  const formatPrice = price.toFixed(2);
  // const retailerPriceFormated = retailerPrice.toFixed(2);

  return (
    <Link className="text-gray-700 cursor-pointer  " to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="w-50 h-50 hover:scale-110 transition ease-in-out"
          src={image}
          alt=""
        />
      </div>
      <div className="bg-amber-50 p-2 w-50 mt-1 h-50 rounded-lg flex flex-col items-left shadow-md ">
        <p className="text-center pt-3 font-[8px] text-gray-600">{item}</p>
        <p className="text-center text-xxs text-blue-500">{unit}</p>
        <p className="text-center text-sm text-red-500">
          <span className="text-center text-sm text-gray-600">Product No.</span>
          {shortId(id)}
        </p>
        <p className="text-center text-sm font-medium text-blue-600">
          <span className="text-center text-gray-600 text-md font-bold">
            Price :
          </span>
          {currency}
          {formatPrice}
        </p>

        <p className="text-center text-sm text-gray-500 ">{supplierName}</p>
        <p className="text-center text-xs font-light text-amber-500">
          {category}
        </p>
        <p className="text-center text-xxs text-gray-600">{subCategory}</p>
        <p className="text-center pt-1 text-sm">{updated}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
