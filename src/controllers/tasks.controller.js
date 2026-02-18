import taskStore from "../data/tasks.store.js";

function getAllTasks(req, res, next) {
     const tasks = taskStore.getAllTasks()
  res.json(tasks);
  return;
}
function createTask(req, res, next) {
  const { title, description } = req.body;
  const new_task = taskStore.createTask(title, description);
  res.json(new_task);
  return;
}
function getTaskById(req, res, next) {
  const id = Number(req.params.id);
  const task = taskStore.getTaskById(id);
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
function deleteTask(req, res, next) {
  const id = Number(req.params.id);
  const deleted_task = taskStore.deleteTask(id);
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
function updateTask(req, res, next) {
  const id = Number(req.params.id);
  const task = taskStore.updateTask(id, req.body);
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
  updateTask
};
