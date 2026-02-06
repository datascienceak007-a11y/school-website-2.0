import express from 'express';
import {
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  getEnquiryStats,
} from '../controllers/enquiryController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { enquirySchema, updateEnquiryStatusSchema } from '../validators/schemas';

const router = express.Router();

// Public routes
router.post('/', validateRequest(enquirySchema), submitEnquiry);

// Protected routes (Admin only)
router.get('/', authenticate, getAllEnquiries);
router.get('/stats', authenticate, getEnquiryStats);
router.get('/:id', authenticate, getEnquiryById);
router.patch('/:id/status', authenticate, validateRequest(updateEnquiryStatusSchema), updateEnquiryStatus);

export default router;
