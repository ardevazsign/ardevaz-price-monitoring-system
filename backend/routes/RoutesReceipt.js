import express from 'express';
// const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipt'); // adjust path as needed

router.get('/receiptlist', async (req, res) => {
  try {
    const receipts = await Receipt.find().sort({ deliveryDate: -1 });
    res.json({ success: true, receipts });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Update receipt
router.post('/update', async (req, res) => {
  const { id, supplierName, receiptNumber, totalAmount, status, deliveryDate } =
    req.body;

  if (!id)
    return res.json({ success: false, message: 'Receipt ID is required' });

  try {
    const receipt = await Receipt.findById(id);
    if (!receipt)
      return res.json({ success: false, message: 'Receipt not found' });

    // Update fields
    receipt.supplierName = supplierName;
    receipt.receiptNumber = receiptNumber;
    receipt.totalAmount = totalAmount;
    receipt.status = status;
    receipt.deliveryDate = deliveryDate;

    await receipt.save();

    return res.json({ success: true, message: 'Receipt updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/remove', async (req, res) => {
  const { id } = req.body;
  try {
    await Receipt.findByIdAndDelete(id);
    res.json({ success: true, message: 'Receipt deleted' });
  } catch (error) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
