import mongoose, { Document, Schema } from 'mongoose';

export interface IAnnouncement extends Document {
  announcementId: string;
  title: string;
  message: string;
  isImportant: boolean;
  isPinned: boolean;
  startDate: Date;
  expiryDate?: Date;
  createdBy: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    announcementId: {
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
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
    },
    createdBy: {
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
announcementSchema.index({ isActive: 1, startDate: -1 });
announcementSchema.index({ isPinned: -1, isImportant: -1 });

export const Announcement = mongoose.model<IAnnouncement>('Announcement', announcementSchema);
