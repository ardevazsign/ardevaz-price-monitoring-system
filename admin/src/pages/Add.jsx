import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [item, setItem] = useState('');
  const [unit, setUnit] = useState([]);
  const [price, setPrice] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [category, setCategory] = useState('dinurado');
  const [subCategory, setSubCategory] = useState('local');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (image1 && !image1.type.startsWith('image/')) {
      return toast.error('Only image files are allowed');
    }

    if (unit.length === 0) {
      return toast.error('Please select at least one unit');
    }

    try {
      const formData = new FormData();
      formData.append('item', item);
      formData.append('unit', JSON.stringify(unit));
      formData.append('price', price);
      formData.append('supplierName', supplierName);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      if (image1) formData.append('image1', image1);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setItem('');
        setUnit([]);
        setPrice('');
        setSupplierName('');
        setCategory('Dinurado');
        setSubCategory('Imported');
        setImage1(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const toggleUnit = (selectedUnit) => {
    setUnit((prev) =>
      prev.includes(selectedUnit)
        ? prev.filter((item) => item !== selectedUnit)
        : [...prev, selectedUnit]
    );
  };

  return (
    <div className="h-screen overflow-y-auto p-2 sm:p-4 md:p-6 bg-amber-50">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 rounded-2xl border-4 border-cyan-300 shadow-md"
      >
        <p className="font-bold text-xl text-amber-500 mb-4 text-center">
          Add New Product Item
        </p>

        <div className="mb-4">
          <p className="mb-2 font-medium text-sm">Upload Image</p>
          <label htmlFor="image1" className="cursor-pointer">
            <img
              className="w-32 h-32 object-cover border rounded-lg"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="Upload"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Item Name</label>
          <input
            onChange={(e) => setItem(e.target.value)}
            value={item}
            className="w-full px-3 py-2 border rounded shadow-sm"
            type="text"
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="mb-4">
          <p className="mb-1 text-sm font-medium">Unit</p>
          <div className="flex flex-wrap gap-3">
            {['5kg', '10kg', '25kg', '50kg'].map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => toggleUnit(u)}
                className={`px-4 py-1 rounded shadow-md text-white font-medium ${
                  unit.includes(u) ? 'bg-amber-400' : 'bg-slate-500'
                } hover:bg-amber-300 transition-all`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Product Price</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border rounded shadow-sm"
            type="number"
            placeholder="e.g. 50"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm">Rice Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-3 py-2 border rounded shadow-sm"
            >
              <option value="Dinurado">Dinurado</option>
              <option value="Sinandomeng">Sinandomeng</option>
              <option value="Jasmine">Jasmine</option>
              <option value="Special">Special Rice</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Sub Category</label>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="w-full px-3 py-2 border rounded shadow-sm"
            >
              <option value="Local">Local Rice</option>
              <option value="Imported">Imported Rice</option>
              <option value="Sourced">Sourced</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Supplier Name</label>
          <input
            onChange={(e) => setSupplierName(e.target.value)}
            value={supplierName}
            className="w-full px-3 py-2 border rounded shadow-sm"
            type="text"
            placeholder="Enter supplier name"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-40 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded shadow-lg transition-all"
          >
            ADD ITEM
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;

// The Original Code Below Here

// import React, { useState } from 'react';
// import { assets } from '../assets/assets';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const Add = ({ token }) => {
//   //
//   const [image1, setImage1] = useState(false);
//   //
//   const [item, setItem] = useState('');
//   const [unit, setUnit] = useState([]);
//   const [price, setPrice] = useState('');
//   const [supplierName, setSupplierName] = useState('');
//   const [category, setCategory] = useState('dinurado');
//   const [subCategory, setSubCategory] = useState('local');
//   //
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (image1 && !image1.type.startsWith('image/')) {
//       return toast.error('Only image files are allowed');
//     }

//     // Validate at least one unit is selected
//     if (unit.length === 0) {
//       return toast.error('Please select at least one unit');
//     }

//     try {
//       const formData = new FormData();
//       //
//       formData.append('item', item);
//       formData.append('unit', JSON.stringify(unit));
//       formData.append('price', price);
//       formData.append('supplierName', supplierName);
//       formData.append('category', category);
//       formData.append('subCategory', subCategory);

//       if (image1) formData.append('image1', image1);
//       // prettier-ignore
//       const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token }, });

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setItem('');
//         setUnit([]);
//         setPrice('');
//         setSupplierName('');
//         setCategory('Dinurado');
//         setSubCategory('Imported');
//         setImage1(null);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const toggleUnit = (selectedUnit) => {
//     setUnit((prev) =>
//       prev.includes(selectedUnit)
//         ? prev.filter((item) => item !== selectedUnit)
//         : [...prev, selectedUnit]
//     );
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="bg-white p-10 rounded-2xl border-4 border-cyan-300"
//     >
//       <div>
//         <p className="font-bold text-lg text-amber-400">Add New Item</p>
//         <p className="mb-4">Upload Image</p>
//         <div>
//           <label htmlFor="image1">
//             <img
//               className="w-30"
//               src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
//               alt=""
//             />
//             <input
//               onChange={(e) => setImage1(e.target.files[0])}
//               type="file"
//               id="image1"
//               hidden
//             />
//           </label>
//         </div>
//       </div>
//       <div className="w-full">
//         <p className="mb-4 mt-4">Item name</p>
//         <input
//           onChange={(e) => setItem(e.target.value)}
//           value={item}
//           className="w-full max-w-[500px] px-3 py-2"
//           type="text"
//           placeholder="Type here"
//           required
//         />
//       </div>

//       <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
//         <div>
//           <p className="mt-4 mb-4">Unit</p>

//           <div className="flex gap-3">
//             {['5kg', '10kg', '25kg', '50kg'].map((u) => (
//               <div key={u} onClick={() => toggleUnit(u)}>
//                 <p
//                   className={`${
//                     unit.includes(u) ? 'bg-amber-400' : 'bg-slate-400'
//                   } px-3 py-1 cursor-pointer rounded font-medium hover:bg-amber-300 text-white`}
//                 >
//                   {u}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="w-full">
//           <p className="mb-4 mt-4">Product Price</p>
//           <input
//             onChange={(e) => setPrice(e.target.value)}
//             value={price}
//             className="w-50 px-3 py-2"
//             type="number"
//             placeholder="40"
//             required
//           />
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
//         <div>
//           <p className="mb-4 mt-4">Rice Category</p>
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             className=" px-12 py-2"
//             value={category}
//           >
//             <option value="Dinurado">Dinurado</option>
//             <option value="Sinandomeng">Sinandomeng</option>
//             <option value="Jasmine">Jasmine</option>
//             <option value="Special">Special Rice</option>
//           </select>
//         </div>
//         <div>
//           <p className="mb-4 mt-4">Sub Category</p>
//           <select
//             onChange={(e) => setSubCategory(e.target.value)}
//             className=" px-12 py-2"
//             value={subCategory}
//           >
//             <option value="Local">Local Rice</option>
//             <option value="Imported">Imported Rice</option>
//             <option value="Sourced">Sourced</option>
//           </select>
//         </div>
//       </div>
//       <div className="w-full">
//         <p className="mb-4 mt-4">Supplier Name</p>
//         <input
//           onChange={(e) => setSupplierName(e.target.value)}
//           value={supplierName}
//           className="w-full max-w-[500px] px-3 py-2"
//           type="text"
//           placeholder="Type here"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-28 py-3 px4 bg-amber-400 text-white shadow-lg rounded mt-4 hover:bg-amber-300 active:scale-95 transition-transform, active:bg-gray-600 transition-colors"
//       >
//         ADD ITEM
//       </button>
//     </form>
//   );
// };

// export default Add;
