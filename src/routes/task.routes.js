import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTask, getTasks, createTask, updateTask, deleteTask, searchTasks } from "../controllers/task.controller.js";
import { createTaskSchema, upddateTaskSchema } from "../schemas/task.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/search/:search', authRequired, searchTasks);
router.get('/task/:id', authRequired, getTask);
router.post('/task',validateSchema(createTaskSchema), authRequired, createTask);
router.delete('/task/:id', authRequired, deleteTask);
router.put('/task/:id', authRequired, updateTask);

export default router