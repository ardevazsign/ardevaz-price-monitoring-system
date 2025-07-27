import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const CreateReceipt = ({ token }) => {
  const [supplierName, setSupplierName] = useState('');
  const [status, setStatus] = useState('Unpaid');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [items, setItems] = useState([
    { quantity: '', unit: '', article: '', unitPrice: '', totalAmount: 0 },
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] =
      field === 'article' || field === 'unit' ? value : Number(value);
    updatedItems[index].totalAmount =
      updatedItems[index].quantity * updatedItems[index].unitPrice;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { quantity: 0, unit: '', article: '', unitPrice: 0, totalAmount: 0 },
    ]);
  };

  const parseKg = (unitStr) => {
    const match = unitStr.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const totalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalItems = items.length;
  const totalKilograms = items.reduce(
    (total, item) => total + item.quantity * parseKg(item.unit),
    0
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        supplierName,
        receiptNumber,
        status,
        deliveryDate,
        items,
        totalAmount,
        totalQuantity,
        totalItems,
        totalKilograms,
      };

      const response = await axios.post(
        `${backendUrl}/api/receipt/add`,
        payload,
        {
          headers: { token, 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setSupplierName('');
        setReceiptNumber('');
        setStatus('Unpaid');
        setDeliveryDate(new Date().toISOString().split('T')[0]);
        setItems([
          { quantity: 0, unit: '', article: '', unitPrice: 0, totalAmount: 0 },
        ]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="overflow-y-auto max-h-screen p-4 bg-amber-50">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 bg-white border-4 border-cyan-300 rounded-2xl p-4 shadow-lg w-full max-w-5xl mx-auto"
      >
        <h2 className="text-lg font-bold text-amber-500">Create New Receipt</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Supplier Name</label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              required
              className="w-full border p-2 rounded shadow"
            />
          </div>
          <div>
            <label className="text-sm">O.R. Number</label>
            <input
              type="text"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              required
              className="w-full border p-2 rounded shadow"
            />
          </div>
          <div>
            <label className="text-sm">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full border p-2 rounded shadow"
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Date Delivered</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
              className="w-full border p-2 rounded shadow"
            />
          </div>
        </div>

        <div>
          <p className="font-medium text-sm text-amber-400">
            Input Items Delivered
          </p>
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2"
            >
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, 'quantity', e.target.value)
                }
                required
                className="border p-2 rounded shadow"
              />
              <input
                type="text"
                placeholder="Unit (e.g. 25kg)"
                value={item.unit}
                onChange={(e) =>
                  handleItemChange(index, 'unit', e.target.value)
                }
                required
                className="border p-2 rounded shadow"
              />
              <input
                type="text"
                placeholder="Article"
                value={item.article}
                onChange={(e) =>
                  handleItemChange(index, 'article', e.target.value)
                }
                required
                className="border p-2 rounded shadow"
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) =>
                  handleItemChange(index, 'unitPrice', e.target.value)
                }
                required
                className="border p-2 rounded shadow"
              />
              <input
                type="number"
                placeholder="Amount"
                value={item.totalAmount}
                readOnly
                className="border p-2 rounded shadow bg-gray-100"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Add More Item
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className="bg-amber-300 p-2 rounded shadow text-center">
            <p className="text-sm">Total Kilograms</p>
            <p className="font-bold">{totalKilograms}</p>
          </div>
          <div className="bg-amber-400 p-2 rounded shadow text-center">
            <p className="text-sm">Total Quantity</p>
            <p className="font-bold">{totalQuantity}</p>
          </div>
          <div className="bg-amber-500 p-2 rounded shadow text-center">
            <p className="text-sm">Total Items</p>
            <p className="font-bold">{totalItems}</p>
          </div>
          <div className="bg-amber-600 p-2 rounded shadow text-center">
            <p className="text-sm">Total Amount</p>
            <p className="font-bold">₱ {totalAmount}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-amber-500 text-white px-6 py-2 rounded shadow hover:bg-amber-600"
          >
            Create Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReceipt;

// import React, { useState } from 'react';
// // import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const CreateReceipt = ({ token }) => {
//   const [supplierName, setSupplierName] = useState('');
//   const [status, setStatus] = useState('Unpaid');
//   const [receiptNumber, setReceiptNumber] = useState('');
//   const [deliveryDate, setDeliveryDate] = useState(
//     new Date().toISOString().split('T')[0]
//   );
//   //
//   const [items, setItems] = useState([
//     { quantity: 0, unit: '', article: '', unitPrice: 0, unitTotal: 0 },
//   ]);
//   //
//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] =
//       field === 'article' || field === 'unit' ? value : Number(value);
//     updatedItems[index].totalAmount =
//       updatedItems[index].quantity * updatedItems[index].unitPrice;
//     setItems(updatedItems);
//   };
//   //
//   const addItem = () => {
//     setItems([
//       ...items,
//       { quantity: 0, unit: '', article: '', unitPrice: 0, totalAmount: 0 },
//     ]);
//   };
//   //
//   const parseKg = (unitStr) => {
//     const match = unitStr.match(/(\d+\.?\d*)/); // match digits & decimals
//     return match ? parseFloat(match[1]) : 0;
//   };
//   //
//   const totalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);
//   const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
//   const totalItems = items.length;
//   // Helper to extract number from "25kg", "10kg" etc.
//   // Total Kilograms Calculation
//   const totalKilograms = items.reduce((total, item) => {
//     const kg = parseKg(item.unit);
//     return total + item.quantity * kg;
//   }, 0);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         supplierName,
//         receiptNumber,
//         status,
//         deliveryDate,
//         items,
//         totalAmount,
//         totalQuantity,
//         totalItems,
//         totalKilograms,
//       };

//       const response = await axios.post(
//         backendUrl + '/api/receipt/add',
//         payload,
//         {
//           headers: {
//             token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         // Reset
//         setSupplierName('');
//         setReceiptNumber('');
//         setStatus('Unpaid');
//         setDeliveryDate(new Date().toISOString().split('T')[0]);
//         setItems([
//           { quantity: 0, unit: '', article: '', unitPrice: 0, totalAmount: 0 },
//         ]);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//       //
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col w-full items-start gap-3 sm:p-10  bg-white border-4 border-cyan-300 rounded-2xl p-2 shadow-lg"
//     >
//       <div>
//         <p className="font-bold text-lg text-amber-400 ">Create New Receipt</p>
//         <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
//           <div className="w-full">
//             <p className="mb-1 text-sm">Supplier name</p>
//             <input
//               onChange={(e) => setSupplierName(e.target.value)}
//               value={supplierName}
//               className="w-full max-w-[280px] px-2 py-1 shadow-lg"
//               type="text"
//               placeholder="Supplier"
//               required
//             />
//           </div>
//           <div className="w-full">
//             <p className="mb-1 text-sm">O.R. Number</p>
//             <input
//               onChange={(e) => setReceiptNumber(e.target.value)}
//               value={receiptNumber}
//               className=" px-2 py-1 shadow-lg"
//               type="text"
//               placeholder="O.R."
//               required
//             />
//           </div>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-1  sm:gap-8">
//           <div className="w-full">
//             <p className="mb-1 mt-1 text-sm">Status</p>
//             <select
//               onChange={(e) => setStatus(e.target.value)}
//               value={status}
//               className="w-full max-w-[280px] px-2 py-1 shadow-lg"
//               required
//             >
//               <option value="">-- Select Status --</option>
//               <option value="Unpaid">Unpaid</option>
//               <option value="Paid">Paid</option>
//             </select>
//             {/* <input
//               onChange={(e) => setStatus(e.target.value)}
//               value={status}
//               className="w-full max-w-[280px] px-2 py-1 shadow-lg"
//               type="text"
//               placeholder="Status"
//               required
//             /> */}
//           </div>
//           <div className="w-full">
//             <p className="mb-1 mt-1 text-sm">Date Delivered</p>
//             <input
//               onChange={(e) => setDeliveryDate(e.target.value)}
//               value={deliveryDate}
//               className=" px-2 py-1 shadow-lg"
//               type="date"
//               placeholder="Date"
//               required
//             />
//           </div>
//         </div>

//         {/* Input Items Delivered */}
//         <div>
//           <p className="mb-1 mt-1 font-medium  text-sm text-amber-400">
//             Input Items Delivered
//           </p>
//         </div>

//         <ol>
//           {items.map((item, index) => (
//             <li key={index}>
//               <div className="flex flex-col sm:flex-row gap-1 sm:gap-8">
//                 <div>
//                   <p className="mb-1 mt-1 text-xs text-center">Quantity</p>
//                   <input
//                     className="w-[80px] px-2 py-1 shadow-lg"
//                     type="number"
//                     placeholder="0"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       handleItemChange(index, 'quantity', e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <p className="mb-1 mt-1 text-xs text-center">Unit</p>
//                   <input
//                     className="w-[100px] px-2 py-1 shadow-lg"
//                     type="text"
//                     placeholder="0"
//                     value={item.unit}
//                     onChange={(e) =>
//                       handleItemChange(index, 'unit', e.target.value)
//                     }
//                     required
//                   />
//                 </div>

//                 <div className="w-full">
//                   <p className="mb-1 mt-1 text-xs text-center">Articles</p>
//                   <input
//                     className="w-[250px] px-2 py-1 shadow-lg"
//                     type="text"
//                     placeholder="Item"
//                     value={item.article}
//                     onChange={(e) =>
//                       handleItemChange(index, 'article', e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <p className="mb-1 mt-1 text-xs text-center">Unit Price</p>
//                   <input
//                     className="w-[150px] px-2 py-1 shadow-lg"
//                     type="text"
//                     placeholder="0"
//                     value={item.unitPrice}
//                     onChange={(e) =>
//                       handleItemChange(index, 'unitPrice', e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <p className="mb-1 mt-1 text-xs text-center ">
//                     Unit Total Amount
//                   </p>
//                   <input
//                     className=" w-[150px] px-2 py-1 shadow-lg"
//                     type="number"
//                     placeholder="Amount"
//                     value={item.totalAmount}
//                     readOnly
//                   />
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ol>

//         <div className="mt-2 flex flex-col sm:flex-row gap-1 w-full sm:gap-8 justify-center">
//           <div>
//             <p className="mb-1 mt-1  text-sm text-center">Total Kilograms</p>
//             <div className="w-[150px] px-2 py-1 bg-amber-300 shadow-lg rounded text-center">
//               {totalKilograms}
//             </div>
//           </div>
//           <div>
//             <p className="mb-1 mt-1  text-sm text-center">Item Total Count</p>
//             <div className="w-[150px] px-2 py-1 bg-amber-500 shadow-lg rounded text-center">
//               {totalQuantity}
//             </div>
//           </div>
//           <div>
//             <p className="mb-1 mt-1  text-sm text-center ">Item Total Class</p>
//             <div className="w-[150px] px-2 py-1 bg-amber-400 shadow-lg rounded text-center">
//               {totalItems}
//             </div>
//           </div>
//           <div>
//             <p className="mb-1 mt-1 text-sm text-center">Total Amount</p>
//             <div className=" w-[150px] px-2 py-1 bg-amber-500 shadow-lg rounded text-center">
//               ₱ {totalAmount.toFixed(2)}
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center gap-10 items-center mt-10">
//           <button
//             type="button"
//             onClick={addItem}
//             className="mt-4 px-4 py-3 bg-blue-500 hover:bg-slate-400 text-white rounded shadow-lg cursor-pointer"
//           >
//             + Add More Item
//           </button>
//           <button
//             type="submit"
//             className="w-28 py-3 mt-4 rounded bg-amber-500 hover:bg-slate-400 shadow-md text-white active:scale-95 transition-transform, active:bg-gray-600 transition-colors cursor-pointer"
//           >
//             Create Now
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CreateReceipt;
