import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PriceList from './pages/PriceList';
import About from './pages/About';
import Contact from './pages/Contact';
import Stocks from './pages/Stocks';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Credit from './pages/Credit';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Items from './pages/Items';
import Documents from './pages/Documents';
import Receipt from './pages/Receipt';
import SearchBar from './components/SearchBar';
import Product from './pages/Product';

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] overflow-x-hidden">
      <NavBar />
      <hr className="text-amber-500" />
      <hr className="text-amber-500 mt-0.25" />
      <hr className="text-amber-500 mt-0.25" />
      <br />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/pricelist" element={<PriceList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/receipt/:receiptId" element={<Receipt />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/credit" element={<Credit />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
