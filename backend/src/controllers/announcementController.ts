import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Announcement } from '../models/Announcement';
import { AuthRequest } from '../middleware/auth';

// Get active announcements (Public)
export const getActiveAnnouncements = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    
    const announcements = await Announcement.find({
      isActive: true,
      startDate: { $lte: now },
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: null },
        { expiryDate: { $gte: now } }
      ]
    })
      .sort({ isPinned: -1, isImportant: -1, startDate: -1 })
      .select('-createdBy')
      .lean();

    res.json({
      success: true,
      data: announcements,
    });
  } catch (error: any) {
    console.error('Get announcements error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements.',
    });
  }
};

// Get all announcements (Admin only)
export const getAllAnnouncements = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [announcements, total] = await Promise.all([
      Announcement.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('createdBy', 'name email')
        .lean(),
      Announcement.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        announcements,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error: any) {
    console.error('Get all announcements error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements.',
    });
  }
};

// Create announcement (Admin only)
export const createAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const announcementData = {
      ...req.body,
      announcementId: `ANN-${uuidv4().split('-')[0].toUpperCase()}`,
      createdBy: req.admin._id,
    };

    const announcement = await Announcement.create(announcementData);

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully.',
      data: announcement,
    });
  } catch (error: any) {
    console.error('Create announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create announcement.',
    });
  }
};

// Update announcement (Admin only)
export const updateAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const { title, message, isImportant, isPinned, startDate, expiryDate, isActive } = req.body;
    
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, message, isImportant, isPinned, startDate, expiryDate, isActive },
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found.',
      });
    }

    res.json({
      success: true,
      message: 'Announcement updated successfully.',
      data: announcement,
    });
  } catch (error: any) {
    console.error('Update announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update announcement.',
    });
  }
};

// Delete announcement (Admin only)
export const deleteAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found.',
      });
    }

    res.json({
      success: true,
      message: 'Announcement deleted successfully.',
    });
  } catch (error: any) {
    console.error('Delete announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete announcement.',
    });
  }
};

// Toggle active status (Admin only)
export const toggleAnnouncementStatus = async (req: AuthRequest, res: Response) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found.',
      });
    }

    announcement.isActive = !announcement.isActive;
    await announcement.save();

    res.json({
      success: true,
      message: `Announcement ${announcement.isActive ? 'activated' : 'deactivated'} successfully.`,
      data: announcement,
    });
  } catch (error: any) {
    console.error('Toggle status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle announcement status.',
    });
  }
};
