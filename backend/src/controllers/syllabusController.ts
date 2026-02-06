import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Syllabus } from '../models/Syllabus';
import { AuthRequest } from '../middleware/auth';

// Get all active syllabus (Public)
export const getActiveSyllabus = async (req: Request, res: Response) => {
  try {
    const { class: className, subject } = req.query;

    const filter: any = { isActive: true };
    if (className) filter.class = className;
    if (subject) filter.subject = subject;

    const syllabusList = await Syllabus.find(filter)
      .sort({ class: 1, subject: 1 })
      .select('-uploadedBy')
      .lean();

    res.json({
      success: true,
      data: syllabusList,
    });
  } catch (error: any) {
    console.error('Get syllabus error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch syllabus.',
    });
  }
};

// Get all syllabus (Admin only)
export const getAllSyllabus = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 50, class: className, subject } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter: any = {};
    if (className) filter.class = className;
    if (subject) filter.subject = subject;

    const [syllabusList, total] = await Promise.all([
      Syllabus.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('uploadedBy', 'name email')
        .lean(),
      Syllabus.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        syllabus: syllabusList,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error: any) {
    console.error('Get all syllabus error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch syllabus.',
    });
  }
};

// Create syllabus (Admin only)
export const createSyllabus = async (req: AuthRequest, res: Response) => {
  try {
    const syllabusData = {
      ...req.body,
      syllabusId: `SYL-${uuidv4().split('-')[0].toUpperCase()}`,
      uploadedBy: req.admin._id,
    };

    const syllabus = await Syllabus.create(syllabusData);

    res.status(201).json({
      success: true,
      message: 'Syllabus uploaded successfully.',
      data: syllabus,
    });
  } catch (error: any) {
    console.error('Create syllabus error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload syllabus.',
    });
  }
};

// Update syllabus (Admin only)
export const updateSyllabus = async (req: AuthRequest, res: Response) => {
  try {
    const { title, class: className, subject, academicYear, description, fileUrl, fileSize, isActive } = req.body;
    
    const syllabus = await Syllabus.findByIdAndUpdate(
      req.params.id,
      { title, class: className, subject, academicYear, description, fileUrl, fileSize, isActive },
      { new: true, runValidators: true }
    );

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: 'Syllabus not found.',
      });
    }

    res.json({
      success: true,
      message: 'Syllabus updated successfully.',
      data: syllabus,
    });
  } catch (error: any) {
    console.error('Update syllabus error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update syllabus.',
    });
  }
};

// Delete syllabus (Admin only)
export const deleteSyllabus = async (req: AuthRequest, res: Response) => {
  try {
    const syllabus = await Syllabus.findByIdAndDelete(req.params.id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: 'Syllabus not found.',
      });
    }

    res.json({
      success: true,
      message: 'Syllabus deleted successfully.',
    });
  } catch (error: any) {
    console.error('Delete syllabus error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete syllabus.',
    });
  }
};

// Get syllabus by class (Public)
export const getSyllabusByClass = async (req: Request, res: Response) => {
  try {
    const syllabusList = await Syllabus.find({
      class: req.params.class,
      isActive: true,
    })
      .sort({ subject: 1 })
      .select('-uploadedBy')
      .lean();

    res.json({
      success: true,
      data: syllabusList,
    });
  } catch (error: any) {
    console.error('Get syllabus by class error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch syllabus.',
    });
  }
};
