import React from 'react';
import CreditStatus from '../../../admin/src/pages/CreditStatus.jsx';

const Credit = () => {
  const token = localStorage.getItem('token'); // or your context/auth logic

  return (
    <div>
      <CreditStatus token={token} viewOnly={true} />
    </div>
  );
};

export default Credit;

// import { useContext } from 'react';
// import { PriceContext } from '../context/PriceContext';

// const Credit = () => {
//   const { receipts, currency } = useContext(PriceContext);

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-GB');
//   };

//   const unpaidReceipts = receipts.filter((r) => r.status !== 'Paid');
//   const paidReceipts = receipts.filter((r) => r.status === 'Paid');

//   const totalReceiptAmount = receipts.reduce(
//     (sum, r) => sum + (+r.totalAmount || 0),
//     0
//   );
//   const totalUnpaid = unpaidReceipts.reduce(
//     (sum, r) => sum + (+r.totalAmount || 0),
//     0
//   );
//   const totalPaid = paidReceipts.reduce(
//     (sum, r) => sum + (+r.totalAmount || 0),
//     0
//   );

//   const renderReceiptRow = (item) => (
//     <div
//       key={item._id}
//       className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 py-2 border text-sm"
//     >
//       <p className="text-center">{item.supplierName}</p>
//       <p className="text-center">{item.receiptNumber}</p>
//       <p className="text-center">
//         {currency} {(+item.totalAmount).toFixed(2)}
//       </p>
//       <span
//         className={`text-sm font-semibold px-2 py-1 rounded-full text-white text-center w-full ${
//           item.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
//         }`}
//       >
//         {item.status}
//       </span>
//       <p className="text-center">{formatDate(item.deliveryDate)}</p>
//     </div>
//   );

//   return (
//     <div className="overflow-y-auto max-h-screen min-h-screen p-2 md:p-4">
//       <h2 className="text-lg md:text-xl font-bold mb-2 text-center border-2 md:border-4 border-cyan-400 bg-cyan-300 rounded">
//         Credit Status (Read-Only)
//       </h2>

//       <p className="text-center text-white bg-red-400 py-1 mb-3 rounded">
//         Total Unpaid Receipts: {unpaidReceipts.length}
//       </p>

//       <h3 className="text-base md:text-lg font-bold text-red-600 mb-1 text-center">
//         Unpaid Receipts
//       </h3>
//       <div className="overflow-x-auto">
//         {unpaidReceipts.map(renderReceiptRow)}
//       </div>

//       <p className="text-center text-white bg-red-400 py-1 mt-4 mb-4 rounded">
//         Total Unpaid Amount: {currency} {totalUnpaid.toFixed(2)}
//       </p>

//       <p className="text-center text-white bg-green-400 py-1 mb-3 rounded">
//         Total Paid Receipts: {paidReceipts.length}
//       </p>

//       <h3 className="text-base md:text-lg font-bold text-green-600 mt-4 mb-1 text-center">
//         Paid Receipts
//       </h3>
//       <div className="overflow-x-auto">
//         {paidReceipts.map(renderReceiptRow)}
//       </div>

//       <p className="text-center text-white bg-green-400 py-1 mt-4 rounded">
//         Total Paid Amount: {currency} {totalPaid.toFixed(2)}
//       </p>

//       <p className="text-center text-white bg-slate-500 py-1 mt-4 mb-1 rounded">
//         Total Amount: {currency} {totalReceiptAmount.toFixed(2)}
//       </p>
//       <p className="text-center text-white bg-slate-600 py-1 mb-3 rounded">
//         Total Receipts: {receipts.length}
//       </p>
//     </div>
//   );
// };

// export default Credit;
