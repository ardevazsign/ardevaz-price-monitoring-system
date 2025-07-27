import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const ProductList = ({ token }) => {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/productlist');
      if (response.data.success) {
        const sortedProducts = [...response.data.products].sort((a, b) => {
          const itemA = a.item.toLowerCase();
          const itemB = b.item.toLowerCase();
          return itemA.localeCompare(itemB);
        });
        setProductList(sortedProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchProductList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className="overflow-y-auto max-h-screen p-2 md:p-4 bg-white border border-cyan-300 rounded-xl shadow-md">
      <p className="mb-2 font-bold text-lg text-cyan-700">All Products List</p>
      <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border border-white mb-3 py-1">
        Total Number of Products: <span>{productList.length}</span>
      </p>

      <div className="flex flex-col gap-1">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b className="text-center">Item</b>
          <b className="text-center">Unit</b>
          <b className="text-center">Price</b>
          <b className="text-center">Category</b>
          <b className="text-center">Supplier Name</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Items */}
        {productList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr_1fr] md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm bg-white hover:bg-gray-50 transition"
          >
            <img
              className="w-14 h-14 object-cover rounded hover:scale-150 transition-transform duration-300"
              src={item.image[0]}
              alt="Product"
            />
            <p className="text-base font-semibold text-center bg-amber-200 py-1 rounded">
              {item.item}
            </p>
            <p className="text-center font-medium text-base">{item.unit}</p>
            <p className="text-center font-medium text-base">
              {currency} {item.price.toFixed(2)}
            </p>
            <p className="text-center font-medium text-base">
              {item.category.toUpperCase()}
            </p>
            <p className="text-center font-medium text-base">
              {item.supplierName.toUpperCase()}
            </p>
            <button
              onClick={() => removeProduct(item._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm shadow"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

// The Original Code Below Here

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const ProductList = ({ token }) => {
//   //
//   const [productList, setProductList] = useState([]);

//   const fetchProductList = async () => {
//     try {
//       //
//       const response = await axios.get(backendUrl + '/api/product/productlist');
//       if (response.data.success) {
//         // Sort the products alphabetically by 'item' name before setting the state
//         const sortedProducts = [...response.data.products].sort((a, b) => {
//           // Ensure comparison is case-insensitive for proper alphabetical order
//           const itemA = a.item.toLowerCase();
//           const itemB = b.item.toLowerCase();
//           if (itemA < itemB) {
//             return -1;
//           }
//           if (itemA > itemB) {
//             return 1;
//           }
//           return 0; // names are equal
//         });
//         setProductList(sortedProducts);
//         // setProductList(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       //prettier-ignore
//       const response = await axios.post(backendUrl + '/api/product/remove',{id}, { headers: { token } });
//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchProductList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProductList();
//   }, []);

//   return (
//     <>
//       <p className="mb-2 font-bold text-lg ">All Products List</p>
//       <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border-2 border-white mb-1 ">
//         Total Number of Products :
//         <span className="text-white text-center"> {productList.length} </span>
//       </p>
//       <div className="flex flex-col gap-1">
//         {/* List Table Title */}
//         <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
//           <b>Image</b>
//           <b className="text-center">Item</b>
//           <b className="text-center">unit</b>
//           <b className="text-center">Price</b>
//           <b className="text-center">Category</b>
//           <b className="text-center">Supplier Name</b>
//           <b className="text-center">Action</b>
//         </div>
//         {/* Product List */}

//         {productList.map((item, index) => (
//           <div
//             className="grid grid-cols-[1fr_1.5fr_1fr] md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_1fr] items-center gap-1 py-1 px-1 border text-sm"
//             key={index}
//           >
//             <img
//               className="w-14 h-14  hover:scale-150 transition ease-in-out "
//               src={item.image[0]}
//               alt=""
//             />
//             <p className=" text-base text-center font-semibold text-[16px] bg-amber-300 py-1 ">
//               {item.item}
//             </p>
//             <p className="font-medium text-base  text-center">{item.unit}</p>
//             <p className="font-medium text-base  text-center">
//               {currency} {item.price.toFixed(2)}
//             </p>
//             <p className="font-medium text-base  text-center">
//               {item.category.toUpperCase()}
//             </p>
//             <p className="font-medium text-base  text-center">
//               {item.supplierName.toUpperCase()}
//             </p>

//             <p
//               onClick={() => removeProduct(item._id)}
//               className="rounded bg-blue-400 hover:bg-slate-300 hover:text-red-500 text-white md:text-center sm:text-center cursor-pointer text-lg border-1 shadow-md text-center"
//             >
//               Delete
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ProductList;
