import express from 'express';
import {
  createPOS,
  getAllPOS,
  getPOSByDate,
  deletePOSById,
} from '../controllers/posController.js';

const router = express.Router();

router.post('/', createPOS);
router.get('/', getAllPOS);
router.get('/date/:date', getPOSByDate); // Optional
router.delete('/:id', deletePOSById);

export default router;
