import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const ReceiptList = ({ token }) => {
  const [receiptList, setReceiptList] = useState([]);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchReceiptList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/receipt/receiptlist');
      if (response.data.success) {
        setReceiptList(response.data.receipts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeReceipt = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/receipt/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchReceiptList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingReceipt(item._id);
    setEditData({
      supplierName: item.supplierName,
      receiptNumber: item.receiptNumber,
      totalAmount: item.totalAmount,
      status: item.status,
      deliveryDate: item.deliveryDate,
    });
  };

  const updateReceipt = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/receipt/update',
        { id: editingReceipt, ...editData },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Receipt updated');
        setEditingReceipt(null);
        fetchReceiptList();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchReceiptList();
  }, []);

  const totalReceiptAmount = receiptList.reduce(
    (sum, item) => sum + parseFloat(item.totalAmount || 0),
    0
  );

  return (
    <div className="p-2 md:p-4 max-h-screen overflow-y-auto">
      <p className="mb-2 font-bold text-lg">All Delivery Receipts</p>

      <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border mb-1 py-1 border-white shadow-2xl">
        Total Number of Receipts: <span>{receiptList.length}</span>
      </p>

      <div className="flex flex-col gap-2 w-full">
        <div className="hidden md:grid grid-cols-7 items-center py-1 px-2 border bg-gray-100 text-sm">
          <b className="text-center">Supplier Name</b>
          <b className="text-center">Receipt Number</b>
          <b className="text-center">Total Amount</b>
          <b className="text-center">Status</b>
          <b className="text-center">Date Delivered</b>
          <b className="text-center">Edit</b>
          <b className="text-center">Action</b>
        </div>

        {receiptList.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-2 py-2 px-3 border text-sm rounded-md shadow-md ${
              item.status?.toLowerCase() === 'unpaid'
                ? 'bg-red-300'
                : item.status?.toLowerCase() === 'paid'
                ? 'bg-green-300'
                : 'bg-white'
            }`}
          >
            {editingReceipt === item._id ? (
              <>
                <input
                  value={editData.supplierName}
                  onChange={(e) =>
                    setEditData({ ...editData, supplierName: e.target.value })
                  }
                  className="p-1 border rounded text-center"
                />
                <input
                  value={editData.receiptNumber}
                  onChange={(e) =>
                    setEditData({ ...editData, receiptNumber: e.target.value })
                  }
                  className="p-1 border rounded text-center"
                />
                <input
                  value={editData.totalAmount}
                  onChange={(e) =>
                    setEditData({ ...editData, totalAmount: e.target.value })
                  }
                  className="p-1 border rounded text-center"
                />
                <input
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                  className="p-1 border rounded text-center"
                />
                <input
                  value={editData.deliveryDate}
                  onChange={(e) =>
                    setEditData({ ...editData, deliveryDate: e.target.value })
                  }
                  className="p-1 border rounded text-center"
                />
                <button
                  onClick={updateReceipt}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingReceipt(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="text-center">{item.supplierName}</p>
                <p className="text-center">{item.receiptNumber}</p>
                <p className="text-center">
                  <span className="hidden sm:inline">{currency} </span>
                  {item.totalAmount}
                </p>
                <p className="text-center">{item.status}</p>
                <p className="text-center">{item.deliveryDate}</p>
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline text-center"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeReceipt(item._id)}
                  className="text-red-600 hover:underline text-center"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border py-1 mt-2 border-white shadow-2xl">
        Receipts Total Amount:
        <span className="hidden sm:inline"> {currency}</span>{' '}
        {totalReceiptAmount.toFixed(2)}
      </p>
    </div>
  );
};

export default ReceiptList;

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const ReceiptList = ({ token }) => {
//   //
//   const [receiptList, setReceiptList] = useState([0]);
//   // May 12, 2025
//   const [editingReceipt, setEditingReceipt] = useState(null);
//   const [editData, setEditData] = useState({});

//   const fetchReceiptList = async () => {
//     try {
//       //
//       const response = await axios.get(backendUrl + '/api/receipt/receiptlist');
//       if (response.data.success) {
//         setReceiptList(response.data.receipts);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const removeReceipt = async (id) => {
//     try {
//       //prettier-ignore
//       const response = await axios.post(backendUrl + '/api/receipt/remove',{id}, { headers: { token } });
//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingReceipt(item._id);
//     setEditData({
//       supplierName: item.supplierName,
//       receiptNumber: item.receiptNumber,
//       totalAmount: item.totalAmount,
//       status: item.status,
//       deliveryDate: item.deliveryDate,
//     });
//   };

//   const updateReceipt = async () => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/receipt/update',
//         { id: editingReceipt, ...editData },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success('Receipt updated');
//         setEditingReceipt(null);
//         fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchReceiptList();
//   }, []);

//   // 🧮 Calculate total amount from all receipts
//   const totalReceiptAmount = receiptList.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );

//   return (
//     <>
//       <p className="mb-2 font-bold text-lg ">All Delivery Receipts </p>
//       <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border mb-1 py-1 border-white shadow-2xl ">
//         Total Number of Receipts :
//         <span className="text-white text-center"> {receiptList.length} </span>
//       </p>
//       <div className="flex flex-col gap-2">
//         {/* List Table Title */}
//         <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
//           <b className="text-center">Supplier Name</b>
//           <b className="text-center">Receipt Number</b>
//           <b className="text-center">Total Amount</b>
//           <b className="text-center">Status</b>
//           <b className="text-center">Date Delevered</b>
//           <b className="text-center">Edit Receipt</b>
//           <b className="text-center">Action</b>
//         </div>
//         {/* Product List */}

//         {receiptList.map((item, index) =>
//           editingReceipt === item._id ? (
//             <div
//               className={`grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm" ${
//                 item.status?.toLowerCase() === 'unpaid'
//                   ? 'bg-red-400'
//                   : item.status?.toLowerCase() === 'paid'
//                   ? 'bg-green-400'
//                   : ''
//               }`}
//               key={index}
//             >
//               <input
//                 value={editData.supplierName}
//                 onChange={(e) =>
//                   setEditData({ ...editData, supplierName: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />

//               <input
//                 value={editData.receiptNumber}
//                 onChange={(e) =>
//                   setEditData({ ...editData, receiptNumber: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.totalAmount}
//                 onChange={(e) =>
//                   setEditData({ ...editData, totalAmount: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.status}
//                 onChange={(e) =>
//                   setEditData({ ...editData, status: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.deliveryDate}
//                 onChange={(e) =>
//                   setEditData({ ...editData, deliveryDate: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <div className="flex gap-2 justify-center">
//                 <button
//                   onClick={updateReceipt}
//                   className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingReceipt(null)}
//                   className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div
//               className={`grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm ${
//                 item.status?.toLowerCase() === 'unpaid'
//                   ? 'bg-red-400'
//                   : item.status?.toLowerCase() === 'paid'
//                   ? 'bg-green-400'
//                   : ''
//               }`}
//               key={index}
//             >
//               {/* -------------------------------------------------------------------------------------------------------- */}
//               <p className="font-medium text-base bg-white px-1 py-0.5 text-center hover:bg-slate-300  hover:text-white">
//                 {item.supplierName}
//               </p>
//               <p className="font-medium text-base text-center hover:bg-slate-300  hover:text-white rounded py-0.5 border-1 border-black">
//                 {item.receiptNumber}
//               </p>
//               <p className="font-medium text-base bg-white px-1 py-0.5 text-center hover:bg-slate-300  hover:text-white">
//                 {item.totalAmount}
//               </p>
//               <p className="font-medium text-base text-center hover:bg-slate-300  hover:text-white py-0.5 rounded border-1 border-black">
//                 {item.status}
//               </p>
//               <p className="font-medium text-base bg-white px-1 py-0.5 text-center hover:bg-slate-300  hover:text-white ">
//                 {item.deliveryDate}
//               </p>

//               <p
//                 onClick={() => handleEdit(item)}
//                 className="cursor-pointer  hover:bg-slate-300  hover:text-white border-1 border-black  text-center text-gray-600  rounded font-medium text-base shadow-2xl py-0.5"
//               >
//                 Edit
//               </p>

//               <p
//                 onClick={() => removeReceipt(item._id)}
//                 className="rounded bg-blue-400 hover:bg-slate-300 hover:text-red-500 text-white md:text-center sm:text-center cursor-pointer text-lg border-1 shadow-md text-center"
//               >
//                 Delete
//               </p>
//             </div>
//           )
//         )}
//       </div>
//       <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border py-1 mt-1 border-white shadow-2xl ">
//         Receipts Total Amount :{' '}
//         <span className="text-white">
//           {currency} {totalReceiptAmount.toFixed(2)}
//         </span>
//       </p>
//     </>
//   );
// };

// export default ReceiptList;

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const ReceiptList = ({ token }) => {
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

//   const removeReceipt = async (id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/receipt/remove`,
//         { id },
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
//     // Format deliveryDate to YYYY-MM-DD for date input type
//     const formattedDate = item.deliveryDate
//       ? new Date(item.deliveryDate).toISOString().split('T')[0]
//       : '';
//     setEditData({
//       supplierName: item.supplierName,
//       receiptNumber: item.receiptNumber,
//       totalAmount: item.totalAmount,
//       status: item.status,
//       deliveryDate: formattedDate, // Use formatted date
//     });
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
//         fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const markAsPaid = async (id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/receipt/update`,
//         { id, status: 'Paid' },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success('Marked as paid');
//         fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchReceiptList();
//   }, [token]); // Added token to dependency array for clarity, though it's likely static

//   const unpaidReceipts = receiptList.filter((item) => item.status !== 'Paid');
//   const paidReceipts = receiptList.filter((item) => item.status === 'Paid');

//   const totalReceiptAmount = receiptList.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );

//   return (
//     <>
//       <p className="mb-2 font-bold text-lg">All Delivery Receipts</p>
//       <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border mb-1 py-1 border-white shadow-2xl">
//         Total Number of Receipts:
//         <span className="text-white text-center"> {receiptList.length} </span>
//       </p>

//       <div className="flex flex-col gap-2">
//         {/* Header Row */}
//         <div className="hidden md:grid grid-cols-[repeat(8,1fr)] items-center py-1 px-2 border bg-gray-100 text-sm font-bold">
//           <b className="text-center">Supplier</b>
//           <b className="text-center">Receipt #</b>
//           <b className="text-center">Amount</b>
//           <b className="text-center">Status</b>
//           <b className="text-center">Date Delivered</b>
//           <b className="text-center">Edit</b>
//           <b className="text-center">Delete</b>
//           <b className="text-center">Mark Paid</b>
//         </div>

//         {/* Unpaid Receipts */}
//         <p className="mt-2 font-semibold text-sm md:text-base text-left">
//           Unpaid Receipts
//         </p>
//         {unpaidReceipts.length === 0 && (
//           <p className="text-center text-gray-500">No unpaid receipts.</p>
//         )}

//         {unpaidReceipts.map((item) =>
//           editingReceipt === item._id ? (
//             <div
//               className="grid grid-cols-[repeat(8,1fr)] items-center gap-2 py-1 px-2 border text-sm"
//               key={item._id}
//             >
//               <input
//                 value={editData.supplierName}
//                 onChange={(e) =>
//                   setEditData({ ...editData, supplierName: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.receiptNumber}
//                 onChange={(e) =>
//                   setEditData({ ...editData, receiptNumber: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.totalAmount}
//                 onChange={(e) =>
//                   setEditData({ ...editData, totalAmount: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//                 type="number" // Suggesting number type for amount
//               />
//               <input
//                 value={editData.status}
//                 onChange={(e) =>
//                   setEditData({ ...editData, status: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.deliveryDate}
//                 onChange={(e) =>
//                   setEditData({ ...editData, deliveryDate: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//                 type="date" // Changed to date input type
//               />
//               <div className="flex gap-2 justify-center col-span-3">
//                 <button
//                   onClick={updateReceipt}
//                   className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingReceipt(null)}
//                   className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div
//               className="grid grid-cols-[repeat(8,1fr)] items-center gap-2 py-1 px-2 border text-sm"
//               key={item._id}
//             >
//               <p className="text-center">{item.supplierName}</p>
//               <p className="text-center">{item.receiptNumber}</p>
//               <p className="text-center">
//                 {currency} {parseFloat(item.totalAmount).toFixed(2)}
//               </p>
//               <p className="text-center">{item.status}</p>
//               <p className="text-center">{item.deliveryDate}</p>

//               <p
//                 onClick={() => handleEdit(item)}
//                 className="text-center text-blue-600 cursor-pointer"
//               >
//                 Edit
//               </p>
//               <p
//                 onClick={() => removeReceipt(item._id)}
//                 className="text-center text-red-500 cursor-pointer"
//               >
//                 Delete
//               </p>
//               <p
//                 onClick={() => markAsPaid(item._id)}
//                 className="text-center text-green-600 cursor-pointer"
//               >
//                 Mark Paid
//               </p>
//             </div>
//           )
//         )}

//         {/* Paid Receipts */}
//         <p className="mt-4 font-semibold text-sm md:text-base text-left">
//           Paid Receipts
//         </p>
//         {paidReceipts.length === 0 && (
//           <p className="text-center text-gray-500">No paid receipts.</p>
//         )}

//         {paidReceipts.map((item) => (
//           <div
//             className="grid grid-cols-[repeat(8,1fr)] items-center gap-2 py-1 px-2 border text-sm bg-green-50"
//             key={item._id}
//           >
//             <p className="text-center">{item.supplierName}</p>
//             <p className="text-center">{item.receiptNumber}</p>
//             <p className="text-center">
//               {currency} {parseFloat(item.totalAmount).toFixed(2)}
//             </p>
//             <p className="text-center text-green-700">{item.status}</p>
//             <p className="text-center">{item.deliveryDate}</p>
//             <p className="text-center text-gray-400">N/A</p>
//             <p
//               onClick={() => removeReceipt(item._id)}
//               className="text-center text-red-500 cursor-pointer"
//             >
//               Delete
//             </p>
//             <p className="text-center text-gray-400">✓ Paid</p>
//           </div>
//         ))}
//       </div>

//       <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border py-1 mt-2 border-white shadow-2xl">
//         Receipts Total Amount:{' '}
//         <span className="text-white">
//           {currency} {totalReceiptAmount.toFixed(2)}
//         </span>
//       </p>
//     </>
//   );
// };

// export default ReceiptList;

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const ReceiptList = ({ token }) => {
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

//   const removeReceipt = async (id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/receipt/remove`,
//         { id },
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
//     setEditData({
//       supplierName: item.supplierName,
//       receiptNumber: item.receiptNumber,
//       totalAmount: item.totalAmount,
//       status: item.status,
//       deliveryDate: item.deliveryDate,
//     });
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
//         fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const markAsPaid = async (id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/receipt/update`,
//         { id, status: 'Paid' },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success('Marked as paid');
//         fetchReceiptList();
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

//   const unpaidReceipts = receiptList.filter((item) => item.status !== 'Paid');
//   const paidReceipts = receiptList.filter((item) => item.status === 'Paid');

//   const totalReceiptAmount = receiptList.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );

//   return (
//     <>
//       <p className="mb-2 font-bold text-lg">All Delivery Receipts</p>
//       <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border mb-1 py-1 border-white shadow-2xl">
//         Total Number of Receipts:
//         <span className="text-white text-center"> {receiptList.length} </span>
//       </p>

//       <div className="flex flex-col gap-2">
//         {/* Header Row */}
//         <div className="hidden md:grid grid-cols-[repeat(8,1fr)] items-center py-1 px-2 border bg-gray-100 text-sm font-bold">
//           <b className="text-center">Supplier</b>
//           <b className="text-center">Receipt #</b>
//           <b className="text-center">Amount</b>
//           <b className="text-center">Status</b>
//           <b className="text-center">Date Delivered</b>
//           <b className="text-center">Edit</b>
//           <b className="text-center">Delete</b>
//           <b className="text-center">Mark Paid</b>
//         </div>

//         {/* Unpaid Receipts */}
//         <p className="mt-2 font-semibold text-sm md:text-base text-left">
//           Unpaid Receipts
//         </p>
//         {unpaidReceipts.length === 0 && (
//           <p className="text-center text-gray-500">No unpaid receipts.</p>
//         )}

//         {unpaidReceipts.map((item) =>
//           editingReceipt === item._id ? (
//             <div
//               className="grid grid-cols-[repeat(8,1fr)] items-center gap-2 py-1 px-2 border text-sm"
//               key={item._id}
//             >
//               <input
//                 value={editData.supplierName}
//                 onChange={(e) =>
//                   setEditData({ ...editData, supplierName: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.receiptNumber}
//                 onChange={(e) =>
//                   setEditData({ ...editData, receiptNumber: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.totalAmount}
//                 onChange={(e) =>
//                   setEditData({ ...editData, totalAmount: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.status}
//                 onChange={(e) =>
//                   setEditData({ ...editData, status: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.deliveryDate}
//                 onChange={(e) =>
//                   setEditData({ ...editData, deliveryDate: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <div className="flex gap-2 justify-center col-span-3">
//                 <button
//                   onClick={updateReceipt}
//                   className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingReceipt(null)}
//                   className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div
//               className="grid grid-cols-[repeat(8,1fr)] items-center gap-2 py-1 px-2 border text-sm"
//               key={item._id}
//             >
//               <p className="text-center">{item.supplierName}</p>
//               <p className="text-center">{item.receiptNumber}</p>
//               <p className="text-center">
//                 {currency} {parseFloat(item.totalAmount).toFixed(2)}
//               </p>
//               <p className="text-center">{item.status}</p>
//               <p className="text-center">{item.deliveryDate}</p>

//               <p
//                 onClick={() => handleEdit(item)}
//                 className="text-center text-blue-600 cursor-pointer"
//               >
//                 Edit
//               </p>
//               <p
//                 onClick={() => removeReceipt(item._id)}
//                 className="text-center text-red-500 cursor-pointer"
//               >
//                 Delete
//               </p>
//               <p
//                 onClick={() => markAsPaid(item._id)}
//                 className="text-center text-green-600 cursor-pointer"
//               >
//                 Mark Paid
//               </p>
//             </div>
//           )
//         )}

//         {/* Paid Receipts */}
//         <p className="mt-4 font-semibold text-sm md:text-base text-left">
//           Paid Receipts
//         </p>
//         {paidReceipts.length === 0 && (
//           <p className="text-center text-gray-500">No paid receipts.</p>
//         )}

//         {paidReceipts.map((item) => (
//           <div
//             className="grid grid-cols-[repeat(8,1fr)] items-center gap-2 py-1 px-2 border text-sm bg-green-50"
//             key={item._id}
//           >
//             <p className="text-center">{item.supplierName}</p>
//             <p className="text-center">{item.receiptNumber}</p>
//             <p className="text-center">
//               {currency} {parseFloat(item.totalAmount).toFixed(2)}
//             </p>
//             <p className="text-center text-green-700">{item.status}</p>
//             <p className="text-center">{item.deliveryDate}</p>
//             <p className="text-center text-gray-400">N/A</p>
//             <p
//               onClick={() => removeReceipt(item._id)}
//               className="text-center text-red-500 cursor-pointer"
//             >
//               Delete
//             </p>
//             <p className="text-center text-gray-400">✓ Paid</p>
//           </div>
//         ))}
//       </div>

//       <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border py-1 mt-2 border-white shadow-2xl">
//         Receipts Total Amount:{' '}
//         <span className="text-white">
//           {currency} {totalReceiptAmount.toFixed(2)}
//         </span>
//       </p>
//     </>
//   );
// };

// export default ReceiptList;

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const ReceiptList = ({ token }) => {
//   const [receiptList, setReceiptList] = useState([]);
//   const [editingReceipt, setEditingReceipt] = useState(null);
//   const [editData, setEditData] = useState({});

//   const fetchReceiptList = async () => {
//     try {
//       const response = await axios.get(
//         backendUrl + '/api/receipt/receiptlist',
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

//   const removeReceipt = async (id) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/receipt/remove',
//         { id },
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
//     setEditData({
//       supplierName: item.supplierName,
//       receiptNumber: item.receiptNumber,
//       totalAmount: item.totalAmount,
//       status: item.status,
//       deliveryDate: item.deliveryDate,
//     });
//   };

//   const updateReceipt = async () => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/receipt/update',
//         { id: editingReceipt, ...editData },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success('Receipt updated');
//         setEditingReceipt(null);
//         fetchReceiptList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const markAsPaid = async (id) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/receipt/update',
//         { id, status: 'Paid' },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success('Marked as paid');
//         fetchReceiptList();
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

//   const totalReceiptAmount = receiptList.reduce(
//     (sum, item) => sum + parseFloat(item.totalAmount || 0),
//     0
//   );

//   return (
//     <>
//       <p className="mb-2 font-bold text-lg">All Delivery Receipts</p>
//       <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border mb-1 py-1 border-white shadow-2xl">
//         Total Number of Receipts:
//         <span className="text-white text-center"> {receiptList.length} </span>
//       </p>

//       <div className="flex flex-col gap-2">
//         <div className="hidden md:grid grid-cols-[repeat(8,1fr)] items-center py-1 px-2 border bg-gray-100 text-sm font-bold">
//           <b className="text-center">Supplier</b>
//           <b className="text-center">Receipt #</b>
//           <b className="text-center">Amount</b>
//           <b className="text-center">Status</b>
//           <b className="text-center">Date Delivered</b>
//           <b className="text-center">Edit</b>
//           <b className="text-center">Delete</b>
//           <b className="text-center">Mark Paid</b>
//         </div>

//         {receiptList.map((item, index) =>
//           editingReceipt === item._id ? (
//             <div
//               className="grid grid-cols-[repeat(8,1fr)] items-center gap-2 py-1 px-2 border text-sm"
//               key={item._id}
//             >
//               <input
//                 value={editData.supplierName}
//                 onChange={(e) =>
//                   setEditData({ ...editData, supplierName: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.receiptNumber}
//                 onChange={(e) =>
//                   setEditData({ ...editData, receiptNumber: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.totalAmount}
//                 onChange={(e) =>
//                   setEditData({ ...editData, totalAmount: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.status}
//                 onChange={(e) =>
//                   setEditData({ ...editData, status: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <input
//                 value={editData.deliveryDate}
//                 onChange={(e) =>
//                   setEditData({ ...editData, deliveryDate: e.target.value })
//                 }
//                 className="p-1 border rounded text-center"
//               />
//               <div className="flex gap-2 justify-center col-span-3">
//                 <button
//                   onClick={updateReceipt}
//                   className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingReceipt(null)}
//                   className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div
//               className="grid grid-cols-[repeat(8,1fr)] items-center gap-2 py-1 px-2 border text-sm"
//               key={item._id}
//             >
//               <p className="text-center">{item.supplierName}</p>
//               <p className="text-center">{item.receiptNumber}</p>
//               <p className="text-center">
//                 {currency} {parseFloat(item.totalAmount).toFixed(2)}
//               </p>
//               <p className="text-center">{item.status}</p>
//               <p className="text-center">{item.deliveryDate}</p>

//               <p
//                 onClick={() => handleEdit(item)}
//                 className="text-center text-blue-600 cursor-pointer"
//               >
//                 Edit
//               </p>
//               <p
//                 onClick={() => removeReceipt(item._id)}
//                 className="text-center text-red-500 cursor-pointer"
//               >
//                 Delete
//               </p>
//               <p
//                 onClick={() => markAsPaid(item._id)}
//                 className={`text-center cursor-pointer ${
//                   item.status === 'Paid' ? 'text-gray-400' : 'text-green-600'
//                 }`}
//               >
//                 {item.status === 'Paid' ? '✓ Paid' : 'Mark Paid'}
//               </p>
//             </div>
//           )
//         )}
//       </div>

//       <p className="text-sm md:text-base font-semibold text-white text-center bg-cyan-300 border py-1 mt-1 border-white shadow-2xl">
//         Receipts Total Amount:{' '}
//         <span className="text-white">
//           {currency} {totalReceiptAmount.toFixed(2)}
//         </span>
//       </p>
//     </>
//   );
// };

// export default ReceiptList;
