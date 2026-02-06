import express from 'express';
import { login, verifyToken, getProfile } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { loginSchema } from '../validators/schemas';

const router = express.Router();

// Public routes
router.post('/login', validateRequest(loginSchema), login);

// Protected routes
router.get('/verify', authenticate, verifyToken);
router.get('/profile', authenticate, getProfile);

export default router;
