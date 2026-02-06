import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Enquiry } from '../models/Enquiry';
import { AuthRequest } from '../middleware/auth';

// Submit enquiry (Public)
export const submitEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiryData = {
      ...req.body,
      enquiryId: `ENQ-${uuidv4().split('-')[0].toUpperCase()}`,
    };

    const enquiry = await Enquiry.create(enquiryData);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will contact you within 24 hours.',
      data: {
        enquiryId: enquiry.enquiryId,
        studentName: enquiry.studentName,
        branch: enquiry.branch,
      },
    });
  } catch (error: any) {
    console.error('Submit enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again.',
    });
  }
};

// Get all enquiries (Admin only)
export const getAllEnquiries = async (req: AuthRequest, res: Response) => {
  try {
    const { branch, status, page = 1, limit = 20 } = req.query;

    const filter: any = {};
    if (branch) filter.branch = branch;
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        enquiries,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error: any) {
    console.error('Get enquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries.',
    });
  }
};

// Get single enquiry (Admin only)
export const getEnquiryById = async (req: AuthRequest, res: Response) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.json({
      success: true,
      data: enquiry,
    });
  } catch (error: any) {
    console.error('Get enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry.',
    });
  }
};

// Update enquiry status (Admin only)
export const updateEnquiryStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.json({
      success: true,
      message: 'Enquiry status updated successfully.',
      data: enquiry,
    });
  } catch (error: any) {
    console.error('Update enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status.',
    });
  }
};

// Get enquiry statistics (Admin only)
export const getEnquiryStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await Enquiry.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
          },
          contacted: {
            $sum: { $cond: [{ $eq: ['$status', 'contacted'] }, 1, 0] },
          },
          enrolled: {
            $sum: { $cond: [{ $eq: ['$status', 'enrolled'] }, 1, 0] },
          },
          rejected: {
            $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] },
          },
        },
      },
    ]);

    const branchStats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$branch',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        overall: stats[0] || { total: 0, pending: 0, contacted: 0, enrolled: 0, rejected: 0 },
        byBranch: branchStats,
      },
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics.',
    });
  }
};
