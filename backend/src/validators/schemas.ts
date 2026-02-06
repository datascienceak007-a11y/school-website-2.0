import { z } from 'zod';

export const enquirySchema = z.object({
  studentName: z.string().min(2, 'Student name must be at least 2 characters').max(100),
  parentName: z.string().min(2, 'Parent name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters').max(20),
  branch: z.enum(['North Campus', 'South Campus', 'East Campus']),
  grade: z.string().min(1, 'Please select a grade'),
  message: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const gallerySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(200),
  category: z.enum(['Campus', 'Classrooms', 'Sports', 'Events', 'Activities']),
  imageUrl: z.string().url('Invalid image URL'),
  description: z.string().optional(),
  branch: z.enum(['North Campus', 'South Campus', 'East Campus', 'All']).optional(),
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(['pending', 'contacted', 'enrolled', 'rejected']),
});
