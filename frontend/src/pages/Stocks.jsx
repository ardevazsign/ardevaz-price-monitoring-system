import { useContext, useEffect, useState } from 'react';
import { PriceContext } from '../context/PriceContext';
import Title from '../components/Title';

const Stocks = () => {
  const { receipts, currency } = useContext(PriceContext);
  const [itemSummary, setItemSummary] = useState({});
  const [totalKilos, setTotalKilos] = useState(0);
  const [grandTotalAmount, setGrandTotalAmount] = useState(0);

  useEffect(() => {
    if (!Array.isArray(receipts) || receipts.length === 0) return;

    const summary = {};
    let totalQuantity = 0;
    let totalAmount = 0;

    receipts.forEach((receipts) => {
      if (Array.isArray(receipts.items)) {
        receipts.items.forEach((item) => {
          const article = item.article || 'Unknown';
          const unit = item.unit || 'unit';

          const quantity =
            parseFloat(
              String(item.quantity ?? '0')
                .replace(/,/g, '')
                .trim()
            ) || 0;
          // const quantity = parseFloat(item.quantity) || 0;
          const unitPrice =
            parseFloat(
              String(item.unitPrice ?? '0')
                .replace(/,/g, '')
                .trim()
            ) || 0;
          // const unitPrice = parseFloat(item.unitPrice) || 0;

          const key = `${article}_${unit}`;

          if (!summary[key]) {
            summary[key] = {
              article,
              unit,
              unitPrice,
              totalQuantity: 0,
              totalAmount: 0,
            };
          }

          summary[key].totalQuantity += quantity;
          summary[key].totalAmount += quantity * unitPrice;

          totalQuantity += quantity;
          totalAmount += quantity * unitPrice;
        });
      }
    });

    setItemSummary(summary);
    setTotalKilos(totalQuantity);
    setGrandTotalAmount(totalAmount);
  }, [receipts]);

  return (
    <div className="p-4 sm:p-8">
      <Title text1="STOCK" text2="SUMMARY" />

      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-amber-400 text-sm sm:text-base">
          <thead className="bg-amber-100">
            <tr>
              <th className="border p-2">Article</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2">U-Price</th>
              <th className="border p-2">Total Qty</th>
              <th className="border p-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(itemSummary).length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No stock data available
                </td>
              </tr>
            ) : (
              Object.values(itemSummary).map((item, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{item.article}</td>
                  <td className="border p-2">{item.unit}</td>
                  <td className="border p-2">
                    {currency}
                    {Number(item.unitPrice).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border p-2">{item.totalQuantity}</td>
                  <td className="border p-2">
                    {currency}
                    {Number(item.totalAmount).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Summary below table */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-400 via-white to-black rounded-lg text-center text-sm sm:text-base">
          <p className="font-semibold text-gray-700">
            TOTAL KILOS: <span className="text-black">{totalKilos} kg</span>
          </p>
          <p className="font-semibold text-gray-700 mt-2">
            TOTAL STOCK AMOUNT:{' '}
            <span className="text-black">
              {currency}
              {Number(grandTotalAmount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
