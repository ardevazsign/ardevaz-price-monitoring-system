import receiptModel from '../models/receiptModel.js';

// function for add receipt
const addReceipt = async (req, res) => {
  try {
    //
    const receiptData = req.body;
    const newReceipt = new receiptModel(receiptData);
    const savedReceipt = await newReceipt.save();
    res
      .status(201)
      .json({ success: true, message: 'Receipt created', data: savedReceipt });
  } catch (error) {
    // prettier-ignore
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to create receipt',
      message: error.message,
    });
  }
};

// function for list receipt
const listReceipts = async (req, res) => {
  try {
    const receipts = await receiptModel.find({});
    res.json({ success: true, receipts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for removing receipt
const removeReceipt = async (req, res) => {
  try {
    const { id } = req.body;
    await receiptModel.findByIdAndDelete(id);
    res.json({ success: true, message: 'Receipt Removed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
  //
};

// function for single receipt
const singleReceipt = async (req, res) => {
  try {
    const { receiptId } = req.body;
    const receipt = await receiptModel.findById(receiptId);
    if (!receipt) {
      return res
        .status(404)
        .json({ success: false, message: 'Receipt not found' });
    }
    res.json({ success: true, receipt });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateReceipt = async (req, res) => {
  try {
    const {
      id,
      supplierName,
      receiptNumber,
      totalAmount,
      status,
      deliveryDate,
    } = req.body;

    const updated = await receiptModel.findByIdAndUpdate(
      id,
      { supplierName, receiptNumber, totalAmount, status, deliveryDate },
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: 'Receipt not found' });

    res.json({
      success: true,
      message: 'Receipt updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Update Error:', error.message);
    res
      .status(500)
      .json({ success: false, message: 'Update failed', error: error.message });
  }
};

const getReceiptItemSummary = async (req, res) => {
  try {
    const summary = await receiptModel.aggregate([
      { $unwind: '$items' }, // Break items[] array into separate docs
      {
        $group: {
          _id: {
            article: '$items.article',
            unit: '$items.unit',
            unitPrice: '$items.unitPrice',
          },
          quantity: { $sum: '$items.quantity' },
          totalAmount: { $sum: '$items.totalAmount' },
        },
      },
      {
        $project: {
          _id: 0,
          article: '$_id.article',
          unit: '$_id.unit',
          unitPrice: '$_id.unitPrice',
          quantity: 1,
          totalAmount: 1,
        },
      },
      { $sort: { article: 1 } },
    ]);

    res.status(200).json({ success: true, summary });
  } catch (error) {
    console.error('Item Summary Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// controllers/receiptController.js

const getAllReceipts = async (req, res) => {
  try {
    const receipts = await receiptModel.find().sort({ deliveryDate: -1 });
    res.json({ success: true, receipts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch receipts',
      error: err.message,
    });
  }
};

// prettier-ignore
export {addReceipt,listReceipts,removeReceipt,singleReceipt,updateReceipt,getReceiptItemSummary,getAllReceipts,};
