import { z } from 'zod';

export const mentalHealthAssessmentSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  mood: z.enum(['happy', 'sad', 'angry', 'neutral']).optional(),
  anxietyLevel: z.number().min(0).max(10).optional(),
  stressLevel: z.number().min(0).max(10).optional(),
  socialInteraction: z.enum(['very social', 'neutral', 'withdrawn']).optional(),
  sleepQuality: z.enum(['very good', 'good', 'average', 'poor']).optional(),
  appetiteChanges: z.enum(['no change', 'decreased', 'increased']).optional(),
  isFeelingSafe: z.boolean().optional(),
  additionalNotes: z.string().optional(),
});

export const mentalHealthTrackingSchema = z.object({
  userId: z.string(),
  assessments: z.array(mentalHealthAssessmentSchema),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
