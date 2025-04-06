import { z } from "zod";
import { TASK_STATUS } from "./task.const";

const createTaskValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    userId: z.string(),
    due_date: z.string().optional(),
    status: z.enum([...(Object.keys(TASK_STATUS) as [string, ...string[]])]).optional(),
  }),
});

const updateTaskValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    userId: z.string().optional(),
    due_date: z.string().optional(),
    status: z.enum([...(Object.keys(TASK_STATUS) as [string, ...string[]])]).optional(),
  }),
});

export const taskValidations = {
  createTaskValidationSchema,
  updateTaskValidationSchema,
};
