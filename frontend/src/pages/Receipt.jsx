import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PriceContext } from '../context/PriceContext';

const DeliveryReceipt = () => {
  const { receiptId } = useParams();
  const { receipts, currency } = useContext(PriceContext);
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceiptData = () => {
      const foundReceipt = receipts.find((item) => item._id === receiptId);
      if (foundReceipt) {
        setReceiptData(foundReceipt);
      }
      setLoading(false);
    };

    fetchReceiptData();
  }, [receiptId, receipts]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!receiptData) {
    return (
      <div className="text-center text-red-500 py-10">
        Delivery Receipt not found.
      </div>
    );
  }

  // Fallbacks for totals
  const items = receiptData.items || [];

  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0
  );
  const totalQuantity = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const totalItemClass = items.length;

  const parseNumberFromUnit = (unit) => {
    if (!unit) return 0;
    const match = String(unit).match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const totalKilograms = items.reduce(
    (sum, item) => sum + parseNumberFromUnit(item.unit),
    0
  );

  // shorten supplier name

  const shortenText = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > 1 ? words[0] : text; // take first word only
  };

  return (
    <div className="flex justify-center items-center p-1 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col items-center bg-amber-50 lg:w-180 md:w-130 sm:w-95 shadow-2xl rounded pb-10">
        {/* HEADER */}
        <div className="flex-1">
          <hr className="mt-10" />
          {[...Array(3)].map((_, i) => (
            <hr key={i} className="mt-0.25 text-amber-400" />
          ))}
          <hr className="mt-0.25" />
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1">
            DELIVERY RECEIPT
          </h1>
          {[...Array(3)].map((_, i) => (
            <hr key={i + 3} className="mt-0.25 text-amber-400" />
          ))}
          <hr className="mt-0.25 mb-2" />
        </div>

        {/* SUPPLIER + INFO */}
        <div className="flex gap-5 pt-4">
          <div className="flex flex-col justify-center">
            <p className="bg-slate-200 py-1 px-20">
              <span className="sm:hidden  md:hidden">
                {shortenText(receiptData.supplierName)}
              </span>
              <span className="hidden sm:inline  md:inline">
                {' '}
                {receiptData.supplierName}
              </span>
            </p>
            <span className="text-center">Supplier Name</span>
            <p className="bg-slate-200 py-1 px-20 text-center">
              Unpaid
              {receiptData.status}
            </p>
            <span className="text-center">Status</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="bg-slate-200 py-1 px-20">
              <span className="hidden   sm:inline">No.</span>{' '}
              {receiptData.receiptNumber}
            </p>
            <span className="text-center">O.R. Number</span>
            <p className="bg-slate-200 py-1 px-20">
              {/* {receiptData.deliveryDate} */}
              {new Date(receiptData.deliveryDate)
                .toLocaleDateString('en-GB')
                .split('/')
                .map((v, i) => (i === 2 ? v.slice(2) : v))
                .join('/')}
            </p>
            <span className="text-center">Date Delivered</span>
          </div>
        </div>

        {/* HEADERS */}
        <div className="flex gap-1 mt-4 font-semibold">
          <p className="bg-amber-400 py-1 w-[40px] text-center">Qty</p>
          <p className="bg-amber-400 py-1 w-[50px] text-center">Unit</p>
          <p className="bg-amber-400 py-1 w-[180px] text-center">Articles</p>
          <p className="bg-amber-400 py-1 w-[75px] text-center">Price</p>
          <p className="bg-amber-400 py-1 w-[80px] text-center">Amount</p>
        </div>

        {/* ITEMS */}
        <div>
          {items.map((item, index) => (
            <div key={index} className="flex gap-1 mt-2">
              <p className="text-center border w-[40px]">{item.quantity}</p>
              <p className="text-center border w-[50px]">{item.unit}</p>
              <p className="text-center border w-[180px]">{item.article}</p>
              <p className="text-center border w-[75px]">
                {currency}
                {Number(item.unitPrice || 0).toLocaleString()}
              </p>
              <p className="text-center border w-[80px]">
                {currency}
                {/* {Number(item.totalAmount || 0).toLocaleString()} */}
                {Number(item.totalAmount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full mt-4 px-4">
          {[...Array(3)].map((_, i) => (
            <hr key={i} className="mt-0.5 text-amber-400" />
          ))}
          <hr className="mt-1" />
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-full px-4">
          <div className="bg-amber-200 text-center py-2">
            <p> {totalKilograms.toLocaleString()}</p>
            <span>Items Total Kilograms</span>
          </div>
          <div className="bg-amber-300 text-center py-2">
            <p>{totalItemClass}</p>
            <span>Total Item Class</span>
          </div>
          <div className="bg-amber-300 text-center py-2">
            <p>{totalQuantity}</p>
            <span>Total Quantity</span>
          </div>
          <div className="bg-amber-400 text-center py-2">
            <p>
              {currency}
              {/* {totalAmount.toLocaleString()} */}
              {Number(Number(totalAmount).toFixed(2)).toLocaleString()}
            </p>
            <span>Total Amount</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryReceipt;

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';

// const DeliveryReceipt = () => {
//   const { receiptId } = useParams();
//   const { receipts, currency } = useContext(PriceContext);
//   const [receiptData, setReceiptData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReceiptData = () => {
//       const foundReceipt = receipts.find((item) => item._id === receiptId);
//       if (foundReceipt) {
//         setReceiptData(foundReceipt);
//       }
//       setLoading(false);
//     };

//     fetchReceiptData();
//   }, [receiptId, receipts]);

//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (!receiptData) {
//     return (
//       <div className="text-center text-red-500 py-10">
//         Delivery Receipt not found.
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center p-1 transition-opacity ease-in duration-500 opacity-100">
//       <div className="flex flex-col items-center bg-amber-50 lg:w-180 md:w-130 sm:w-95 shadow-2xl rounded pb-10">
//         {/* HEADER */}
//         <div className="flex-1">
//           <hr className="mt-10" />
//           {[...Array(3)].map((_, i) => (
//             <hr key={i} className="mt-0.25 text-amber-400" />
//           ))}
//           <hr className="mt-0.25" />
//           <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1">
//             DELIVERY RECEIPT
//           </h1>
//           {[...Array(3)].map((_, i) => (
//             <hr key={i + 3} className="mt-0.25 text-amber-400" />
//           ))}
//           <hr className="mt-0.25 mb-2" />
//         </div>

//         {/* SUPPLIER + INFO */}
//         <div className="flex gap-5 pt-4">
//           <div className="flex flex-col justify-center">
//             <p className="bg-slate-200 py-1 px-20">
//               {receiptData.supplierName}
//             </p>
//             <span className="text-center">Supplier Name</span>
//             <p className="bg-slate-200 py-1 px-20 text-center">
//               Unpaid {receiptData.status}
//             </p>
//             <span className="text-center">Status</span>
//           </div>
//           <div className="flex flex-col justify-center">
//             <p className="bg-slate-200 py-1 px-20">
//               No. {receiptData.receiptNumber}
//             </p>
//             <span className="text-center">O.R. Number</span>
//             <p className="bg-slate-200 py-1 px-20">
//               {receiptData.deliveryDate}
//             </p>
//             <span className="text-center">Date Delivered</span>
//           </div>
//         </div>

//         {/* HEADERS */}
//         <div className="flex gap-1 mt-4 font-semibold">
//           <p className="bg-amber-400 py-1 w-[60px] text-center">Qty</p>
//           <p className="bg-amber-400 py-1 w-[70px] text-center">Unit</p>
//           <p className="bg-amber-400 py-1 w-[225px] text-center">Articles</p>
//           <p className="bg-amber-400 py-1 w-[90px] text-center">Price</p>
//           <p className="bg-amber-400 py-1 w-[110px] text-center">Amount</p>
//         </div>

//         {/* ITEMS */}
//         <div>
//           {receiptData.items.map((item, index) => (
//             <div key={index} className="flex gap-1 mt-2">
//               <p className="text-center border w-[60px]">{item.quantity}</p>
//               <p className="text-center border w-[70px]">{item.unit}</p>
//               <p className="text-center border w-[225px]">{item.article}</p>
//               <p className="text-center border w-[90px]">
//                 {currency}
//                 {item.unitPrice}
//               </p>
//               <p className="text-center border w-[110px]">
//                 {currency}
//                 {item.totalAmount}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="w-full mt-4 px-4">
//           {[...Array(3)].map((_, i) => (
//             <hr key={i} className="mt-0.5 text-amber-400" />
//           ))}
//           <hr className="mt-1" />
//         </div>

//         {/* SUMMARY */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-full px-4">
//           <div className="bg-amber-200 text-center py-2">
//             <p>{receiptData.totalKilograms}</p>
//             <span>Items Total Kilograms</span>
//           </div>
//           <div className="bg-amber-300 text-center py-2">
//             <p>{receiptData.totalItems}</p>
//             <span>Total Item Class</span>
//           </div>
//           <div className="bg-amber-300 text-center py-2">
//             <p>{receiptData.totalQuantity}</p>
//             <span>Total Quantity</span>
//           </div>
//           <div className="bg-amber-400 text-center py-2">
//             <p>
//               {currency}
//               {receiptData.totalAmount}
//             </p>
//             <span>Total Amount</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryReceipt;

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';

// const DeliveryReceipt = () => {
//   const { receiptId } = useParams();
//   const [receiptData, setReceiptData] = useState(null);
//   const { receipts, currency } = useContext(PriceContext);

//   // Use find instead of map
//   const fetchReceiptData = () => {
//     const found = receipts.find((item) => item._id === receiptId);
//     if (found) {
//       setReceiptData(found);
//     }
//   };

//   useEffect(() => {
//     if (!receipts || receipts.length === 0) return;
//     fetchReceiptData();
//   }, [receiptId, receipts]);

//   return receiptData ? (
//     <div className="flex justify-center items-center p-1 transition-opacity ease-in duration-500 opacity-100">
//       <div className="flex flex-col items-center bg-amber-50 lg:w-180 md:w-130 sm:w-95 shadow-2xl rounded pb-10">
//         {/* Heading */}
//         <div className="flex-1">
//           <hr className="mt-10" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25" />
//           <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1">
//             DELIVERY RECEIPT
//           </h1>
//           <hr className="mt-1" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 mb-2" />
//         </div>

//         {/* Supplier Info */}
//         <div className="flex gap-1 pt-1">
//           <div className="flex flex-col justify-center">
//             <p className="bg-slate-200 py-1 px-15">
//               {receiptData.supplierName}
//             </p>
//             <span className="text-center hidden md:block">Supplier Name</span>
//             <p className="bg-slate-200 py-1 px-15 text-center">
//               {receiptData.status}
//             </p>
//             <span className="text-center hidden md:block">Status</span>
//           </div>

//           <div className="flex flex-col justify-center">
//             <p className="bg-slate-200 py-1 px-15">
//               <span className="hidden md:inline"> No .</span>
//               {receiptData.receiptNumber}
//             </p>
//             <span className="text-center hidden md:block">O.R. Number</span>

//             <p className="bg-slate-200 py-1 px-15 sm:text-xs">
//               {/* Mobile Format */}
//               <span className="inline md:hidden">
//                 {new Date(receiptData.deliveryDate)
//                   .toLocaleDateString('en-GB')
//                   .split('/')
//                   .map((v, i) => (i === 2 ? v.slice(2) : v))
//                   .join('/')}
//               </span>
//               {/* Desktop Format */}
//               <span className="hidden md:inline">
//                 {new Date(receiptData.deliveryDate).toISOString().slice(0, 10)}
//               </span>
//             </p>
//             <span className="text-center hidden md:block">Date Delivered</span>
//           </div>
//         </div>

//         {/* Table Header */}
//         <div className="flex gap-1 mt-0.5">
//           <p className="bg-amber-400 py-1 px-4 w-[40px] text-center">Q</p>
//           <p className="bg-amber-400 py-1 px-4 w-[40px] text-center">U</p>
//           <p className="bg-amber-400 py-1 px-4 w-[160px] sm:w-[120px] md:w-[160px] lg:w-[160px] text-center">
//             Articles
//           </p>
//           <p className="bg-amber-400 py-1 px-4 w-[90px] sm:w-[60px] md:w-[90px] lg:w-[90px] text-center">
//             U/P
//           </p>
//           <p className="bg-amber-400 py-1 px-4 w-[100px] sm:w-[60px] md:w-[100px] lg:w-[100px] text-center">
//             Amt
//           </p>
//         </div>

//         {/* Items */}
//         <div>
//           {Array.isArray(receiptData.items) &&
//             receiptData.items.map((item, index) => (
//               <div key={index} className="flex gap-1 mt-2">
//                 <p className="text-center border w-[40px]">{item.quantity}</p>
//                 <p className="text-center border w-[40px]">{item.unit}</p>
//                 <p className="text-center border w-[160px] sm:w-[120px] md:w-[160px] lg:w-[160px]">
//                   {item.article}
//                 </p>
//                 <p className="text-center border w-[80px] sm:w-[60px] md:w-[90px] lg:w-[90px]">
//                   <span className="hidden md:inline">{currency} </span>
//                   {Math.floor(item.unitPrice)}
//                   <span className="hidden md:inline">
//                     .{item.unitPrice.toFixed(2).split('.')[1]}
//                   </span>
//                 </p>
//                 <p className="text-center border w-[100px] sm:w-[60px] md:w-[100px] lg:w-[100px]">
//                   <span className="hidden md:inline">{currency} </span>
//                   {Math.floor(item.totalAmount)}
//                   <span className="hidden md:inline">
//                     .{item.totalAmount.toFixed(2).split('.')[1]}
//                   </span>
//                 </p>
//               </div>
//             ))}
//           <hr className="mt-1 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-1" />
//         </div>

//         {/* Totals Summary */}
//         <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-1 mt-1 sm:w-[80%] lg:w-[65%]">
//           <div className="bg-amber-200 flex justify-center flex-col py-1 px-1">
//             <p className="text-center">{receiptData.totalKilograms}</p>
//             <span className="text-center">Items Total Kilograms</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-1 px-1">
//             <p className="text-center">{receiptData.totalItems}</p>
//             <span className="text-center">Total Item Class</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-1 px-1">
//             <p className="text-center">{receiptData.totalQuantity}</p>
//             <span className="text-center">Total Quantity</span>
//           </div>
//           <div className="bg-amber-400 flex justify-center flex-col py-1 px-1">
//             <p className="text-center">
//               {currency}
//               {Number(receiptData.totalAmount || 0).toFixed(2)}
//             </p>
//             <span className="text-center">Total Amount</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default DeliveryReceipt;

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';

// const DeliveryReceipt = () => {
//   const { receiptId } = useParams();
//   const [receiptData, setReceiptData] = useState(null);
//   const { receipts, currency } = useContext(PriceContext);

//   useEffect(() => {
//     if (!receipts || receipts.length === 0) return;

//     const found = receipts.find((item) => item._id === receiptId);
//     if (found) {
//       setReceiptData(found);
//     } else {
//       setReceiptData(null); // Optional: Handle not-found
//     }
//   }, [receiptId, receipts]);

//   if (!receiptData) {
//     return (
//       <div className="text-center py-10 text-gray-500 text-sm italic">
//         Loading receipt or not found.
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center p-1 transition-opacity ease-in duration-500 opacity-100">
//       <div className="flex flex-col items-center bg-amber-50 lg:w-180 md:w-130 sm:w-95 shadow-2xl rounded pb-10">
//         {/* Header */}
//         <div className="flex-1">
//           <hr className="mt-10" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25" />
//           <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1">
//             DELIVERY RECEIPT
//           </h1>
//           <hr className="mt-1" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 mb-2" />
//         </div>

//         {/* Supplier & Info */}
//         <div className="flex gap-1 pt-1">
//           <div className="flex flex-col justify-center">
//             <p className="bg-slate-200 py-1 px-15">
//               {receiptData.supplierName}
//             </p>
//             <span className="text-center hidden md:block">Supplier Name</span>
//             <p className="bg-slate-200 py-1 px-15 text-center">
//               {receiptData.status}
//             </p>
//             <span className="text-center hidden md:block">Status</span>
//           </div>

//           <div className="flex flex-col justify-center">
//             <p className="bg-slate-200 py-1 px-15">
//               <span className="hidden md:inline"> No .</span>
//               {receiptData.receiptNumber}
//             </p>
//             <span className="text-center hidden md:block">O.R. Number</span>
//             <p className="bg-slate-200 py-1 px-15 sm:text-xs">
//               {/* Mobile format: dd/mm/yy */}
//               <span className="inline md:hidden">
//                 {new Date(receiptData.deliveryDate)
//                   .toLocaleDateString('en-GB')
//                   .split('/')
//                   .map((v, i) => (i === 2 ? v.slice(2) : v))
//                   .join('/')}
//               </span>
//               {/* Desktop format: yyyy-mm-dd */}
//               <span className="hidden md:inline">
//                 {new Date(receiptData.deliveryDate).toISOString().slice(0, 10)}
//               </span>
//             </p>
//             <span className="text-center hidden md:block">Date Delivered</span>
//           </div>
//         </div>

//         {/* Table Header */}
//         <div className="flex gap-1 mt-0.5">
//           <p className="bg-amber-400 py-1 px-4 w-[40px] text-center">Q</p>
//           <p className="bg-amber-400 py-1 px-4 w-[40px] text-center">U</p>
//           <p className="bg-amber-400 py-1 px-4 w-[160px] sm:w-[120px] md:w-[160px] lg:w-[160px] text-center">
//             Articles
//           </p>
//           <p className="bg-amber-400 py-1 px-4 w-[90px] sm:w-[60px] md:w-[90px] lg:w-[90px] text-center">
//             U/P
//           </p>
//           <p className="bg-amber-400 py-1 px-4 w-[100px] sm:w-[60px] md:w-[100px] lg:w-[100px] text-center">
//             Amt
//           </p>
//         </div>

//         {/* Items List */}
//         <div>
//           {receiptData.items?.map((item, index) => (
//             <div key={index} className="flex gap-1 mt-2">
//               <p className="text-center border w-[40px]">{item.quantity}</p>
//               <p className="text-center border w-[40px]">{item.unit}</p>
//               <p className="text-center border w-[160px] sm:w-[120px] md:w-[160px] lg:w-[160px]">
//                 {item.article}
//               </p>
//               <p className="text-center border w-[80px] sm:w-[60px] md:w-[90px] lg:w-[90px]">
//                 <span className="hidden md:inline">{currency} </span>
//                 {Math.floor(item.unitPrice)}
//                 <span className="hidden md:inline">
//                   .{item.unitPrice.toFixed(2).split('.')[1]}
//                 </span>
//               </p>
//               <p className="text-center border w-[100px] sm:w-[60px] md:w-[100px] lg:w-[100px]">
//                 <span className="hidden md:inline">{currency} </span>
//                 {Math.floor(item.totalAmount)}
//                 <span className="hidden md:inline">
//                   .{item.totalAmount.toFixed(2).split('.')[1]}
//                 </span>
//               </p>
//             </div>
//           ))}
//           <hr className="mt-1 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-1" />
//         </div>

//         {/* Summary Section */}
//         <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-1 mt-1 sm:w-[80%] lg:w-[65%]">
//           <div className="bg-amber-200 flex justify-center flex-col py-1 px-1">
//             <p className="text-center">{receiptData.totalKilograms}</p>
//             <span className="text-center">Items Total Kilograms</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-1 px-1">
//             <p className="text-center">{receiptData.totalItems}</p>
//             <span className="text-center">Total Item Class</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-1 px-1">
//             <p className="text-center">{receiptData.totalQuantity}</p>
//             <span className="text-center">Total Quantity</span>
//           </div>
//           <div className="bg-amber-400 flex justify-center flex-col py-1 px-1">
//             <p className="text-center">
//               {currency}
//               {receiptData.totalAmount}
//             </p>
//             <span className="text-center">Total Amount</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryReceipt;

// The Original
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';
// // import { assets } from '../assets/assets';

// const DeliveryReceipt = () => {
//   const { receiptId } = useParams();
//   const [receiptData, setReceiptData] = useState(false);
//   const { receipts, currency } = useContext(PriceContext);

//   const fetchReceiptData = async () => {
//     receipts.map((item) => {
//       if (item._id === receiptId) {
//         setReceiptData(item);
//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchReceiptData();
//   }, [receiptId]);

//   // const quatityTotal = receiptData.deliveryItems.reduce(
//   //   (sum, Item) => sum + receiptData.deliveryItems.quantity,
//   //   0
//   // );

//   return receiptData ? (
//     <div className="flex justify-center items-center  p-1 transition-opacity ease-in duration-500 opacity-100 ">
//       {/* --------------- Product Data --------------------------------------------- */}
//       <div className="flex flex-col items-center bg-amber-50 lg:w-180 md:w-130 sm:w-95  shadow-2xl rounded pb-10 ">
//         <div className="flex-1">
//           <hr className="mt-10" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25" />
//           <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1 ">
//             DELIVERY RECEIPT
//           </h1>
//           <hr className="mt-1" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25  mb-2  " />
//         </div>
//         <div className="flex gap-1 pt-1">
//           <div className="flex flex-col justify-center">
//             <hr className="mt-0.25  mb-0.5  " />
//             <p className="bg-slate-200 py-1 px-15">
//               {receiptData.supplierName}
//             </p>
//             <span className="text-center hidden  md:block ">Supplier Name</span>
//             <p className="bg-slate-200 py-1 px-15 text-center ">
//               {receiptData.status}
//             </p>
//             <span className="text-center hidden  md:block">Status</span>
//             <hr className="mt-0.25  mb-0.5  " />
//           </div>
//           <div className="flex flex-col justify-center">
//             <hr className="mt-0.25  mb-0.5  " />
//             <p className="bg-slate-200 py-1 px-15">
//               <span className="hidden md:inline"> No .</span>
//               {receiptData.receiptNumber}
//             </p>
//             <span className="text-center hidden  md:block">O.R. Number</span>
//             <p className="bg-slate-200 py-1 px-15 sm:text-xs">
//               {/* Mobile: dd/mm/yy (03/07/25) */}
//               <span className="inline md:hidden">
//                 {new Date(receiptData.deliveryDate)
//                   .toLocaleDateString('en-GB')
//                   .split('/')
//                   .map((v, i) => (i === 2 ? v.slice(2) : v))
//                   .join('/')}
//               </span>
//               {/* Tablet and up: yyyy-mm-dd (2025-07-03) */}
//               <span className="hidden md:inline">
//                 {new Date(receiptData.deliveryDate).toISOString().slice(0, 10)}
//               </span>
//             </p>
//             <span className="text-center hidden  md:block">Date Delivered</span>
//             <hr className="mt-0.25  mb-0.5  " />
//           </div>
//         </div>
//         {/* Product record Count */}
//         <div className="flex gap-1 mt-0.5">
//           <p className="bg-amber-400 py-1 px-4 w-[40px] text-center ">Q</p>
//           <p className="bg-amber-400 py-1 px-4  w-[40px] text-center">U</p>
//           <p className="bg-amber-400 py-1 px-4  w-[160px] sm:w-[120px]  md:w-[160px] lg:w-[160px] text-center">
//             Articles
//           </p>
//           <p className="bg-amber-400 py-1 px-4  w-[90px]  text-center sm:w-[60px] md:w-[90px]  lg:w-[90px] ">
//             U/P
//           </p>

//           <p className="bg-amber-400 py-1 px-4  w-[100px] sm:w-[60px]  md:w-[100px] lg:w-[100px] text-center">
//             Amt
//           </p>
//         </div>
//         <div>
//           {receiptData.items.map((item, index) => (
//             <div key={index} className=" flex gap-1 mt-2">
//               <p className="text-center border w-[40px] ">{item.quantity}</p>
//               <p className="text-center border w-[40px]">{item.unit}</p>
//               <p className="text-center border w-[160px] sm:w-[120px]  md:w-[160px] lg:w-[160px]">
//                 {item.article}
//               </p>
//               <p className="text-center border w-[80px] sm:w-[60px]  md:w-[90px] lg:w-[90px]">
//                 <span className="hidden md:inline">{currency} </span>
//                 {Math.floor(item.unitPrice)}
//                 <span className="hidden md:inline">
//                   .{item.unitPrice.toFixed(2).split('.')[1]}
//                 </span>
//               </p>
//               <p className="text-center border w-[100px] sm:w-[60px] md:w-[100px] lg:w-[100px]">
//                 <span className="hidden md:inline">{currency} </span>
//                 {Math.floor(item.totalAmount)}
//                 <span className="hidden md:inline">
//                   .{item.totalAmount.toFixed(2).split('.')[1]}
//                 </span>
//               </p>
//             </div>
//           ))}
//           <hr className="mt-1 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-1" />
//         </div>
//         <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-1 mt-1  sm:w-[80%] lg:w-[65%]">
//           <div className="bg-amber-200 flex justify-center flex-col py-1 px-1 ">
//             <p className="text-center ">{receiptData.totalKilograms}</p>
//             <span className="text-center">Items Total Kilograms</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-1 px-1 ">
//             <p className="text-center">{receiptData.totalItems}</p>
//             <span className="text-center">Total Item Class</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-1 px-1">
//             <p className="text-center">{receiptData.totalQuantity}</p>
//             <span className="text-center">Total Quantity</span>
//           </div>
//           <div className="bg-amber-400 flex justify-center flex-col py-1 px-1">
//             <p className="text-center ">
//               {currency}
//               {(receiptData.totalAmount || 0).toFixed(2)}
//             </p>
//             <span className="text-center">Total Amount</span>
//           </div>
//         </div>
//       </div>
//       {/* ---------Description & Review Section --------------- */}
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default DeliveryReceipt;

// Revised Code for responsive

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';

// const DeliveryReceipt = () => {
//   const { receiptId } = useParams();
//   const { receipts, currency } = useContext(PriceContext);
//   const [receiptData, setReceiptData] = useState(false);

//   const fetchReceiptData = async () => {
//     receipts.map((item) => {
//       if (item._id === receiptId) {
//         setReceiptData(item);
//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchReceiptData();
//   }, [receiptId]);

//   return receiptData ? (
//     <div className="flex justify-center items-center p-2 w-full overflow-x-hidden">
//       <div className="flex flex-col items-center bg-amber-50 w-full max-w-[700px] shadow-md rounded pb-10 text-[10px] sm:text-xs">
//         {/* Header */}
//         <div className="w-full px-2">
//           <hr className="mt-4" />
//           <hr className="mt-0.5 text-amber-400" />
//           <hr className="mt-0.5 text-amber-400" />
//           <hr className="mt-0.5 text-amber-400" />
//           <hr className="mt-0.5" />
//           <h1 className="text-center font-bold mt-2 text-xs sm:text-sm md:text-base">
//             DELIVERY RECEIPT
//           </h1>
//           <hr className="mt-1" />
//           <hr className="mt-0.5 text-amber-400" />
//           <hr className="mt-0.5 text-amber-400" />
//           <hr className="mt-0.5 text-amber-400" />
//           <hr className="mt-0.5 mb-2" />
//         </div>

//         {/* Supplier and Details */}
//         <div className="flex flex-col sm:flex-row gap-4 px-2">
//           <div className="flex flex-col items-center">
//             <p className="bg-slate-200 py-1 px-8 w-full text-center">
//               {receiptData.supplierName}
//             </p>
//             <span className="text-center">Supplier Name</span>
//             <p className="bg-slate-200 py-1 px-8 w-full text-center">
//               {receiptData.status}
//             </p>
//             <span className="text-center">Status</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <p className="bg-slate-200 py-1 px-8 w-full text-center">
//               No. {receiptData.receiptNumber}
//             </p>
//             <span className="text-center">O.R. Number</span>
//             <p className="bg-slate-200 py-1 px-8 w-full text-center">
//               {receiptData.deliveryDate}
//             </p>
//             <span className="text-center">Date Delivered</span>
//           </div>
//         </div>

//         {/* Items Table */}
//         <div className="w-full overflow-x-auto mt-4 px-2">
//           <div className="flex gap-1 min-w-[500px]">
//             <p className="bg-amber-400 py-1 px-2 w-[60px] text-center">Qty</p>
//             <p className="bg-amber-400 py-1 px-2 w-[60px] text-center">Unit</p>
//             <p className="bg-amber-400 py-1 px-2 w-[150px] text-center">
//               Articles
//             </p>
//             <p className="bg-amber-400 py-1 px-2 w-[70px] text-center">Price</p>
//             <p className="bg-amber-400 py-1 px-2 w-[80px] text-center">
//               Amount
//             </p>
//           </div>

//           {receiptData.items.map((item, index) => (
//             <div key={index} className="flex gap-1 min-w-[500px] mt-1">
//               <p className="border w-[60px] text-center">{item.quantity}</p>
//               <p className="border w-[60px] text-center">{item.unit}</p>
//               <p className="border w-[150px] text-center">{item.article}</p>
//               <p className="border w-[70px] text-center">
//                 {currency}
//                 {item.unitPrice.toFixed(2)}
//               </p>
//               <p className="border w-[80px] text-center">
//                 {currency}
//                 {item.totalAmount.toFixed(2)}
//               </p>
//             </div>
//           ))}

//           <hr className="mt-2 text-amber-400" />
//           <hr className="mt-0.5 text-amber-400" />
//           <hr className="mt-0.5 text-amber-400" />
//           <hr className="mt-0.5" />
//         </div>

//         {/* Summary */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 w-full px-2">
//           <div className="bg-amber-200 flex justify-center flex-col py-2 px-4 text-center">
//             <p>{receiptData.totalKilograms}</p>
//             <span>Items Total Kilograms</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-2 px-4 text-center">
//             <p>{receiptData.totalItems}</p>
//             <span>Total Item Class</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-2 px-4 text-center">
//             <p>{receiptData.totalQuantity}</p>
//             <span>Total Quantity</span>
//           </div>
//           <div className="bg-amber-400 flex justify-center flex-col py-2 px-4 text-center col-span-1 sm:col-span-2 lg:col-span-1">
//             <p>
//               {currency}
//               {receiptData.totalAmount.toFixed(2)}
//             </p>
//             <span>Total Amount</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="text-center text-sm py-10">Loading receipt...</div>
//   );
// };

// export default DeliveryReceipt;

// Original Code

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';
// // import { assets } from '../assets/assets';

// const DeliveryReceipt = () => {
//   const { receiptId } = useParams();
//   const { receipts, currency } = useContext(PriceContext);
//   const [receiptData, setReceiptData] = useState(false);

//   const fetchReceiptData = async () => {
//     receipts.map((item) => {
//       if (item._id === receiptId) {
//         setReceiptData(item);
//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchReceiptData();
//   }, [receiptId]);

//   // const totalQuantity = receiptData.deliveryItems.reduce(
//   //   (sum, Item) => sum + receiptData.deliveryItems.quantity,
//   //   0
//   // );

//   return receiptData ? (
//     <div className="flex justify-center items-center  p-1 transition-opacity ease-in duration-500 opacity-100 ">
//       {/* --------------- Product Data --------------------------------------------- */}
//       <div className="flex flex-col items-center bg-amber-50 lg:w-180 md:w-130 sm:w-95  shadow-2xl rounded pb-10 ">
//         <div className="flex-1">
//           <hr className="mt-10" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25" />
//           <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl mt-1 ">
//             DELIVERY RECEIPT
//           </h1>
//           <hr className="mt-1" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25  mb-2  " />
//         </div>
//         <div className="flex gap-5 pt-4 ">
//           <div className="flex flex-col justify-center">
//             <hr className="mt-0.25  mb-0.5  " />
//             <p className="bg-slate-200 py-1 px-20 sm:text-">
//               {receiptData.supplierName}
//             </p>
//             <span className="text-center">Supplier Name</span>
//             <p className="bg-slate-200 py-1 px-20 text-center ">
//               {receiptData.status}
//             </p>
//             <span className="text-center">Status</span>
//             <hr className="mt-0.25  mb-0.5  " />
//           </div>
//           <div className="flex flex-col justify-center">
//             <hr className="mt-0.25  mb-0.5  " />
//             <p className="bg-slate-200 py-1 px-20">
//               No . {receiptData.receiptNumber}
//             </p>
//             <span className="text-center">O.R. Number</span>
//             <p className="bg-slate-200 py-1 px-20">
//               {receiptData.deliveryDate}
//             </p>
//             <span className="text-center">Date Delivered</span>
//             <hr className="mt-0.25  mb-0.5  " />
//           </div>
//         </div>
//         {/* Product record Count */}
//         <div className="flex gap-1 mt-0.5">
//           <p className="bg-amber-400 py-1 px-4 w-[60px] text-center ">Qty</p>
//           <p className="bg-amber-400 py-1 px-4  w-[70px] text-center">Unit</p>
//           <p className="bg-amber-400 py-1 px-4  w-[225px] text-center">
//             Articles
//           </p>
//           <p className="bg-amber-400 py-1 px-4  w-[90px] text-center sm:w-[50px] sm:text-[16px] md:w-[80px] md:text-[20px] lg:w-[90px] lg:text-[10px]">
//             Price
//           </p>

//           <p className="bg-amber-400 py-1 px-4  w-[110px] text-center">
//             Amount
//           </p>
//         </div>
//         <div>
//           {receiptData.items.map((item, index) => (
//             <div key={index} className=" flex gap-1 mt-2">
//               <p className="text-center border w-[60px]">{item.quantity}</p>
//               <p className="text-center border w-[70px]">{item.unit}</p>
//               <p className="text-center border w-[225px]">{item.article}</p>
//               <p className="text-center border w-[90px]">
//                 {currency}
//                 {item.unitPrice}
//               </p>
//               <p className="text-center border w-[110px]">
//                 {currency}
//                 {item.totalAmount}
//               </p>
//             </div>
//           ))}
//           <hr className="mt-1 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-0.25 text-amber-400" />
//           <hr className="mt-1" />
//         </div>
//         <div className="grid grid-cols-3 gap-4 mt-4">
//           <div className="bg-amber-200 flex justify-center flex-col py-2 px-4">
//             <p className="text-center">{receiptData.totalKilograms}</p>
//             <span className="text-center">Items Total Kilograms</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-2 px-4">
//             <p className="text-center">{receiptData.totalItems}</p>
//             <span className="text-center">Total Item Class</span>
//           </div>
//           <div className="bg-amber-300 flex justify-center flex-col py-2 px-4">
//             <p className="text-center">{receiptData.totalQuantity}</p>
//             <span className="text-center">Total Quantity</span>
//           </div>
//           <div className="bg-amber-400 flex justify-center flex-col py-2 px-4">
//             <p className="text-center ">
//               {currency}
//               {receiptData.totalAmount}
//             </p>
//             <span className="text-center">Total Amount</span>
//           </div>
//         </div>
//       </div>
//       {/* ---------Description & Review Section --------------- */}
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default DeliveryReceipt;
