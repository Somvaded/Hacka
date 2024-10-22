import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  username?: string;
  email?: string;
  password?: string;
  gender?: 'male' | 'female' | 'other';
  age?: number;
  role?: 'parent' | 'educator' | 'child';
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<User> = new Schema({
  username: { type: String, unique: true },
  email: {
    type: String,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'],
  },
  password: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  age: { type: Number, min: 0, max: 120 },
  role: { type: String, enum: ['parent', 'educator', 'child'] },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel =
  mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
