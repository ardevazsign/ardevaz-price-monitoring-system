import express from 'express';
// prettier-ignore
import {addProduct,listProducts,removeProduct,singleProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();
// prettier-ignore
productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }]),addProduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/productlist', listProducts);

export default productRouter;
