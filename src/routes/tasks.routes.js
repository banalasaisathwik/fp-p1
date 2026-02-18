import express from "express";
import {validateTask, validateId, validatePatch} from "../middleware/validate.middleware.js";
import controller from "../controllers/tasks.controller.js";

const router = express.Router();

router.get("/", controller.getAllTasks);
router.post("/", validateTask, controller.createTask);
router.get("/:id", validateId, controller.getTaskById);
router.delete("/:id", validateId, controller.deleteTask);
router.patch("/:id", validateId, validatePatch, controller.updateTask);

export default router;