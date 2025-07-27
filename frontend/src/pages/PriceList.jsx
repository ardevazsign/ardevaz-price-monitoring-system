// import React, { useContext, useEffect, useState } from 'react';
// import { PriceContext } from '../context/PriceContext';
// import { assets } from '../assets/assets';
// import Title from '../components/Title';
// import PriceListItem from '../components/PriceListItem';

// const PriceList = () => {
//   const { products, search, showSearch } = useContext(PriceContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [unit, setUnit] = useState([]);
//   const [addition, setAddition] = useState(100);

//   // Helper to toggle items in an array state
//   const toggleItem = (value, list, setter) => {
//     setter(
//       list.includes(value)
//         ? list.filter((item) => item !== value)
//         : [...list, value]
//     );
//   };

//   const applyFilter = () => {
//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         category.includes(item.category)
//       );
//     }

//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }

//     if (unit.length > 0) {
//       productsCopy = productsCopy.filter((item) => unit.includes(item.unit));
//     }

//     setFilterProducts(productsCopy);
//   };

//   useEffect(() => {
//     applyFilter();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category, subCategory, unit, search, showSearch, products]);

//   // Options
//   const categories = ['Dinurado', 'Jasmine', 'Sinandomeng', 'Special'];
//   const subCategories = ['Imported', 'Local', 'Sourced'];
//   const units = ['50kg', '25kg', '10kg', '5kg', '1kg'];

//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
//       {/* Filters Sidebar */}
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           FILTERS
//           <img
//             src={assets.dropdown_icon}
//             className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
//             alt=""
//           />
//         </p>

//         {/* Category Filter */}
//         <div
//           className={`border border-amber-400 pl-5 py-3 mt-6 ${
//             showFilter ? '' : 'hidden'
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             {categories.map((cat) => (
//               <label key={cat} className="flex gap-2">
//                 <input
//                   className="w-3"
//                   type="checkbox"
//                   value={cat}
//                   onChange={(e) =>
//                     toggleItem(e.target.value, category, setCategory)
//                   }
//                   checked={category.includes(cat)}
//                 />
//                 {cat}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* SubCategory Filter */}
//         <div
//           className={`border border-amber-400 pl-5 py-3 my-5 ${
//             showFilter ? '' : 'hidden'
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">TYPE</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             {subCategories.map((sub) => (
//               <label key={sub} className="flex gap-2">
//                 <input
//                   className="w-3"
//                   type="checkbox"
//                   value={sub}
//                   onChange={(e) =>
//                     toggleItem(e.target.value, subCategory, setSubCategory)
//                   }
//                   checked={subCategory.includes(sub)}
//                 />
//                 {sub} Rice
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Unit Filter */}
//         <div
//           className={`border border-amber-400 pl-5 py-3 my-5 ${
//             showFilter ? '' : 'hidden'
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">UNIT</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             {units.map((u) => (
//               <label key={u} className="flex gap-2">
//                 <input
//                   className="w-3"
//                   type="checkbox"
//                   value={u}
//                   onChange={(e) => toggleItem(e.target.value, unit, setUnit)}
//                   checked={unit.includes(u)}
//                 />
//                 {u}
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Section */}
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1="PRICE" text2="LIST" />
//           <select
//             value={addition}
//             onChange={(e) => setAddition(Number(e.target.value))}
//             className="border-2 border-amber-400 text-sm px-1 outline-0"
//           >
//             <option value="100">Pricing Options: Default</option>
//             <option value="80">Charge Rate: 80%</option>
//             <option value="70">Charge Rate: 70%</option>
//             <option value="60">Charge Rate: 60%</option>
//             <option value="50">Charge Rate: 50%</option>
//             <option value="40">Charge Rate: 40%</option>
//             <option value="30">Charge Rate: 30%</option>
//             <option value="20">Charge Rate: 20%</option>
//             <option value="10">Charge Rate: 10%</option>
//           </select>
//         </div>

//         {/* Product List */}
//         <div className="flex flex-col md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-1">
//           {filterProducts.map((item, index) => (
//             <PriceListItem
//               key={item._id || index}
//               supplierName={item.supplierName}
//               id={item._id}
//               item={item.item}
//               price={item.price + addition}
//               image={item.image}
//               unit={item.unit}
//               category={item.category}
//               subCategory={item.subCategory}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PriceList;

import React, { useContext, useEffect, useState } from 'react';
import { PriceContext } from '../context/PriceContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import PriceListItem from '../components/PriceListItem';

const PriceList = () => {
  const { products, search, showSearch } = useContext(PriceContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [unit, setUnit] = useState([]);

  const [addition, setAddition] = useState(100);

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

  const toggleUnit = (e) => {
    if (unit.includes(e.target.value)) {
      setUnit((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setUnit((prev) => [...prev, e.target.value]);
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

    if (unit.length > 0) {
      productsCopy = productsCopy.filter((item) => unit.includes(item.unit));
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory, unit, search, showSearch, products]);

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
        {/* Unit Categorize start here */}
        <div
          className={`border border-amber-400 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">UNIT</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-4">
              <input
                className="w-3"
                type="checkbox"
                value={'50kg'}
                onChange={toggleUnit}
              />
              50kg
            </p>
            <p className="flex gap-4">
              <input
                className="w-3"
                type="checkbox"
                value={'25kg'}
                onChange={toggleUnit}
              />
              25kg
            </p>
            <p className="flex gap-4">
              <input
                className="w-3"
                type="checkbox"
                value={'10kg'}
                onChange={toggleUnit}
              />
              10kg
            </p>
            <p className="flex gap-4">
              <input
                className="w-3"
                type="checkbox"
                value={'5kg'}
                onChange={toggleUnit}
              />
              5kg
            </p>
            <p className="flex gap-4">
              <input
                className="w-3"
                type="checkbox"
                value={'1kg'}
                onChange={toggleUnit}
              />
              1kg
            </p>
          </div>
        </div>
        {/* Unit Categorize end here */}
      </div>{' '}
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'PRICE'} text2={'LIST'} />
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
        <div className="flex flex-col md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-1">
          {filterProducts.map((item, index) => (
            <PriceListItem
              key={item._id || index}
              supplierName={item.supplierName}
              id={item._id}
              item={item.item}
              // supplierPrice={item.supplierPrice}
              // retailerPrice={item.supplierPrice + addition}
              price={item.price + addition}
              image={item.image}
              unit={item.unit}
              category={item.category}
              subCategory={item.subCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceList;
