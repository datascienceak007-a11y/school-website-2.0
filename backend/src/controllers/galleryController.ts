import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Gallery } from '../models/Gallery';
import { AuthRequest } from '../middleware/auth';

// Get all gallery images (Public)
export const getAllImages = async (req: AuthRequest, res: Response) => {
  try {
    const { category, branch } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (branch && branch !== 'All') filter.branch = branch;

    const images = await Gallery.find(filter)
      .sort({ createdAt: -1 })
      .select('-uploadedBy')
      .lean();

    res.json({
      success: true,
      data: images,
    });
  } catch (error: any) {
    console.error('Get images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery images.',
    });
  }
};

// Upload image (Admin only)
export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    const imageData = {
      ...req.body,
      imageId: `IMG-${uuidv4().split('-')[0].toUpperCase()}`,
      uploadedBy: req.admin._id,
    };

    const image = await Gallery.create(imageData);

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully.',
      data: image,
    });
  } catch (error: any) {
    console.error('Upload image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image.',
    });
  }
};

// Delete image (Admin only)
export const deleteImage = async (req: AuthRequest, res: Response) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found.',
      });
    }

    res.json({
      success: true,
      message: 'Image deleted successfully.',
    });
  } catch (error: any) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image.',
    });
  }
};

// Update image (Admin only)
export const updateImage = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, description, branch } = req.body;
    
    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, category, description, branch },
      { new: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found.',
      });
    }

    res.json({
      success: true,
      message: 'Image updated successfully.',
      data: image,
    });
  } catch (error: any) {
    console.error('Update image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update image.',
    });
  }
};
