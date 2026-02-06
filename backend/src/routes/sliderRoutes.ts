import express from 'express';
import {
  getActiveSlides,
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
  reorderSlides,
  toggleSlideStatus,
} from '../controllers/sliderController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { sliderSchema } from '../validators/schemas';

const router = express.Router();

// Public routes
router.get('/active', getActiveSlides);

// Protected routes (Admin only)
router.get('/', authenticate, getAllSlides);
router.post('/', authenticate, validateRequest(sliderSchema), createSlide);
router.patch('/:id', authenticate, updateSlide);
router.delete('/:id', authenticate, deleteSlide);
router.post('/reorder', authenticate, reorderSlides);
router.patch('/:id/toggle', authenticate, toggleSlideStatus);

export default router;
