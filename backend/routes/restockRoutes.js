import express from 'express';
import { restockProduct, getRestockHistoryByVendor,getAllRestockHistory,updateRestock,deleteRestock } from '../controllers/restockController.js';

const router = express.Router();

router.post('/', restockProduct);
router.get('/all', getAllRestockHistory);  
router.get('/:vendorId', getRestockHistoryByVendor);
router.route('/:id').put(updateRestock).delete(deleteRestock);

export default router;
