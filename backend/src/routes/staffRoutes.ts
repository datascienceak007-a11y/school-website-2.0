import express from 'express';
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  resetStaffPassword,
} from '../controllers/staffController';
import { authenticate } from '../middleware/auth';
import { requireOwner } from '../middleware/roleCheck';
import { validateRequest } from '../middleware/validation';
import { createStaffSchema, updateStaffSchema, resetPasswordSchema } from '../validators/schemas';

const router = express.Router();

// All routes require authentication and owner role
router.use(authenticate);
router.use(requireOwner);

router.get('/', getAllStaff);
router.post('/', validateRequest(createStaffSchema), createStaff);
router.patch('/:id', validateRequest(updateStaffSchema), updateStaff);
router.delete('/:id', deleteStaff);
router.post('/:id/reset-password', validateRequest(resetPasswordSchema), resetStaffPassword);

export default router;
