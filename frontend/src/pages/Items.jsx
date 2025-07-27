import React, { useContext, useEffect, useState } from 'react';
import { PriceContext } from '../context/PriceContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Products = () => {
  const { products, search, showSearch } = useContext(PriceContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  // const [sortType, setSortType] = useState('relavent');

  const [addition, setAddition] = useState(100);

  // const shortId = (id) => id.slice(0, 7);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  // const sortProduct = () => {
  //   let fpCopy = filterProducts.slice();

  //   switch (sortType) {
  //     case 'low-high':
  //       setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
  //       break;

  //     case 'high-low':
  //       setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
  //       break;

  //     default:
  //       // applyFilter();
  //       break;
  //   }
  // };

  useEffect(() => {
    applyFilter();
    // sortProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory, search, showSearch, products]);

  // useEffect(() => {
  //   sortProduct();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ">
      {/* filter options  */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            alt=""
          />
        </p>
        {/* Category Filter  */}
        <div
          className={`border border-amber-400 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Dinurado'}
                onChange={toggleCategory}
              />{' '}
              Dinurado
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Jasmine'}
                onChange={toggleCategory}
              />{' '}
              Jasmine
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Sinandomeng'}
                onChange={toggleCategory}
              />{' '}
              Sinadomeng
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Special'}
                onChange={toggleCategory}
              />{' '}
              Special Rice
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-amber-400 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Imported'}
                onChange={toggleSubCategory}
              />
              Imported Rice
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Local'}
                onChange={toggleSubCategory}
              />
              Local Rice
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={'Sourced'}
                onChange={toggleSubCategory}
              />
              Sourced Rice
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'PRODUCT'} />
          {/* Product Sort */}
          <select
            value={addition}
            onChange={(e) => setAddition(Number(e.target.value))}
            className="border-2 border-amber-400 text-sm px-1 outline-0"
          >
            <option value="100">Pricing Options: Default</option>
            <option value="80">Charge Rate: 80%</option>
            <option value="70">Charge Rate: 70%</option>
            <option value="60">Charge Rate: 60%</option>
            <option value="50">Charge Rate: 50%</option>
            <option value="40">Charge Rate: 40%</option>
            <option value="30">Charge Rate: 30%</option>
            <option value="20">Charge Rate: 20%</option>
            <option value="10">Charge Rate: 10%</option>
          </select>
        </div>
        {/* Map Product */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={item._id || index}
              id={item._id}
              item={item.item}
              price={item.price + addition}
              supplierName={item.supplierName}
              image={item.image}
              unit={item.unit}
              category={item.category}
              subCategory={item.subCategory}
              // updated={Date.now}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
