import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const CreditStatus = ({ token, viewOnly = false }) => {
  const [receiptList, setReceiptList] = useState([]);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchReceiptList = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/receipt/receiptlist`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setReceiptList(response.data.receipts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeReceipt = async (_id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/receipt/remove`,
        { _id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchReceiptList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingReceipt(item._id);
    setEditData({ ...item });
  };

  const updateReceipt = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/receipt/update`,
        { id: editingReceipt, ...editData },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Receipt updated');
        setEditingReceipt(null);
        await fetchReceiptList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchReceiptList();
  }, []);

  const unpaidReceipts = receiptList.filter((r) => r.status !== 'Paid');
  const paidReceipts = receiptList.filter((r) => r.status === 'Paid');

  const totalReceiptAmount = receiptList.reduce(
    (sum, item) => sum + parseFloat(item.totalAmount || 0),
    0
  );
  const totalUnpaid = unpaidReceipts.reduce(
    (sum, item) => sum + parseFloat(item.totalAmount || 0),
    0
  );
  const totalPaid = paidReceipts.reduce(
    (sum, item) => sum + parseFloat(item.totalAmount || 0),
    0
  );

  const renderReceiptRow = (item) =>
    editingReceipt === item._id && !viewOnly ? (
      <div
        key={item._id}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 py-2 border items-center text-sm"
      >
        <input
          value={editData.supplierName}
          onChange={(e) =>
            setEditData({ ...editData, supplierName: e.target.value })
          }
          className="p-1 border rounded text-center w-full"
          disabled={viewOnly}
        />
        <input
          value={editData.receiptNumber}
          onChange={(e) =>
            setEditData({ ...editData, receiptNumber: e.target.value })
          }
          className="p-1 border rounded text-center w-full"
          disabled={viewOnly}
        />
        <input
          value={editData.totalAmount}
          onChange={(e) =>
            setEditData({ ...editData, totalAmount: e.target.value })
          }
          className="p-1 border rounded text-center w-full"
          disabled={viewOnly}
        />
        <select
          value={editData.status}
          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
          className="p-1 border rounded text-center w-full"
          disabled={viewOnly}
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select>
        <input
          type="date"
          value={editData.deliveryDate}
          onChange={(e) =>
            setEditData({ ...editData, deliveryDate: e.target.value })
          }
          className="p-1 border rounded text-center w-full"
          disabled={viewOnly}
        />
        <button
          onClick={updateReceipt}
          className="bg-green-500 text-white px-2 py-1 rounded w-full"
        >
          Save
        </button>
        <button
          onClick={() => setEditingReceipt(null)}
          className="bg-gray-500 text-white px-2 py-1 rounded w-full"
        >
          Cancel
        </button>
      </div>
    ) : (
      <div
        key={item._id}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 py-2 border items-center text-sm"
      >
        <p className="text-center">{item.supplierName}</p>
        <p className="text-center">{item.receiptNumber}</p>
        <p className="text-center">
          {currency} {parseFloat(item.totalAmount).toFixed(2)}
        </p>
        <span
          className={`text-sm font-semibold px-2 py-1 rounded-full text-white text-center w-full ${
            item.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {item.status}
        </span>
        <p className="text-center">{item.deliveryDate}</p>
        {!viewOnly && (
          <>
            <button
              onClick={() => handleEdit(item)}
              className="text-blue-600 hover:underline w-full"
            >
              Edit
            </button>
            <button
              onClick={() => removeReceipt(item._id)}
              className="text-red-600 hover:underline w-full"
            >
              Delete
            </button>
          </>
        )}
      </div>
    );

  return (
    <div className="overflow-y-auto max-h-screen min-h-screen p-2 md:p-4">
      <h2 className="text-lg md:text-xl font-bold mb-2 text-center border-2 md:border-4 border-cyan-400 bg-cyan-300 rounded">
        All Delivery Receipts
      </h2>

      <p className="text-center text-white bg-red-400 py-1 mb-3 rounded">
        Total Unpaid Receipts: {unpaidReceipts.length}
      </p>

      <h3 className="text-base md:text-lg font-bold text-red-600 mb-1 text-center">
        Unpaid Receipts
      </h3>
      <div className="overflow-x-auto">
        {unpaidReceipts.map(renderReceiptRow)}
      </div>

      <p className="text-center text-white bg-red-400 py-1 mt-4 mb-4 rounded">
        Total Unpaid Amount: {currency} {totalUnpaid.toFixed(2)}
      </p>

      <p className="text-center text-white bg-green-400 py-1 mb-3 rounded">
        Total Paid Receipts: {paidReceipts.length}
      </p>

      <h3 className="text-base md:text-lg font-bold text-green-600 mt-4 mb-1 text-center">
        Paid Receipts
      </h3>
      <div className="overflow-x-auto">
        {paidReceipts.map(renderReceiptRow)}
      </div>

      <p className="text-center text-white bg-green-400 py-1 mt-4 rounded">
        Total Paid Amount: {currency} {totalPaid.toFixed(2)}
      </p>

      <p className="text-center text-white bg-slate-500 py-1 mt-4 mb-1 rounded">
        Total Amount: {currency} {totalReceiptAmount.toFixed(2)}
      </p>
      <p className="text-center text-white bg-slate-600 py-1 mb-3 rounded">
        Total Receipts: {receiptList.length}
      </p>
    </div>
  );
};

