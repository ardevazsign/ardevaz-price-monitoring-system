import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

const RicePOS = () => {
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [itemKilos, setItemKilos] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [dailyItems, setDailyItems] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    const fetchSalesHistory = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/pos');
        setSalesHistory(res.data);
      } catch (err) {
        console.error('Error fetching sales history:', err);
      }
    };

    fetchSalesHistory();
  }, []);

  const handleAddItem = () => {
    if (!itemKilos || !itemPrice) return;

    setDailyItems((prevItems) => [
      ...prevItems,
      {
        kilos: parseFloat(itemKilos),
        price: parseFloat(itemPrice),
      },
    ]);

    setItemKilos('');
    setItemPrice('');
  };

  const endSalesDay = async () => {
    if (dailyItems.length === 0) {
      alert('No items to save.');
      return;
    }

    const totalKilos = dailyItems.reduce((acc, item) => acc + item.kilos, 0);
    const totalCash = dailyItems.reduce((acc, item) => acc + item.price, 0);

    const record = {
      date: currentDate,
      items: dailyItems,
      totalKilos,
      totalCash,
    };

    try {
      await axios.post('http://localhost:4000/api/pos', record);
      setSalesHistory((prev) => [record, ...prev]);
      setDailyItems([]);
      setCurrentDate(format(new Date(), 'yyyy-MM-dd'));
      alert('Sales saved successfully!');
    } catch (err) {
      console.error('Error saving POS:', err);
      alert('Failed to save sales data');
    }
  };

  const handleDeleteRecord = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      await axios.delete(`http://localhost:4000/api/pos/${id}`);
      setSalesHistory((prev) => prev.filter((record) => record._id !== id));
    } catch (err) {
      console.error('Error deleting record:', err);
      alert('Failed to delete record.');
    }
  };

  return (
    <div className="overflow-y-auto max-h-screen min-h-screen p-4 bg-amber-50">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Rice Store POS</h1>

        <div className="bg-white shadow-md rounded p-6 border-4 border-cyan-300 space-y-4">
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              className="border rounded w-full p-2"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Kilos</label>
              <input
                type="number"
                className="border rounded w-full p-2"
                value={itemKilos}
                onChange={(e) => setItemKilos(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">Price (₱)</label>
              <input
                type="number"
                className="border rounded w-full p-2"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </div>
          </div>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            onClick={handleAddItem}
          >
            Add Item
          </button>

          <div>
            <h2 className="text-lg font-semibold">Items Today</h2>
            {dailyItems.length === 0 ? (
              <p className="text-gray-500">No items added yet.</p>
            ) : (
              <ul className="list-disc ml-6">
                {dailyItems.map((item, index) => (
                  <li key={index}>
                    {item.kilos} kg - ₱{item.price}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            onClick={endSalesDay}
          >
            End Sales Day
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Sales History</h2>
          {salesHistory.length === 0 ? (
            <p className="text-gray-500">No sales recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {salesHistory.map((record, index) => (
                <div
                  key={record._id || index}
                  className="border-2 border-cyan-300 p-3 rounded shadow-sm bg-white"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">Date: {record.date}</p>
                    <button
                      className="text-red-500 bg-slate-100 border px-3 py-1 rounded hover:bg-red-500 hover:text-white text-sm"
                      onClick={() => handleDeleteRecord(record._id)}
                    >
                      Delete
                    </button>
                  </div>
                  <p>Total Kilos: {record.totalKilos} kg</p>
                  <p>Total Cash: ₱{record.totalCash}</p>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    {record.items.map((item, idx) => (
                      <li key={idx}>
                        {item.kilos} kg - ₱{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RicePOS;

// import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import axios from 'axios';

// const RicePOS = () => {
//   const [currentDate, setCurrentDate] = useState(
//     format(new Date(), 'yyyy-MM-dd')
//   );
//   const [itemKilos, setItemKilos] = useState('');
//   const [itemPrice, setItemPrice] = useState('');
//   const [dailyItems, setDailyItems] = useState([]);
//   const [salesHistory, setSalesHistory] = useState([]);

//   // ✅ Load sales history from backend
//   useEffect(() => {
//     const fetchSalesHistory = async () => {
//       try {
//         const res = await axios.get('http://localhost:4000/api/pos');
//         setSalesHistory(res.data);
//       } catch (err) {
//         console.error('Error fetching sales history:', err);
//       }
//     };

//     fetchSalesHistory();
//   }, []);

//   const handleAddItem = () => {
//     if (!itemKilos || !itemPrice) return;

//     setDailyItems((prevItems) => [
//       ...prevItems,
//       {
//         kilos: parseFloat(itemKilos),
//         price: parseFloat(itemPrice),
//       },
//     ]);

//     setItemKilos('');
//     setItemPrice('');
//   };

//   const endSalesDay = async () => {
//     if (dailyItems.length === 0) {
//       alert('No items to save.');
//       return;
//     }

//     const totalKilos = dailyItems.reduce((acc, item) => acc + item.kilos, 0);
//     const totalCash = dailyItems.reduce((acc, item) => acc + item.price, 0);

//     const record = {
//       date: currentDate,
//       items: dailyItems,
//       totalKilos,
//       totalCash,
//     };

//     try {
//       await axios.post('http://localhost:4000/api/pos', record);
//       setSalesHistory((prev) => [record, ...prev]); // add new record to top
//       setDailyItems([]);
//       setCurrentDate(format(new Date(), 'yyyy-MM-dd'));
//       alert('Sales saved successfully!');
//     } catch (err) {
//       console.error('Error saving POS:', err);
//       alert('Failed to save sales data');
//     }
//   };

//   const handleDeleteRecord = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this record?')) return;

//     try {
//       await axios.delete(`http://localhost:4000/api/pos/${id}`);
//       setSalesHistory((prev) => prev.filter((record) => record._id !== id));
//     } catch (err) {
//       console.error('Error deleting record:', err);
//       alert('Failed to delete record.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 space-y-6">
//       <h1 className="text-2xl font-bold text-center">Rice Store POS</h1>

//       <div className="bg-white shadow-md rounded p-10 border-4 border-cyan-300 space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Date</label>
//           <input
//             type="date"
//             className="border rounded w-full p-2"
//             value={currentDate}
//             onChange={(e) => setCurrentDate(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1">Kilos</label>
//             <input
//               type="number"
//               className="border rounded w-full p-2"
//               value={itemKilos}
//               onChange={(e) => setItemKilos(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block mb-1">Price (₱)</label>
//             <input
//               type="number"
//               className="border rounded w-full p-2"
//               value={itemPrice}
//               onChange={(e) => setItemPrice(e.target.value)}
//             />
//           </div>
//         </div>

//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           onClick={handleAddItem}
//         >
//           Add Item
//         </button>

//         <div>
//           <h2 className="text-lg font-semibold">Items Today</h2>
//           {dailyItems.length === 0 ? (
//             <p className="text-gray-500">No items added yet.</p>
//           ) : (
//             <ul className="list-disc ml-6">
//               {dailyItems.map((item, index) => (
//                 <li key={index}>
//                   {item.kilos} kg - ₱{item.price}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           onClick={endSalesDay}
//         >
//           End Sales Day
//         </button>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Sales History</h2>
//         {salesHistory.length === 0 ? (
//           <p className="text-gray-500">No sales recorded yet.</p>
//         ) : (
//           <div className=" space-y-4">
//             {salesHistory.map((record, index) => (
//               <div
//                 key={record._id || index}
//                 className="border-3 border-cyan-300 p-3 rounded shadow-sm bg-white"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <p className="font-semibold">Date: {record.date}</p>
//                   <button
//                     className="text-red-500 border-1 border-slate-200 bg-slate-100 hover:bg-red-500 hover:text-white text-sm  p-2 rounded shadow-teal-500 font-semibold"
//                     onClick={() => handleDeleteRecord(record._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//                 <p>Total Kilos: {record.totalKilos} kg</p>
//                 <p>Total Cash: ₱{record.totalCash}</p>
//                 <ul className="list-disc ml-5 mt-2 text-sm">
//                   {record.items.map((item, idx) => (
//                     <li key={idx}>
//                       {item.kilos} kg - ₱{item.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RicePOS;

/* {salesHistory.map((record, index) => (
              <div
                key={index}
                className="border p-3 rounded shadow-sm bg-white"
              >
                <p className="font-semibold">Date: {record.date}</p>
                <p>Total Kilos: {record.totalKilos} kg</p>
                <p>Total Cash: ₱{record.totalCash}</p>
                <ul className="list-disc ml-5 mt-2 text-sm">
                  {record.items.map((item, idx) => (
                    <li key={idx}>
                      {item.kilos} kg - ₱{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))} */

// import React, { useState } from 'react';
// import { format } from 'date-fns';
// import axios from 'axios';

// const RicePOS = () => {
//   const [currentDate, setCurrentDate] = useState(
//     format(new Date(), 'yyyy-MM-dd')
//   );
//   const [itemKilos, setItemKilos] = useState('');
//   const [itemPrice, setItemPrice] = useState('');
//   const [dailyItems, setDailyItems] = useState([]);
//   const [salesHistory, setSalesHistory] = useState([]);

//   const handleAddItem = () => {
//     if (!itemKilos || !itemPrice) return;

//     setDailyItems((prevItems) => [
//       ...prevItems,
//       {
//         kilos: parseFloat(itemKilos),
//         price: parseFloat(itemPrice),
//       },
//     ]);

//     setItemKilos('');
//     setItemPrice('');
//   };

//   const endSalesDay = async () => {
//     if (dailyItems.length === 0) {
//       alert('No items to save.');
//       return;
//     }

//     const totalKilos = dailyItems.reduce((acc, item) => acc + item.kilos, 0);
//     const totalCash = dailyItems.reduce((acc, item) => acc + item.price, 0);

//     const record = {
//       date: currentDate,
//       items: dailyItems,
//       totalKilos,
//       totalCash,
//     };

//     try {
//       await axios.post('http://localhost:4000/api/pos', record);
//       setSalesHistory((prev) => [...prev, record]);
//       setDailyItems([]);
//       setCurrentDate(format(new Date(), 'yyyy-MM-dd'));
//       alert('Sales saved successfully!');
//     } catch (err) {
//       console.error('Error saving POS:', err);
//       alert('Failed to save sales data');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 space-y-6">
//       <h1 className="text-2xl font-bold text-center">Rice Store POS</h1>

//       <div className="bg-white shadow-md rounded p-10 border-4 border-cyan-300 space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Date</label>
//           <input
//             type="date"
//             className="border rounded w-full p-2"
//             value={currentDate}
//             onChange={(e) => setCurrentDate(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1">Kilos</label>
//             <input
//               type="number"
//               className="border rounded w-full p-2"
//               value={itemKilos}
//               onChange={(e) => setItemKilos(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block mb-1">Price (₱)</label>
//             <input
//               type="number"
//               className="border rounded w-full p-2"
//               value={itemPrice}
//               onChange={(e) => setItemPrice(e.target.value)}
//             />
//           </div>
//         </div>

//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           onClick={handleAddItem}
//         >
//           Add Item
//         </button>

//         <div>
//           <h2 className="text-lg font-semibold">Items Today</h2>
//           {dailyItems.length === 0 ? (
//             <p className="text-gray-500">No items added yet.</p>
//           ) : (
//             <ul className="list-disc ml-6">
//               {dailyItems.map((item, index) => (
//                 <li key={index}>
//                   {item.kilos} kg - ₱{item.price}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           onClick={endSalesDay}
//         >
//           End Sales Day
//         </button>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Sales History</h2>
//         {salesHistory.length === 0 ? (
//           <p className="text-gray-500">No sales recorded yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {salesHistory.map((record, index) => (
//               <div
//                 key={index}
//                 className="border p-3 rounded shadow-sm bg-white"
//               >
//                 <p className="font-semibold">Date: {record.date}</p>
//                 <p>Total Kilos: {record.totalKilos} kg</p>
//                 <p>Total Cash: ₱{record.totalCash}</p>
//                 <ul className="list-disc ml-5 mt-2 text-sm">
//                   {record.items.map((item, idx) => (
//                     <li key={idx}>
//                       {item.kilos} kg - ₱{item.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RicePOS;

// import React, { useState } from 'react';
// import { format } from 'date-fns';
// import axios from 'axios';

// const RicePOS = () => {
//   const [currentDate, setCurrentDate] = useState(
//     format(new Date(), 'yyyy-MM-dd')
//   );
//   const [itemKilos, setItemKilos] = useState('');
//   const [itemPrice, setItemPrice] = useState('');
//   const [dailyItems, setDailyItems] = useState([]);
//   const [salesHistory, setSalesHistory] = useState([]);

//   const handleAddItem = () => {
//     if (!itemKilos || !itemPrice) return;
//     setDailyItems([
//       ...dailyItems,
//       {
//         kilos: parseFloat(itemKilos),
//         price: parseFloat(itemPrice),
//       },
//     ]);
//     setItemKilos('');
//     setItemPrice('');
//   };

//   const endSalesDay = () => {
//     const totalKilos = dailyItems.reduce((acc, item) => acc + item.kilos, 0);
//     const totalCash = dailyItems.reduce((acc, item) => acc + item.price, 0);

//     setSalesHistory([
//       ...salesHistory,
//       {
//         date: currentDate,
//         items: dailyItems,
//         totalKilos,
//         totalCash,
//       },
//     ]);

//     setDailyItems([]);
//     setCurrentDate(format(new Date(), 'yyyy-MM-dd'));

//     try {
//       await axios.post('http://localhost:4000/api/pos', record);
//       setSalesHistory([...salesHistory, record]);
//       setDailyItems([]);
//       setCurrentDate(format(new Date(), 'yyyy-MM-dd'));
//     } catch (err) {
//       console.error('Error saving POS:', err);
//       alert('Failed to save sales data');
//     }

//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 space-y-6">
//       <h1 className="text-2xl font-bold text-center">Rice Store POS</h1>

//       <div className="bg-white shadow-md rounded p-10 border-4 border-cyan-300 space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Date</label>
//           <input
//             type="date"
//             className="border rounded w-full p-2"
//             value={currentDate}
//             onChange={(e) => setCurrentDate(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1">Kilos</label>
//             <input
//               type="number"
//               className="border rounded w-full p-2"
//               value={itemKilos}
//               onChange={(e) => setItemKilos(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block mb-1">Price (₱)</label>
//             <input
//               type="number"
//               className="border rounded w-full p-2"
//               value={itemPrice}
//               onChange={(e) => setItemPrice(e.target.value)}
//             />
//           </div>
//         </div>

//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           onClick={handleAddItem}
//         >
//           Add Item
//         </button>

//         <div>
//           <h2 className="text-lg font-semibold">Items Today</h2>
//           {dailyItems.length === 0 ? (
//             <p className="text-gray-500">No items added yet.</p>
//           ) : (
//             <ul className="list-disc ml-6">
//               {dailyItems.map((item, index) => (
//                 <li key={index}>
//                   {item.kilos} kg - ₱{item.price}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           onClick={endSalesDay}
//         >
//           End Sales Day
//         </button>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Sales History</h2>
//         {salesHistory.length === 0 ? (
//           <p className="text-gray-500">No sales recorded yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {salesHistory.map((record, index) => (
//               <div
//                 key={index}
//                 className="border p-3 rounded shadow-sm bg-white"
//               >
//                 <p className="font-semibold">Date: {record.date}</p>
//                 <p>Total Kilos: {record.totalKilos} kg</p>
//                 <p>Total Cash: ₱{record.totalCash}</p>
//                 <ul className="list-disc ml-5 mt-2 text-sm">
//                   {record.items.map((item, idx) => (
//                     <li key={idx}>
//                       {item.kilos} kg - ₱{item.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RicePOS;
