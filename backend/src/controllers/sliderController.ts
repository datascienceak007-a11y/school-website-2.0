import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Slider } from '../models/Slider';
import { AuthRequest } from '../middleware/auth';

// Get active slides (Public)
export const getActiveSlides = async (req: Request, res: Response) => {
  try {
    const slides = await Slider.find({ isActive: true })
      .sort({ order: 1 })
      .select('-uploadedBy')
      .lean();

    res.json({
      success: true,
      data: slides,
    });
  } catch (error: any) {
    console.error('Get slides error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch slides.',
    });
  }
};

// Get all slides (Admin only)
export const getAllSlides = async (req: AuthRequest, res: Response) => {
  try {
    const slides = await Slider.find()
      .sort({ order: 1 })
      .populate('uploadedBy', 'name email')
      .lean();

    res.json({
      success: true,
      data: slides,
    });
  } catch (error: any) {
    console.error('Get all slides error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch slides.',
    });
  }
};

// Create slide (Admin only)
export const createSlide = async (req: AuthRequest, res: Response) => {
  try {
    // Get the highest order number
    const highestOrder = await Slider.findOne().sort({ order: -1 }).select('order');
    const nextOrder = highestOrder ? highestOrder.order + 1 : 1;

    const slideData = {
      ...req.body,
      sliderId: `SLD-${uuidv4().split('-')[0].toUpperCase()}`,
      uploadedBy: req.admin._id,
      order: nextOrder,
    };

    const slide = await Slider.create(slideData);

    res.status(201).json({
      success: true,
      message: 'Slide created successfully.',
      data: slide,
    });
  } catch (error: any) {
    console.error('Create slide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create slide.',
    });
  }
};

// Update slide (Admin only)
export const updateSlide = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, imageUrl, buttonText, buttonLink, order, isActive } = req.body;
    
    const slide = await Slider.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, buttonText, buttonLink, order, isActive },
      { new: true, runValidators: true }
    );

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Slide not found.',
      });
    }

    res.json({
      success: true,
      message: 'Slide updated successfully.',
      data: slide,
    });
  } catch (error: any) {
    console.error('Update slide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update slide.',
    });
  }
};

// Delete slide (Admin only)
export const deleteSlide = async (req: AuthRequest, res: Response) => {
  try {
    const slide = await Slider.findByIdAndDelete(req.params.id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Slide not found.',
      });
    }

    // Reorder remaining slides
    await Slider.updateMany(
      { order: { $gt: slide.order } },
      { $inc: { order: -1 } }
    );

    res.json({
      success: true,
      message: 'Slide deleted successfully.',
    });
  } catch (error: any) {
    console.error('Delete slide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete slide.',
    });
  }
};

// Reorder slides (Admin only)
export const reorderSlides = async (req: AuthRequest, res: Response) => {
  try {
    const { slides } = req.body; // Array of { id, order }

    const updatePromises = slides.map((slide: { id: string; order: number }) =>
      Slider.findByIdAndUpdate(slide.id, { order: slide.order })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Slides reordered successfully.',
    });
  } catch (error: any) {
    console.error('Reorder slides error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder slides.',
    });
  }
};

// Toggle slide status (Admin only)
export const toggleSlideStatus = async (req: AuthRequest, res: Response) => {
  try {
    const slide = await Slider.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Slide not found.',
      });
    }

    slide.isActive = !slide.isActive;
    await slide.save();

    res.json({
      success: true,
      message: `Slide ${slide.isActive ? 'activated' : 'deactivated'} successfully.`,
      data: slide,
    });
  } catch (error: any) {
    console.error('Toggle status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle slide status.',
    });
  }
};
