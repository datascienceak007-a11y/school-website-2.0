import mongoose, { Document, Schema } from 'mongoose';

export interface IEnquiry extends Document {
  enquiryId: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  branch: string;
  grade: string;
  message?: string;
  status: 'pending' | 'contacted' | 'enrolled' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    enquiryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      enum: ['North Campus', 'South Campus', 'East Campus'],
    },
    grade: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'enrolled', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
enquirySchema.index({ branch: 1, status: 1 });
enquirySchema.index({ createdAt: -1 });

export const Enquiry = mongoose.model<IEnquiry>('Enquiry', enquirySchema);
