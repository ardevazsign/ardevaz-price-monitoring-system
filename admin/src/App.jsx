import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import ViewStocks from './pages/ViewItemSummary';
import ProductList from './pages/ProductList';
import ReceiptList from './pages/ReceiptList';
import CreateReceipt from './pages/CreateReceipt';
import CreditStatus from './pages/CreditStatus';
import RicePOS from './pages/RicePOS';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₱';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className="bg-amber-50 min-h-screen">
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <NavBar setToken={setToken} />
          <hr className="text-amber-400 ml-5 mr-5 mt-0.25" />
          <hr className="text-amber-400 ml-5 mr-5 mt-0.25" />
          <hr className="text-amber-400 ml-5 mr-5 mt-0.25" />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-60 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route
                  path="/viewstocks"
                  element={<ViewStocks token={token} />}
                />
                <Route
                  path="/productlist"
                  element={<ProductList token={token} />}
                />
                <Route
                  path="/receiptlist"
                  element={<ReceiptList token={token} />}
                />
                <Route
                  path="/createreceipt"
                  element={<CreateReceipt token={token} />}
                />
                <Route
                  path="/creditstatus"
                  element={<CreditStatus token={token} />}
                />
                <Route path="/ricepos" element={<RicePOS token={token} />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
