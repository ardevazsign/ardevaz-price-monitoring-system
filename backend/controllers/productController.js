import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
// Function for add product
const addProduct = async (req, res) => {
  try {
    const { item, unit, supplierName, price, category, subCategory } = req.body;

    if (
      !item ||
      !unit ||
      !supplierName ||
      !price ||
      !category ||
      !subCategory
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    // Ensure files are present
    const image1 = req.files?.image1?.[0]; // safer optional chaining

    const images = [image1].filter((file) => file !== undefined);

    // const image1 = req.files.image1 && req.file.image1[0];
    // console.log(item, unit, supplierName, price, category, subCategory);
    // console.log(image1);

    // res.json({});

    // const images = [image1].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    const productData = {
      item,
      unit: JSON.parse(unit),
      supplierName,
      price: Number(price),
      category,
      subCategory,
      image: imagesUrl,
      updated: Date.now(),
    };

    console.log(productData);

    // save product
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
