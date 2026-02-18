let id_counter = 1;
let tasks_arr = [];

function getAllTasks() {
  return tasks_arr;
}

function getTaskById(id) {
  return tasks_arr.find(t => t.id === id);
}

function createTask(title, description) {
  const new_task = {
    id: id_counter++,
    title,
    description
  };
  tasks_arr.push(new_task);
  return new_task;
}


function deleteTask(id) {
  const index = tasks_arr.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks_arr.splice(index, 1);
    return true;
  }
  return false;
}

function updateTask(id, updatedTask) {
  const task = tasks_arr.find(t => t.id === id);
  if (task) {
    if (updatedTask.title) {
      task.title = updatedTask.title;
    }
    if (updatedTask.description) {
      task.description = updatedTask.description;
    }
    return task;
  }
  return null;
}

export default  {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask
};
