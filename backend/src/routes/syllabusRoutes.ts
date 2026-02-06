import express from 'express';
import {
  getActiveSyllabus,
  getAllSyllabus,
  createSyllabus,
  updateSyllabus,
  deleteSyllabus,
  getSyllabusByClass,
} from '../controllers/syllabusController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { syllabusSchema } from '../validators/schemas';

const router = express.Router();

// Public routes
router.get('/active', getActiveSyllabus);
router.get('/class/:class', getSyllabusByClass);

// Protected routes (Admin only)
router.get('/', authenticate, getAllSyllabus);
router.post('/', authenticate, validateRequest(syllabusSchema), createSyllabus);
router.patch('/:id', authenticate, updateSyllabus);
router.delete('/:id', authenticate, deleteSyllabus);

export default router;
