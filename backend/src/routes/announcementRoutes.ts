import express from 'express';
import {
  getActiveAnnouncements,
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementStatus,
} from '../controllers/announcementController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { announcementSchema } from '../validators/schemas';

const router = express.Router();

// Public routes
router.get('/active', getActiveAnnouncements);

// Protected routes (Admin only)
router.get('/', authenticate, getAllAnnouncements);
router.post('/', authenticate, validateRequest(announcementSchema), createAnnouncement);
router.patch('/:id', authenticate, updateAnnouncement);
router.delete('/:id', authenticate, deleteAnnouncement);
router.patch('/:id/toggle', authenticate, toggleAnnouncementStatus);

export default router;