export default CreditStatus;

//  Revised Responsive Bellow here

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const CreditStatus = ({ token }) => {
//   const [receiptList, setReceiptList] = useState([]);
//   const [editingReceipt, setEditingReceipt] = useState(null);
//   const [editData, setEditData] = useState({});

//   const fetchReceiptList = async () => {
//     try {
//       const response = await axios.get(
//         `${backendUrl}/api/receipt/receiptlist`,
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         setReceiptList(response.data.receipts);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const removeReceipt = async (_id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/receipt/remove`,
//         { _id },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingReceipt(item._id);
//     setEditData({ ...item });
//   };

//   const updateReceipt = async () => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/receipt/update`,
//         { id: editingReceipt, ...editData },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success('Receipt updated');
//         setEditingReceipt(null);
//         await fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchReceiptList();
//   }, []);

//   const unpaidReceipts = receiptList.filter((r) => r.status !== 'Paid');
//   const paidReceipts = receiptList.filter((r) => r.status === 'Paid');

//   const totalReceiptAmount = receiptList.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );
//   const totalUnpaid = unpaidReceipts.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );
//   const totalPaid = paidReceipts.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );

//   const renderReceiptRow = (item) =>
//     editingReceipt === item._id ? (
//       <div
//         key={item._id}
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 py-2 border items-center text-sm"
//       >
//         <input
//           value={editData.supplierName}
//           onChange={(e) =>
//             setEditData({ ...editData, supplierName: e.target.value })
//           }
//           className="p-1 border rounded text-center w-full"
//         />
//         <input
//           value={editData.receiptNumber}
//           onChange={(e) =>
//             setEditData({ ...editData, receiptNumber: e.target.value })
//           }
//           className="p-1 border rounded text-center w-full"
//         />
//         <input
//           value={editData.totalAmount}
//           onChange={(e) =>
//             setEditData({ ...editData, totalAmount: e.target.value })
//           }
//           className="p-1 border rounded text-center w-full"
//         />
//         <select
//           value={editData.status}
//           onChange={(e) => setEditData({ ...editData, status: e.target.value })}
//           className="p-1 border rounded text-center w-full"
//         >
//           <option value="Unpaid">Unpaid</option>
//           <option value="Paid">Paid</option>
//         </select>
//         <input
//           type="date"
//           value={editData.deliveryDate}
//           onChange={(e) =>
//             setEditData({ ...editData, deliveryDate: e.target.value })
//           }
//           className="p-1 border rounded text-center w-full"
//         />
//         <button
//           onClick={updateReceipt}
//           className="bg-green-500 text-white px-2 py-1 rounded w-full"
//         >
//           Save
//         </button>
//         <button
//           onClick={() => setEditingReceipt(null)}
//           className="bg-gray-500 text-white px-2 py-1 rounded w-full"
//         >
//           Cancel
//         </button>
//       </div>
//     ) : (
//       <div
//         key={item._id}
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 py-2 border items-center text-sm"
//       >
//         <p className="text-center">{item.supplierName}</p>
//         <p className="text-center">{item.receiptNumber}</p>
//         <p className="text-center">
//           {currency} {parseFloat(item.totalAmount).toFixed(2)}
//         </p>
//         <span
//           className={`text-sm font-semibold px-2 py-1 rounded-full text-white text-center w-full ${
//             item.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
//           }`}
//         >
//           {item.status}
//         </span>
//         <p className="text-center">{item.deliveryDate}</p>
//         <button
//           onClick={() => handleEdit(item)}
//           className="text-blue-600 hover:underline w-full"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => removeReceipt(item._id)}
//           className="text-red-600 hover:underline w-full"
//         >
//           Delete
//         </button>
//       </div>
//     );

//   return (
//     <div className="p-2 md:p-4">
//       <h2 className="text-lg md:text-xl font-bold mb-2 text-center border-2 md:border-4 border-cyan-400 bg-cyan-300 rounded">
//         All Delivery Receipts
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
//         Total Receipts: {receiptList.length}
//       </p>
//     </div>
//   );
// };

// export default CreditStatus;

// The original code bellow here

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const CreditStatus = ({ token }) => {
//   const [receiptList, setReceiptList] = useState([]);
//   const [editingReceipt, setEditingReceipt] = useState(null);
//   const [editData, setEditData] = useState({});

//   const fetchReceiptList = async () => {
//     try {
//       const response = await axios.get(
//         `${backendUrl}/api/receipt/receiptlist`,
//         {
//           headers: { token },
//         }
//       );
//       if (response.data.success) {
//         setReceiptList(response.data.receipts);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const removeReceipt = async (_id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/receipt/remove`,
//         { _id },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingReceipt(item._id);
//     setEditData({ ...item });
//   };

//   const updateReceipt = async () => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/receipt/update`,
//         { id: editingReceipt, ...editData },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success('Receipt updated');
//         setEditingReceipt(null);
//         await fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchReceiptList();
//   }, []);

//   const unpaidReceipts = receiptList.filter((r) => r.status !== 'Paid');
//   const paidReceipts = receiptList.filter((r) => r.status === 'Paid');

//   const totalReceiptAmount = receiptList.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );

//   const totalUnpaid = unpaidReceipts.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );

//   const totalPaid = paidReceipts.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );

//   const renderReceiptRow = (item) =>
//     editingReceipt === item._id ? (
//       <div
//         key={item._id}
//         className="grid grid-cols-7 gap-2 py-1 border text-sm"
//       >
//         <input
//           value={editData.supplierName}
//           onChange={(e) =>
//             setEditData({ ...editData, supplierName: e.target.value })
//           }
//           className="p-1 border rounded text-center"
//         />
//         <input
//           value={editData.receiptNumber}
//           onChange={(e) =>
//             setEditData({ ...editData, receiptNumber: e.target.value })
//           }
//           className="p-1 border rounded text-center"
//         />
//         <input
//           value={editData.totalAmount}
//           onChange={(e) =>
//             setEditData({ ...editData, totalAmount: e.target.value })
//           }
//           className="p-1 border rounded text-center"
//         />
//         <select
//           value={editData.status}
//           onChange={(e) => setEditData({ ...editData, status: e.target.value })}
//           className="p-1 border rounded text-center"
//         >
//           <option value="Unpaid">Unpaid</option>
//           <option value="Paid">Paid</option>
//         </select>
//         <input
//           type="date"
//           value={editData.deliveryDate}
//           onChange={(e) =>
//             setEditData({ ...editData, deliveryDate: e.target.value })
//           }
//           className="p-1 border rounded text-center"
//         />
//         <button
//           onClick={updateReceipt}
//           className="bg-green-500 text-white px-2 py-1 rounded"
//         >
//           Save
//         </button>
//         <button
//           onClick={() => setEditingReceipt(null)}
//           className="bg-gray-500 text-white px-2 py-1 rounded"
//         >
//           Cancel
//         </button>
//       </div>
//     ) : (
//       <div
//         key={item._id}
//         className="grid grid-cols-7 gap-2 py-1 border text-sm"
//       >
//         <p className="text-center">{item.supplierName}</p>
//         <p className="text-center">{item.receiptNumber}</p>
//         <p className="text-center">
//           {currency} {parseFloat(item.totalAmount).toFixed(2)}
//         </p>
//         <span
//           className={`text-sm font-semibold px-2 py-1 rounded-full text-white text-center ${
//             item.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
//           }`}
//         >
//           {item.status}
//         </span>
//         <p className="text-center">{item.deliveryDate}</p>
//         <button
//           onClick={() => handleEdit(item)}
//           className="text-blue-600 hover:underline"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => removeReceipt(item._id)}
//           className="text-red-600 hover:underline"
//         >
//           Delete
//         </button>
//       </div>
//     );

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2 border-4 text-center border-cyan-400 bg-cyan-300">
//         All Delivery Receipts
//       </h2>
//       <p className="text-center text-white bg-red-400 py-1 mb-3 ">
//         Total Unpaid Receipts: {unpaidReceipts.length}
//       </p>

//       <h3 className="text-lg font-bold text-red-600 mb-1 md:text-center sm:text-center">
//         Unpaid Receipts
//       </h3>
//       {unpaidReceipts.map(renderReceiptRow)}

//       <p className="text-center text-white bg-red-400 py-1 mt-4 mb-4">
//         Total Unpaid Amount: {currency} {totalUnpaid.toFixed(2)}
//       </p>

//       <p className="text-center text-white bg-green-400 py-1 mb-3">
//         Total Paid Receipts: {paidReceipts.length}
//       </p>
//       <h3 className="text-lg font-bold text-green-600 mt-4 mb-1 md:text-center sm:text-center">
//         Paid Receipts
//       </h3>
//       {paidReceipts.map(renderReceiptRow)}
//       <p className="text-center text-white bg-green-400 py-1 mt-4">
//         Total Paid Amount: {currency} {totalPaid.toFixed(2)}
//       </p>

//       <p className="text-center text-white bg-slate-500 py-1 mt-4 mb-1">
//         Total Amount: {currency} {totalReceiptAmount.toFixed(2)}
//       </p>
//       <p className="text-center text-white bg-slate-600 py-1 mb-3">
//         Total Receipts: {receiptList.length}
//       </p>
//     </div>
//   );
// };

// export default CreditStatus;
