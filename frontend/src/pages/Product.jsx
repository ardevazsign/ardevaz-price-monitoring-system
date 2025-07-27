import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PriceContext } from '../context/PriceContext';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(PriceContext);
  const [productData, setProductData] = useState(false);

  const shortId = (id) => id.slice(0, 7);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="flex justify-center items-center px-4 py-6 sm:px-6 md:px-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-amber-50 p-6 sm:p-8 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h5 className="text-lg sm:text-xl font-semibold mb-2">
            {productData.item}
          </h5>
          <img
            className="w-full h-auto max-h-60 sm:max-h-72 object-cover mx-auto rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            src={productData.image}
            alt={productData.item}
          />
        </div>

        <div className="bg-amber-300 mt-4 p-4 rounded-2xl hover:scale-[1.02] transition-transform duration-300 ease-in-out text-center space-y-3">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-sm sm:text-base">
            <span>No. {shortId(productData._id)}</span>
            <span>{productData.unit}</span>
          </div>

          <h4 className="text-xl font-bold">
            {currency}
            {productData.price.toFixed(2)}
          </h4>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-sm">
            <h5>{productData.category}</h5>
            <h5>{productData.subCategory}</h5>
          </div>

          <h3 className="text-base font-medium">{productData.supplierName}</h3>
          <span className="text-xs text-gray-600">
            Date updated: {new Date().toLocaleDateString()}{' '}
            {productData.updated}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

// Original Code

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';
// // import { assets } from '../assets/assets';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency } = useContext(PriceContext);
//   const [productData, setProductData] = useState(false);

//   const shortId = (id) => id.slice(0, 7);

//   const fetchProductData = async () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchProductData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [productId]);

//   return productData ? (
//     <div className="flex justify-center items-center  p-1 transition-opacity ease-in duration-500 opacity-100 ">
//       <div className=" p-10 flex flex-col items-center bg-amber-50 lg:w-100 md:w-130 sm:w-95  shadow-2xl rounded pb-10 ">
//         <div>
//           <h5 className="text-center pb-2">{productData.item}</h5>
//           <img
//             className="w-50 h-50 hover:scale-110 transition ease-in-out rounded-2xl"
//             src={productData.image}
//             alt=""
//           />
//         </div>
//         <div className="bg-amber-300 lg:w-50 mt-4 text-center p-4 rounded-2xl hover:scale-110 transition ease-in-out">
//           <div className="flex gap-10 justify-center items-center">
//             <span className="">No.{shortId(productData._id)}</span>
//             <span>{productData.unit}</span>
//           </div>
//           <h4>
//             {currency}
//             {productData.price.toFixed(2)}
//           </h4>

//           <div className="flex gap-10 justify-center items-center mb-2">
//             <h5>{productData.category}</h5>
//             <h5>{productData.subCategory}</h5>
//           </div>
//           <h3>{productData.supplierName}</h3>
//           <span> date update : May 5, 2025 {productData.updated}</span>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };
// export default Product;
