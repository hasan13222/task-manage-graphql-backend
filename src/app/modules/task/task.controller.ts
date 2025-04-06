import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { taskServices } from "./task.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createNewTask = catchAsync(async (req: Request, res: Response) => {
  const newTask = await taskServices.createNewTaskIntoDb(req.body);
  sendResponse(res, {
    success: true,
    status: StatusCodes.CREATED,
    message: "Task created successfully",
    data: newTask,
  });
});

const getMyTask = catchAsync(async (req: Request, res: Response) => {
  const result = await taskServices.getMyTaskFromDb(req.user.userId, req.query);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Task retrieved successfully.",
    data: result.result,
    meta: result.meta
  });
});

const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const newTask = await taskServices.getSingleTaskFromDb(req.params.id);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Task retrieved successfully",
    data: newTask,
  });
});

const updateSingleTask = catchAsync(async (req: Request, res: Response) => {
  const newTask = await taskServices.updateSingleTaskIntoDb(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Task updated successfully",
    data: newTask,
  });
});

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const newTask = await taskServices.deleteTaskFromDb(taskId);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Task deleted successfully",
    data: newTask,
  });
});

export const taskController = {
  createNewTask,
  deleteTask,
  getMyTask,
  getSingleTask,
  updateSingleTask
};
