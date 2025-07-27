import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const ViewItemSummary = ({ token }) => {
  const [summary, setSummary] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalKilos, setTotalKilos] = useState(0);

  const parseKg = (unitStr) => {
    const match = unitStr.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/receipt/item-summary`, {
        headers: { token },
      });

      if (res.data.success) {
        const data = res.data.summary;
        const sortedData = data.sort((a, b) =>
          a.article.localeCompare(b.article)
        );
        setSummary(sortedData);

        const total = data.reduce((sum, item) => sum + item.totalAmount, 0);
        setGrandTotal(total);

        const kilos = data.reduce((sum, item) => {
          const unitKg = parseKg(item.unit);
          return sum + item.quantity * unitKg;
        }, 0);
        setTotalKilos(kilos);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching item summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [token]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-cyan-600">
        Loading item summary...
      </div>
    );

  return (
    <div className="overflow-y-auto max-h-screen min-h-screen p-2 md:p-4 bg-amber-50">
      <div className="p-4 border border-cyan-400 bg-white rounded-xl shadow-md">
        <h2 className="text-lg md:text-xl text-center font-bold mb-4 text-cyan-700">
          Summary of All Receipt Items
        </h2>

        {summary.length === 0 ? (
          <p className="text-center text-gray-500">No item data found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border text-xs sm:text-sm">
                <thead>
                  <tr className="bg-cyan-400 text-white border-2 border-black">
                    <th className="border px-2 py-1 text-left">Article</th>
                    <th className="border px-2 py-1 text-center">Unit</th>
                    <th className="border px-2 py-1 text-center">Unit Price</th>
                    <th className="border px-2 py-1 text-center">Total Qty</th>
                    <th className="border px-2 py-1 text-center">
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((item, idx) => (
                    <tr key={idx} className="hover:bg-amber-100">
                      <td className="border px-2 py-1">{item.article}</td>
                      <td className="border px-2 py-1 text-center">
                        {item.unit}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        <span className="hidden sm:inline">₱</span>{' '}
                        {item.unitPrice.toFixed(2)}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {item.quantity}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        <span className="hidden sm:inline">₱</span>{' '}
                        {item.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <div className="text-base sm:text-lg font-semibold text-white bg-amber-400 py-2 px-4 rounded shadow text-center w-full sm:w-auto">
                Total Kilos: {totalKilos} kg
              </div>
              <div className="text-base sm:text-lg font-semibold text-white bg-amber-400 py-2 px-4 rounded shadow text-center w-full sm:w-auto">
                Grand Total: ₱ {grandTotal.toFixed(2)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewItemSummary;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const ViewItemSummary = ({ token }) => {
//   const [summary, setSummary] = useState([]);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [totalKilos, setTotalKilos] = useState(0);

//   // helper Function

//   const parseKg = (unitStr) => {
//     const match = unitStr.match(/(\d+\.?\d*)/); // Matches 25kg → 25
//     return match ? parseFloat(match[1]) : 0;
//   };

//   const fetchSummary = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${backendUrl}/api/receipt/item-summary`, {
//         headers: { token },
//       });

//       if (res.data.success) {
//         const data = res.data.summary;

//         //   Sort data alphabitically by article name

//         const sortedData = data.sort((a, b) =>
//           a.article.localeCompare(b.article)
//         );

//         //  alphabitically  Sorted end here

//         setSummary(sortedData);

//         // ✅ Calculate the grand total here
//         const total = data.reduce((sum, item) => sum + item.totalAmount, 0);
//         setGrandTotal(total);

//         // for total kilos
//         const kilos = data.reduce((sum, item) => {
//           const unitKg = parseKg(item.unit); // Convert "25kg" to 25
//           return sum + item.quantity * unitKg;
//         }, 0);
//         setTotalKilos(kilos);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching item summary');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary();
//   }, [token]);

//   if (loading) return <p>Loading item summary...</p>;

//   return (
//     <div className="p-4 border-2 border-cyan-400 bg-white rounded-xl shadow-md">
//       <h2 className="text-xl text-center font-bold mb-4 text-cyan-700">
//         Summary of All Receipt Items
//       </h2>

//       {summary.length === 0 ? (
//         <p>No item data found.</p>
//       ) : (
//         <>
//           <table className="lg:w-full sd:w-fit   table-auto border text-sm">
//             <thead>
//               <tr className="bg-cyan-400 text-white border-2 border-black">
//                 <th className="border px-2 py-1">Article</th>
//                 <th className="border px-2 py-1">Unit</th>
//                 <th className="border px-2 py-1">Unit Price</th>
//                 <th className="border px-2 py-1">Total Quantity</th>
//                 <th className="border px-2 py-1">Total Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {summary.map((item, idx) => (
//                 <tr key={idx} className="hover:bg-amber-100">
//                   <td className="border px-2 py-1">{item.article}</td>
//                   <td className="border px-2 py-1 text-center">{item.unit}</td>
//                   <td className="border px-2 py-1 text-center">
//                     ₱ {item.unitPrice.toFixed(2)}
//                   </td>
//                   <td className="border px-2 py-1 text-center">
//                     {item.quantity}
//                   </td>
//                   <td className="border px-2 py-1 text-center">
//                     ₱ {item.totalAmount.toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* ✅ Grand Total Display */}
//           <div className="flex align-middle justify-center gap-4">
//             <div className="mt-4 text-center text-lg font-semibold text-white bg-amber-400 py-2 px-2 shadow-2xl">
//               Total Kilos: {totalKilos.toFixed(2)} kg
//             </div>
//             <div className="mt-4 text-center text-lg font-semibold text-white bg-amber-400 py-2 px-2 shadow-2xl">
//               Grand Total: ₱ {grandTotal.toFixed(2)}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewItemSummary;

// Original 06/24/25

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const ViewItemSummary = ({ token }) => {
//   const [summary, setSummary] = useState([]);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [loading, setLoading] = useState(true);

//   if (res.data.success) {
//     setSummary(res.data.summary);
//     const total = res.data.summary.reduce(
//       (sum, item) => sum + item.totalAmount,
//       0
//     );
//     setGrandTotal(total);
//   }

//   const fetchSummary = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${backendUrl}/api/receipt/item-summary`, {
//         headers: { token },
//       });

//       if (res.data.success) {
//         setSummary(res.data.summary);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching item summary');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary();
//   }, [token]);

//   if (loading) return <p>Loading item summary...</p>;

//   return (
//     <div className="p-4 border-2 border-cyan-400 bg-white rounded-xl shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-cyan-700">
//         Summary of All Receipt Items
//       </h2>

//       {summary.length === 0 ? (
//         <p>No item data found.</p>
//       ) : (
//         <table className="w-full table-auto border text-sm">
//           <thead>
//             <tr className="bg-amber-400 text-white">
//               <th className="border px-2 py-1">Article</th>
//               <th className="border px-2 py-1">Unit</th>
//               <th className="border px-2 py-1">Unit Price</th>
//               <th className="border px-2 py-1">Total Quantity</th>
//               <th className="border px-2 py-1">Total Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {summary.map((item, idx) => (
//               <tr key={idx} className="hover:bg-amber-100">
//                 <td className="border px-2 py-1">{item.article}</td>
//                 <td className="border px-2 py-1">{item.unit}</td>
//                 <td className="border px-2 py-1">
//                   ₱ {item.unitPrice.toFixed(2)}
//                 </td>
//                 <td className="border px-2 py-1">{item.quantity}</td>
//                 <td className="border px-2 py-1">
//                   ₱ {item.totalAmount.toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <div className="mt-4 text-right text-lg font-semibold text-cyan-800">
//             Grand Total: ₱ {grandTotal.toFixed(2)}
//           </div>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewItemSummary;
