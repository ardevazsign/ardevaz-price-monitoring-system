import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PriceContext } from '../context/PriceContext';
import { toast } from 'react-toastify';

const Credit = () => {
  const { currency, token, backendUrl } = useContext(PriceContext);
  const [receiptList, setReceiptList] = useState([]);

  const fetchReceipts = async () => {
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
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchReceipts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unpaidReceipts = receiptList.filter((r) => r.status !== 'Paid');
  const paidReceipts = receiptList.filter((r) => r.status === 'Paid');

  const totalAmount = (items) =>
    items.reduce((sum, item) => sum + parseFloat(item.totalAmount || 0), 0);

  const renderReceiptRow = (item) => (
    <div
      key={item._id}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 py-2 border items-center text-sm"
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
      <p className="text-center">
        {new Date(item.createdAt).toLocaleDateString()}
      </p>
    </div>
  );

  return (
    <div className="overflow-y-auto max-h-screen min-h-screen p-2 md:p-4">
      <h2 className="text-lg md:text-xl font-bold mb-2 text-center border-2 md:border-4 border-blue-400 bg-blue-300 rounded">
        Credit Receipts Summary
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
        Total Unpaid Amount: {currency} {totalAmount(unpaidReceipts).toFixed(2)}
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
        Total Paid Amount: {currency} {totalAmount(paidReceipts).toFixed(2)}
      </p>

      <p className="text-center text-white bg-slate-500 py-1 mt-4 mb-1 rounded">
        Total Amount: {currency} {totalAmount(receiptList).toFixed(2)}
      </p>

      <p className="text-center text-white bg-slate-600 py-1 mb-3 rounded">
        Total Receipts: {receiptList.length}
      </p>
    </div>
  );
};

export default Credit;
