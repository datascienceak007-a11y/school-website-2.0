import { Response } from 'express';
import { Admin } from '../models/Admin';
import { AuthRequest } from '../middleware/auth';

// Get all staff members (Owner only)
export const getAllStaff = async (req: AuthRequest, res: Response) => {
  try {
    const staff = await Admin.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: staff,
    });
  } catch (error: any) {
    console.error('Get staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff members.',
    });
  }
};

// Create staff member (Owner only)
export const createStaff = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists.',
      });
    }

    // Create new admin
    const admin = await Admin.create({
      email,
      password,
      name,
      role: role || 'admin',
      isActive: true,
    });

    const adminData = admin.toObject();
    delete (adminData as any).password;

    res.status(201).json({
      success: true,
      message: 'Staff member created successfully.',
      data: adminData,
    });
  } catch (error: any) {
    console.error('Create staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create staff member.',
    });
  }
};

// Update staff member (Owner only)
export const updateStaff = async (req: AuthRequest, res: Response) => {
  try {
    const { name, role, isActive } = req.body;
    
    // Prevent owner from modifying themselves
    if (req.params.id === req.admin._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify your own account.',
      });
    }

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, role, isActive },
      { new: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found.',
      });
    }

    res.json({
      success: true,
      message: 'Staff member updated successfully.',
      data: admin,
    });
  } catch (error: any) {
    console.error('Update staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update staff member.',
    });
  }
};

// Delete staff member (Owner only)
export const deleteStaff = async (req: AuthRequest, res: Response) => {
  try {
    // Prevent owner from deleting themselves
    if (req.params.id === req.admin._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account.',
      });
    }

    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found.',
      });
    }

    res.json({
      success: true,
      message: 'Staff member deleted successfully.',
    });
  } catch (error: any) {
    console.error('Delete staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete staff member.',
    });
  }
};

// Reset staff password (Owner only)
export const resetStaffPassword = async (req: AuthRequest, res: Response) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters.',
      });
    }

    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found.',
      });
    }

    admin.password = password;
    await admin.save();

    res.json({
      success: true,
      message: 'Password reset successfully.',
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password.',
    });
  }
};
