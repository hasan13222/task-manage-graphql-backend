import { Types } from "mongoose";
import { TASK_STATUS } from "./task.const";

type TTaskStatus = keyof typeof TASK_STATUS

export interface TTask{
    userId: Types.ObjectId;
    title: string;
    description?: string;
    due_date?: string;
    status: TTaskStatus
}