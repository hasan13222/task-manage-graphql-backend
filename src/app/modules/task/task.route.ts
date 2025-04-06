import express from "express";
import { verifyCookieToken, verifyToken } from "../../middleware/verifyToken";
import { taskController } from "./task.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { taskValidations } from "./task.validation";

const router = express.Router();

router.post('/', verifyToken(), validateRequest(taskValidations.createTaskValidationSchema), taskController.createNewTask)
router.get('/', verifyToken(), taskController.getMyTask);
router.get('/:id', verifyToken(), taskController.getSingleTask);
router.put('/:id', verifyToken(), validateRequest(taskValidations.updateTaskValidationSchema), taskController.updateSingleTask);
router.delete('/:id', verifyToken(), taskController.deleteTask);

export const taskRoutes = router;