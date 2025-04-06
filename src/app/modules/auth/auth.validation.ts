import { z } from 'zod';

const changePasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z.string(),
  }),
});


const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
    profile_picture: z.string().optional(),
  }),
});


const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    profile_picture: z.string().optional()
  }),
});

export const AuthValidations = {
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  createUserValidationSchema,
  loginUserValidationSchema,
  updateUserValidationSchema
};
