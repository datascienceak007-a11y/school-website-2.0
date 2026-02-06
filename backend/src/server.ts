import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './database';
import { errorHandler } from './middleware/errorHandler';
import enquiryRoutes from './routes/enquiryRoutes';
import authRoutes from './routes/authRoutes';
import galleryRoutes from './routes/galleryRoutes';
import announcementRoutes from './routes/announcementRoutes';
import syllabusRoutes from './routes/syllabusRoutes';
import sliderRoutes from './routes/sliderRoutes';
import staffRoutes from './routes/staffRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// API Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/slider', sliderRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use(errorHandler);

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  });
});

export default app;
