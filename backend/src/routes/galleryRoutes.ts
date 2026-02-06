import express from 'express';
import {
  getAllImages,
  uploadImage,
  deleteImage,
  updateImage,
} from '../controllers/galleryController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { gallerySchema } from '../validators/schemas';

const router = express.Router();

// Public routes
router.get('/', getAllImages);

// Protected routes (Admin only)
router.post('/', authenticate, validateRequest(gallerySchema), uploadImage);
router.patch('/:id', authenticate, updateImage);
router.delete('/:id', authenticate, deleteImage);

export default router;
