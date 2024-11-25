import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskShema } from "../validators/task.schema.js";

const router = Router();

router.get("/tasks", authRequired, getTasks); // obtener todas las tareas

router.get("/tasks/:id", authRequired, getTask); // obtener una tarea

router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskShema),
  createTask
); // crear una tarea

router.delete("/tasks/:id", authRequired, deleteTask); //eliminar una tarea

router.put("/tasks/:id", authRequired, updateTask); //editar una tarea

export default router;
