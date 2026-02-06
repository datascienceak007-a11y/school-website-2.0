import mongoose from 'mongoose';
import { Admin } from './models/Admin';

export const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/excellence_academy';
    
    await mongoose.connect(mongoUrl);
    
    console.log('✅ MongoDB connected successfully');
    
    // Create default admin if doesn't exist
    await createDefaultAdmin();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ 
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@excellenceacademy.edu' 
    });

    if (!adminExists) {
      await Admin.create({
        email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@excellenceacademy.edu',
        password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123',
        name: 'System Administrator',
        role: 'super_admin',
        isActive: true,
      });
      console.log('✅ Default admin created');
      console.log('   Email:', process.env.DEFAULT_ADMIN_EMAIL || 'admin@excellenceacademy.edu');
      console.log('   Password:', process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};
