import React, { useState, useContext } from 'react';
import { PriceContext } from '../context/PriceContext';

const ReceiptForm = () => {
  const { currency } = useContext(PriceContext);

  const [formData, setFormData] = useState({
    supplierName: '',
    receiptNumber: '',
    deliveryDate: '',
    items: Array(20).fill({
      quantity: '',
      unit: '',
      article: '',
      unitPrice: '',
      totalAmount: 0,
    }),
    totalAmount: 0,
  });

  // Handle individual item input changes
  const handleInputChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    const item = { ...updatedItems[index], [field]: value };

    // Calculate totalAmount for the item
    const quantity = parseFloat(item.quantity) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    item.totalAmount = quantity * unitPrice;

    updatedItems[index] = item;

    // Calculate overall total
    const totalAmount = updatedItems.reduce(
      (sum, item) => sum + (parseFloat(item.totalAmount) || 0),
      0
    );

    setFormData({
      ...formData,
      items: updatedItems,
      totalAmount,
    });
  };

  // Handle top-level field changes (supplier name, etc.)
  const handleFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Delivery Receipt Submitted!');
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-md">
      <h2 className="text-center font-bold text-xl mb-4">DELIVERY RECEIPT</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block font-medium">Supplier Name</label>
          <input
            type="text"
            value={formData.supplierName}
            onChange={(e) => handleFieldChange('supplierName', e.target.value)}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium">Receipt Number</label>
          <input
            type="text"
            value={formData.receiptNumber}
            onChange={(e) => handleFieldChange('receiptNumber', e.target.value)}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Delivery Date</label>
          <input
            type="date"
            value={formData.deliveryDate}
            onChange={(e) => handleFieldChange('deliveryDate', e.target.value)}
            required
            className="border px-2 py-1 w-full"
          />
        </div>

        <table className="w-full border mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Article</th>
              <th className="p-2 border">Unit Price</th>
              <th className="p-2 border">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                <td className="p-1 border">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(index, 'quantity', e.target.value)
                    }
                    className="w-full px-1"
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) =>
                      handleInputChange(index, 'unit', e.target.value)
                    }
                    className="w-full px-1"
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    value={item.article}
                    onChange={(e) =>
                      handleInputChange(index, 'article', e.target.value)
                    }
                    className="w-full px-1"
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleInputChange(index, 'unitPrice', e.target.value)
                    }
                    className="w-full px-1"
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="number"
                    value={item.totalAmount}
                    readOnly
                    className="w-full bg-gray-100 px-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-4">
          <label className="block font-semibold">
            Total Amount Due: <span>{currency}</span>
          </label>
          <input
            type="number"
            value={formData.totalAmount}
            readOnly
            className="w-full bg-gray-100 px-2 py-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Receipt
        </button>
      </form>
    </div>
  );
};

export default ReceiptForm;

// Uphere revised code July 26, 2025

// Original Code Comented July 26, 2025

// import React, { useState, useContext } from 'react';
// import { PriceContext } from '../context/PriceContext';

// const ReceiptForm = () => {
//   const { currency } = useContext(PriceContext);

//   const [formData, setFormData] = useState({
//     supplierName: '',
//     receiptNumber: '',
//     deliveryDate: '',
//     items: Array(20).fill({
//       quantity: '',
//       unit: '',
//       article: '',
//       unitPrice: '',
//       totalAmount: '',
//     }),
//     totalAmount: '',
//     totalQuantity: '',
//     totalItems: '',
//     totalKilograms: '',
//   });

//   // Handle Input Change
//   const handleInputChange = (index, field, value) => {
//     const updatedItems = [...formData.items];
//     updatedItems[index] = {
//       ...updatedItems[index],
//       [field]: value,
//       unitTotal:
//         field === 'quantity' || field === 'unitPrice'
//           ? (updatedItems[index].quantity || 0) *
//             (updatedItems[index].unitPrice || 0)
//           : updatedItems[index].totalAmount,
//     };

//     setFormData({
//       ...formData,
//       items: updatedItems,
//       totalAmount: updatedItems.reduce(
//         (sum, item) => sum + item.totalAmount,
//         0
//       ),
//     });
//   };

//   // Handle Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitted Data:', formData);
//     alert('Delivery Receipt Submitted!');
//   };

//   return (
//     <div className="bg-amber-300">
//       <h2 className="text-center">DELIVERY RECEIPT</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Supplier Name : </label>
//           <input
//             type="text"
//             value={formData.supplierName}
//             onChange={(e) =>
//               setFormData({ ...formData, supplierName: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label>Receipt Number:</label>
//           <input
//             type="text"
//             value={formData.receiptNumber}
//             onChange={(e) =>
//               setFormData({ ...formData, receiptNumber: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div className="info">
//           <label>Delivery Date:</label>
//           <input
//             type="date"
//             value={formData.deliveryDate}
//             onChange={(e) =>
//               setFormData({ ...formData, deliveryDate: e.target.value })
//             }
//             required
//           />
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Quantity</th>
//               <th>unit</th>
//               <th>Articles</th>
//               <th>Unit Price</th>
//               <th>Total Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {formData.items.map((item, index) => (
//               <tr key={index}>
//                 <td>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       handleInputChange(
//                         index,
//                         'quantity',
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                     required
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={item.unit}
//                     onChange={(e) =>
//                       handleInputChange(
//                         index,
//                         'unit',
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                     required
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={item.article}
//                     onChange={(e) =>
//                       handleInputChange(index, 'article', e.target.value)
//                     }
//                     required
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     value={item.unitPrice}
//                     onChange={(e) =>
//                       handleInputChange(
//                         index,
//                         'unitPrice',
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                     required
//                   />
//                 </td>
//                 <td>
//                   <input type="number" value={item.totalAmount} readOnly />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="total">
//           <label>
//             Total Amount Due: <span>{currency}</span>
//           </label>
//           <input type="number" value={formData.totalAmount} readOnly />
//         </div>

//         <button type="submit" className="submit-btn">
//           Submit Receipt
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReceiptForm;
