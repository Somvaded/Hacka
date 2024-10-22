import mongoose, { Schema, Document } from 'mongoose';

export interface MentalHealthAssessment {
  date: Date;
  mood?: 'happy' | 'sad' | 'angry' | 'neutral';
  anxietyLevel?: number;  
  stressLevel?: number;   
  socialInteraction?: 'very social' | 'neutral' | 'withdrawn';
  sleepQuality?: 'very good' | 'good' | 'average' | 'poor';
  appetiteChanges?: 'no change' | 'decreased' | 'increased';
  isFeelingSafe?: boolean;
  additionalNotes?: string;
}

export interface MentalHealthTracking extends Document {
  userId: string;
  assessments: MentalHealthAssessment[];
  createdAt: Date;
  updatedAt: Date;
}

const MentalHealthTrackingSchema: Schema<MentalHealthTracking> = new Schema({
  userId: { type: String, required: true },
  assessments: [
    {
      date: { type: Date, default: Date.now, required: true },
      mood: { type: String, enum: ['happy', 'sad', 'angry', 'neutral'], required: false },
      anxietyLevel: { type: Number, min: 0, max: 10, required: false },
      stressLevel: { type: Number, min: 0, max: 10, required: false },
      socialInteraction: { type: String, enum: ['very social', 'neutral', 'withdrawn'], required: false },
      sleepQuality: { type: String, enum: ['very good', 'good', 'average', 'poor'], required: false },
      appetiteChanges: { type: String, enum: ['no change', 'decreased', 'increased'], required: false },
      isFeelingSafe: { type: Boolean, required: false },
      additionalNotes: { type: String, default: "" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const MentalHealthTrackingModel =
  mongoose.models.MentalHealthTracking ||
  mongoose.model<MentalHealthTracking>('MentalHealthTracking', MentalHealthTrackingSchema);

export default MentalHealthTrackingModel;