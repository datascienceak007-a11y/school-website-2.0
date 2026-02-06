import mongoose, { Document, Schema } from 'mongoose';

export interface IGallery extends Document {
  imageId: string;
  title: string;
  category: 'Campus' | 'Classrooms' | 'Sports' | 'Events' | 'Activities';
  imageUrl: string;
  description?: string;
  branch?: string;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new Schema<IGallery>(
  {
    imageId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Campus', 'Classrooms', 'Sports', 'Events', 'Activities'],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      enum: ['North Campus', 'South Campus', 'East Campus', 'All'],
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
gallerySchema.index({ category: 1 });
gallerySchema.index({ branch: 1 });

export const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);
