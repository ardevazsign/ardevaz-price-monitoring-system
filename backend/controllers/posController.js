import POS from '../models/posModel.js';

// Add a new POS sales record
export const createPOS = async (req, res) => {
  try {
    const { date, items } = req.body;

    if (!date || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: 'Date and at least one item are required.' });
    }

    // Calculate total kilos and total cash
    const totalKilos = items.reduce(
      (sum, item) => sum + parseFloat(item.kilos),
      0
    );
    const totalCash = items.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );

    const newPOS = new POS({
      date,
      items,
      totalKilos,
      totalCash,
    });

    await newPOS.save();
    res.status(201).json(newPOS);
  } catch (error) {
    console.error('Error creating POS record:', error);
    res
      .status(500)
      .json({ message: 'Server error. Could not create POS record.' });
  }
};

// Get all POS sales history
export const getAllPOS = async (req, res) => {
  try {
    const sales = await POS.find().sort({ date: -1 });
    res.status(200).json(sales);
  } catch (error) {
    console.error('Error fetching POS records:', error);
    res
      .status(500)
      .json({ message: 'Server error. Could not fetch POS records.' });
  }
};

// Optional: Get POS sales by date
export const getPOSByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const record = await POS.findOne({ date });

    if (!record) {
      return res.status(404).json({ message: 'No sales found for this date.' });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error('Error fetching POS by date:', error);
    res
      .status(500)
      .json({ message: 'Server error. Could not fetch record by date.' });
  }
};

export const deletePOSById = async (req, res) => {
  try {
    const deleted = await POS.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'POS not found' });
    res.json({ message: 'POS deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export { createPOS, getAllPOS, getPOSByDate };
