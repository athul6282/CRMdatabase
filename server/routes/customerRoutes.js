import express from 'express';
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from '../controllers/customerController.js';
import protect from '../middleware/authMiddleware.js';
import { validateCustomer } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getCustomers).post(validateCustomer, createCustomer);
router.route('/:id').put(validateCustomer, updateCustomer).delete(deleteCustomer);

export default router;
