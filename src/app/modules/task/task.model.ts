import { model, Schema } from "mongoose";
import { TTask } from "./task.interface";
import { TASK_STATUS } from "./task.const";

const taskSchema = new Schema<TTask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    due_date: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.keys(TASK_STATUS),
      default: "todo",
    },
  },
  { timestamps: true }
);

export const Task = model<TTask>("Task", taskSchema);
