import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(3, 'Username must be at least 3 characters long')
  .max(20, 'Username must be at most 20 characters long')
  .regex(
    /^[a-zA-Z0-9_]+$/,
    'Username can only contain letters, numbers, and underscores'
  );

export const genderValidation = z.enum(['male', 'female', 'other'], {
  message: "Gender must be either 'male', 'female', or 'other'",
});

export const signinSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),

  email: z.string().email({ message: 'Invalid email address' }),

  password: z.string().min(8, 'Password must be at least 8 characters long'),

  gender: z.enum(['male', 'female', 'other'], {
    message: "Gender must be either 'male', 'female', or 'other'",
  }),

  age: z
    .number()
    .min(0, 'Age must be a positive number')
    .max(120, 'Age must be less than 120'),

  role: z.enum(['parent', 'educator', 'child'], {
    message: "Role must be either 'parent', 'educator', or 'child'",
  }).optional(),

  isVerified: z.boolean().optional(),
});
