// import { useContext, useEffect, useState } from 'react';
// import { PriceContext } from '../context/PriceContext';
// import { assets } from '../assets/assets';
// import Title from '../components/Title';
// import ReceiptList from '../components/ReceiptList';

// const Documents = () => {
//   const { receipts, search, showSearch } = useContext(PriceContext);

//   const [showFilter, setShowFilter] = useState(false);
//   const [filterReceipts, setFilterReceipts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState('relavent');
//   const [totalAmountSum, setTotalAmountSum] = useState(0); // ✅ new state

//   const toggleCategory = (e) => {
//     const value = e.target.value;
//     setCategory((prev) =>
//       prev.includes(value)
//         ? prev.filter((item) => item !== value)
//         : [...prev, value]
//     );
//   };

//   const toggleSubCategory = (e) => {
//     const value = e.target.value;
//     setSubCategory((prev) =>
//       prev.includes(value)
//         ? prev.filter((item) => item !== value)
//         : [...prev, value]
//     );
//   };

//   const applyFilter = () => {
//     let receiptsCopy = receipts.slice();

//     if (showSearch && search) {
//       receiptsCopy = receiptsCopy.filter((item) =>
//         item.name?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category.length > 0) {
//       receiptsCopy = receiptsCopy.filter((item) =>
//         category.includes(item.category)
//       );
//     }

//     if (subCategory.length > 0) {
//       receiptsCopy = receiptsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }

//     setFilterReceipts(receiptsCopy);
//   };

//   const sortReceipts = () => {
//     let sorted = [...filterReceipts];

//     if (sortType === 'low-high') {
//       sorted.sort((a, b) => a.price - b.price);
//     } else if (sortType === 'high-low') {
//       sorted.sort((a, b) => b.price - a.price);
//     }

//     setFilterReceipts(sorted);
//   };

//   const calculateTotalAmount = () => {
//     const total = filterReceipts.reduce((sum, item) => {
//       const amount = parseFloat(item.totalAmount);
//       return !isNaN(amount) ? sum + amount : sum;
//     }, 0);
//     setTotalAmountSum(total);
//   };

//   useEffect(() => {
//     applyFilter();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category, subCategory, search, showSearch, receipts]);

//   useEffect(() => {
//     sortReceipts();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [sortType]);

//   useEffect(() => {
//     calculateTotalAmount(); // ✅ recalculate when filtered receipts change
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filterReceipts]);

//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
//       {/* Filter Options */}
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           FILTERS
//           <img
//             src={assets.dropdown_icon}
//             className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
//             alt=""
//           />
//         </p>

//         {/* Category Filter */}
//         <div
//           className={`border border-amber-400 pl-5 py-3 mt-6 ${
//             showFilter ? '' : 'hidden'
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             {['Supplier', 'Date', 'Amount'].map((cat) => (
//               <p className="flex gap-2" key={cat}>
//                 <input
//                   className="w-3"
//                   type="checkbox"
//                   value={cat}
//                   onChange={toggleCategory}
//                 />{' '}
//                 By {cat}
//               </p>
//             ))}
//           </div>
//         </div>

//         {/* Subcategory Filter */}
//         <div
//           className={`border border-amber-400 pl-5 py-3 my-5 ${
//             showFilter ? '' : 'hidden'
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">TYPE</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
//             {['Paid', 'Credit', 'partial'].map((type) => (
//               <p className="flex gap-2" key={type}>
//                 <input
//                   className="w-3"
//                   type="checkbox"
//                   value={type}
//                   onChange={toggleSubCategory}
//                 />{' '}
//                 {type}
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1={'ALL'} text2={'RECEIPTS'} />
//           <select
//             onChange={(e) => setSortType(e.target.value)}
//             className="border-2 border-amber-400 text-sm px-2"
//           >
//             <option value="relavent">Sort by: Relavent</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>

//         <hr className="text-amber-400 w-full mb-1 my-4" />

//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 gap-y-4 sm:grid-cols-1 sm:text-xs">
//           {filterReceipts.length > 0 ? (
//             filterReceipts.map((item, index) => (
//               <ReceiptList
//                 key={item._id || index}
//                 id={item._id}
//                 supplierName={item.supplierName}
//                 receiptNumber={item.receiptNumber}
//                 deliveryDate={item.deliveryDate}
//                 totalAmount={item.totalAmount}
//               />
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-400">
//               No receipts found.
//             </p>
//           )}
//         </div>

//         <hr className="text-amber-400 w-full my-4" />

//         {/* ✅ Display total amount */}
//         <div className="text-right font-bold text-lg text-amber-600 mt-2">
//           Total Amount:{' '}
//           {totalAmountSum.toLocaleString(undefined, {
//             minimumFractionDigits: 2,
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Documents;

import { useContext, useEffect, useState } from 'react';
import { PriceContext } from '../context/PriceContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ReceiptList from '../components/ReceiptList';

const Documents = () => {
  const { receipts, search, showSearch } = useContext(PriceContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterReceipts, setFilterReceipts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let receiptsCopy = receipts.slice();

    if (showSearch && search) {
      receiptsCopy = receiptsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      receiptsCopy = receiptsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      receiptsCopy = receiptsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterReceipts(receiptsCopy);
  };

  const sortReceipts = () => {
    let fpCopy = filterReceipts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterReceipts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterReceipts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        // applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
    // sortProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory, search, showSearch, receipts]);

  useEffect(() => {
    sortReceipts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
      {/* filter options  */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            alt=""
          />
        </p>
        {/* Category Filter  */}
        <div
          className={`border border-amber-400 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Supplier'}
                onChange={toggleCategory}
              />{' '}
              By Supplier
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Date'}
                onChange={toggleCategory}
              />{' '}
              By Date
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Amount'}
                onChange={toggleCategory}
              />{' '}
              By Amount
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-amber-400 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Paid'}
                onChange={toggleSubCategory}
              />
              Paid
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Credit'}
                onChange={toggleSubCategory}
              />
              Credit
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'partial'}
                onChange={toggleSubCategory}
              />
              Partialy Paid
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'RECEIPTS'} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-amber-400 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low </option>
          </select>
        </div>
        {/* Map Product */}
        <hr className="text-amber-400 w-full mb-1 my-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 gap-y-4  sm:grid-cols-1 sm:text-xs  ">
          {/* {receipts.length > 0 &&
            receipts.map((receipt) => (
              <ReceiptList
                key={receipt._id}
                id={receipt._id}
                supplierName={receipt.supplierName}
                receiptNumber={receipt.receiptNumber}
                deliveryDate={receipt.deliveryDate}
                totalAmount={receipt.totalAmount}
              />
            ))} */}

          {filterReceipts.length > 0 ? (
            filterReceipts.map(
              (item, index) => (
                console.log('Receipts from context:', item),
                (
                  <ReceiptList
                    key={item._id || index}
                    id={item._id}
                    supplierName={item.supplierName}
                    receiptNumber={item.receiptNumber}
                    deliveryDate={item.deliveryDate}
                    totalAmount={item.totalAmount}
                  />
                )
              )
            )
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No receipts found.
            </p>
          )}
          <hr className="text-amber-400 w-full   my-4 " />
        </div>
      </div>
    </div>
  );
};

export default Documents;
