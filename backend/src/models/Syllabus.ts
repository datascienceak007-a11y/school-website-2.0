import mongoose, { Document, Schema } from 'mongoose';

export interface ISyllabus extends Document {
  syllabusId: string;
  title: string;
  class: string;
  subject: string;
  academicYear: string;
  description?: string;
  fileUrl: string;
  fileSize?: string;
  uploadedBy: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const syllabusSchema = new Schema<ISyllabus>(
  {
    syllabusId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    class: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    subject: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    academicYear: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
syllabusSchema.index({ class: 1, subject: 1 });
syllabusSchema.index({ isActive: 1 });
syllabusSchema.index({ academicYear: -1 });

export const Syllabus = mongoose.model<ISyllabus>('Syllabus', syllabusSchema);
