
import { read } from "fs";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "tasks.json");

async function getAllTasks() {
  const data = await readData();
  return data.tasks;
}

async function getTaskById(id) {
  const data = await readData();
  return data.tasks.find(t => t.id === id);
}

async function createTask(title, description) {
  const data = await readData();
  const tasks = data.tasks;
  let id_counter = data.id_counter;
  const new_task = {
    id: id_counter++,
    title,
    description
  };
  const updated_tasks = [...tasks, new_task];
  await writeData({ tasks: updated_tasks, id_counter });
  return new_task;
}


async function deleteTask(id) {
  const data = await readData();
  const tasks_arr = data.tasks;
  const index = tasks_arr.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks_arr.splice(index, 1);
    await writeData({ tasks: tasks_arr, id_counter: data.id_counter });
    return true;
  }
  return false;
}

async function updateTask(id, updatedTask) {
  const data = await readData();
  const tasks = data.tasks;
  const task_index = tasks.findIndex(t=>t.id === id);
  if (task_index !== -1) {
    const task = tasks[task_index];
    if (updatedTask.title) {
      task.title = updatedTask.title;
    }
    if (updatedTask.description) {
      task.description = updatedTask.description;
    }
    await writeData({ tasks, id_counter: data.id_counter });
    return task;
  }
  return null;
}


async function readData() {
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file);
}

async function writeData(data) {
  await fs.writeFile(filePath,JSON.stringify(data,null,2))
  return;
}

export default  {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask
};
