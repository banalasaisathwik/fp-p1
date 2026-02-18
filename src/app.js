import express from "express";
import {logRequest} from "./middleware/logger.middleware.js";
import {notfound, error_handler} from "./middleware/error.middleware.js";
import tasksRouter from "./routes/tasks.routes.js";

const app = express();

app.use(express.json());
app.use(logRequest);
app.use("/tasks", tasksRouter);
app.use(notfound);
app.use(error_handler);

export default app;
