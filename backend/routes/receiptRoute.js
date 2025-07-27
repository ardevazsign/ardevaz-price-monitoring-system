import express from 'express';
// prettier-ignore
import {addReceipt,listReceipts,removeReceipt,singleReceipt,updateReceipt,getReceiptItemSummary,getAllReceipts} from '../controllers/receiptController.js';

const receiptRouter = express.Router();

receiptRouter.post('/add', addReceipt);
receiptRouter.post('/remove', removeReceipt);
receiptRouter.post('/single', singleReceipt);
receiptRouter.get('/receiptlist', getAllReceipts, listReceipts);
receiptRouter.post('/update', updateReceipt);
receiptRouter.get('/item-summary', getReceiptItemSummary);
// prettier-ignore
// receiptRouter.get('/stock-summary',getStockSummary);

export default receiptRouter;
