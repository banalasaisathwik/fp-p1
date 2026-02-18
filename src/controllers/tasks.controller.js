import taskStore from "../data/tasks.store.js";

async function getAllTasks(req, res, next) {
  try {
    const tasks = await taskStore.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description } = req.body;
    const new_task = await taskStore.createTask(title, description);
    res.json(new_task);
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  const id = Number(req.params.id);
  const task = await taskStore.getTaskById(id);
  if (task) {
    res.json(task);
    return;
  } else {
    const err = Error("Task not found");
    err.status = 404;
    next(err);
    return;
  }
}
async function deleteTask(req, res, next) {
  const id = Number(req.params.id);
  const deleted_task = await taskStore.deleteTask(id);
  if (deleted_task) {
    res.send("Task deleted successfully");
    return;
  } else {
    const err = Error("Task not found");
    err.status = 404;
    next(err);
    return;
  }
}
async function updateTask(req, res, next) {
  const id = Number(req.params.id);
  const task = await taskStore.updateTask(id, req.body);
  if (task) {
    res.json(task);
    return;
  } else {
    const err = Error("Task not found");
    err.status = 404;
    next(err);
    return;
  }
}

export default {
  getAllTasks,
  createTask,
  getTaskById,
  deleteTask,
  updateTask,
};
