import express from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';
import { validateLogin, validateRegister } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/me', protect, getCurrentUser);

export default router;
