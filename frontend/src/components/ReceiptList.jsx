import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PriceContext } from '../context/PriceContext';

const ReceiptList = ({
  id,
  supplierName,
  receiptNumber,
  deliveryDate,
  items,
  // totalAmount,
}) => {
  const { currency } = useContext(PriceContext);

  const totalAmount = Array.isArray(items)
    ? items.reduce((sum, item) => {
        const quantity = parseFloat(item.quantity);
        const unitPrice = parseFloat(item.unitPrice);
        const itemTotal =
          !isNaN(quantity) && !isNaN(unitPrice) ? quantity * unitPrice : 0;
        return sum + itemTotal;
      }, 0)
    : 0;

  const formattedAmount = totalAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Clean and format totalAmount
  // const cleanAmount =
  //   typeof totalAmount === 'string'
  //     ? totalAmount.replace(/,/g, '')
  //     : totalAmount;

  // const formattedAmount =
  //   !isNaN(Number(cleanAmount)) && cleanAmount !== null
  //     ? Number(cleanAmount).toLocaleString(undefined, {
  //         minimumFractionDigits: 2,
  //         maximumFractionDigits: 2,
  //       })
  //     : '0.00';

  return (
    <Link
      to={`/receipt/${id}`}
      className="block bg-slate-100 hover:bg-slate-200 border border-gray-300 rounded-lg shadow p-3 transition duration-200"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm sm:text-xs text-gray-700">
        {/* Supplier Name */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-500">Supplier Name</span>
          <span className="bg-amber-100 rounded px-2 py-1">
            {supplierName || 'N/A'}
          </span>
        </div>

        {/* Receipt Number */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-500">O.R. Number</span>
          <span className="bg-amber-200 rounded px-2 py-1">
            {receiptNumber || 'N/A'}
          </span>
        </div>

        {/* Delivery Date */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-500">Delivery Date</span>
          <span className="bg-amber-300 rounded px-2 py-1">
            {deliveryDate || 'N/A'}
          </span>
        </div>

        {/* Total Amount */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-500">Total Amount</span>
          <span className="bg-amber-400 rounded px-2 py-1">
            {currency}
            {/* {totalAmount || 'N/A'} */}
            {formattedAmount}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ReceiptList;

// import { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';

// const ReceiptList = ({
//   id,
//   supplierName,
//   receiptNumber,
//   deliveryDate,
//   totalAmount,
// }) => {
//   const { currency } = useContext(PriceContext);

//   totalAmount = quantity * unitPrice;

//   updatedItems[index] = item;

//   // Format total amount with fallback
//   // const formattedAmount = Number(totalAmount)
//   //   ? Number(totalAmount).toLocaleString(undefined, {
//   //       minimumFractionDigits: 2,
//   //       maximumFractionDigits: 2,
//   //     })
//   //   : '0.00';

//   const totalAmount = updatedItems.reduce(
//     (sum, item) => sum + (parseFloat(item.totalAmount) || 0),
//     0
//   );

//   return (
//     <Link
//       to={`/receipt/${id}`}
//       className="block bg-slate-100 hover:bg-slate-200 border border-gray-300 rounded-lg shadow p-3 transition duration-200"
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm sm:text-xs text-gray-700">
//         {/* Supplier Name */}
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-500">Supplier Name</span>
//           <span className="bg-amber-100 rounded px-2 py-1">{supplierName}</span>
//         </div>
//         {/* Receipt Number */}
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-500">O.R. Number</span>
//           <span className="bg-amber-200 rounded px-2 py-1">
//             {receiptNumber}
//           </span>
//         </div>
//         {/* Delivery Date */}
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-500">Delivery Date</span>
//           <span className="bg-amber-300 rounded px-2 py-1">{deliveryDate}</span>
//         </div>
//         {/* Total Amount */}
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-500">Total Amount</span>
//           <span className="bg-amber-400 rounded px-2 py-1">
//             {currency}
//             {totalAmount}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ReceiptList;

// Uphere replacement july 26, 2025

// Remove july 26, 2025

// import { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';

// const ReceiptList = ({
//   id,
//   supplierName,
//   receiptNumber,
//   deliveryDate,
//   totalAmount,
// }) => {
//   const { currency } = useContext(PriceContext);

//   return (
//     <Link
//       to={`/receipt/${id}`}
//       className="block bg-slate-100 hover:bg-slate-200 border border-gray-300 rounded-lg shadow p-3 transition duration-200"
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm sm:text-xs text-gray-700">
//         {/* Supplier Name */}
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-500">Supplier Name</span>
//           <span className="bg-amber-100 rounded px-2 py-1">{supplierName}</span>
//         </div>

//         {/* Receipt Number */}
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-500">O.R. Number</span>
//           <span className="bg-amber-200 rounded px-2 py-1">
//             {receiptNumber}
//           </span>
//         </div>

//         {/* Delivery Date */}
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-500">Delivery Date</span>
//           <span className="bg-amber-300 rounded px-2 py-1">{deliveryDate}</span>
//         </div>

//         {/* Total Amount */}
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-500">Total Amount</span>
//           <span className="bg-amber-400 rounded px-2 py-1">
//             {currency}
//             {totalAmount}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ReceiptList;

// Lates code uphere

// import { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { PriceContext } from '../context/PriceContext';

// const ReceiptList = ({
//   id,
//   supplierName,
//   receiptNumber,
//   deliveryDate,
//   totalAmount,
// }) => {
//   //
//   const { currency } = useContext(PriceContext);

//   return (
//     <Link
//       className="text-gray-700 cursor-pointer flex gap-x-2 "
//       to={`/receipt/${id}`}
//     >
//       <div className="bg-slate-200 flex gap-x-1 p-2 justify-center">
//         <h6 className="p-2 font-light hidden sm:block">Supplier Name :</h6>
//         <p className="pt-3 pb-1 text-sm p-2 bg-amber-100 sm:text-xs">
//           {supplierName}
//         </p>
//         <h6 className="p-2 font-light hidden sm:block">O.R. Number :</h6>
//         <p className="pt-2 pb-1 text-sm p-2 bg-amber-200 sm:text-xs">
//           {receiptNumber}
//         </p>
//         <h6 className="p-2 font-light hidden sm:block">Delivery Date :</h6>
//         <p className="pt-3 pb-1 text-sm p-2 bg-amber-300 sm:text-xs">
//           {deliveryDate}
//         </p>
//         <h6 className="p-2 font-light  hidden sm:block">Total Amount :</h6>
//         <p className="pt-3 pb-1 text-sm p-2 bg-amber-400 flex">
//           <span className=" hidden sm:block">{currency || '₱'}</span>
//           {totalAmount}
//         </p>
//       </div>
//     </Link>
//   );
// };

// export default ReceiptList;
