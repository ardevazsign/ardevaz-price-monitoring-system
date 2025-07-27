import React, { createContext, useEffect, useState } from 'react';
// import { products } from '../assets/assets';
import { toast } from 'react-toastify';
// import { receipts } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const PriceContext = createContext();

const PriceContextProvider = (props) => {
  //
  const currency = ' ₱ ';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // -------Products Data -----------------------------------------------------------------

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/productlist');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // -------- Receipts Data -------------------------------------------------------------------

  const getReceiptsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/receipt/receiptlist');
      if (response.data.success) {
        const receiptsWithItems = response.data.receipts.map((receipt) => {
          return {
            _id: receipt._id,
            supplierName: receipt.supplierName,
            deliveryDate: receipt.deliveryDate,
            receiptNumber: receipt.receiptNumber,
            items: Array.isArray(receipt.items) ? receipt.items : [],
          };
        });
        setReceipts(receiptsWithItems);
        // setReceipts(response.data.receipts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getReceiptsData();
  }, []);

  //  ----------------------Login ------------------------------------------------------------------
  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, [token]);

  //  ---------------------------------------------------------------------------------------------

  const value = {
    products,
    currency,
    receipts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
    backendUrl,
    setToken,
    token,
  };
  return (
    <PriceContext.Provider value={value}>
      {props.children}
    </PriceContext.Provider>
  );
};

export default PriceContextProvider;
