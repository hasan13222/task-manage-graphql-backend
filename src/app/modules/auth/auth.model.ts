import { Schema, model } from 'mongoose';
import { TUser } from './auth.interface';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    profile_picture: {
      type: String
    }
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
