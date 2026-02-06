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

export const announcementSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  isImportant: z.boolean().optional().default(false),
  isPinned: z.boolean().optional().default(false),
  startDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export const syllabusSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  class: z.enum([
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
    'Class 11',
    'Class 12',
  ]),
  subject: z.enum([
    'English',
    'Mathematics',
    'Science',
    'Social Studies',
    'Hindi',
    'Computer Science',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'Economics',
    'Business Studies',
    'Accountancy',
    'Political Science',
    'Physical Education',
    'Art',
    'Music',
  ]),
  academicYear: z.string().min(4, 'Academic year is required'),
  description: z.string().max(500).optional(),
  fileUrl: z.string().url('Invalid file URL'),
  fileSize: z.string().optional(),
  isActive: z.boolean().optional().default(true),
});
