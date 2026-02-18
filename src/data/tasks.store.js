
import Database from "better-sqlite3";

const db = new Database('src/data/tasks.db');

db.exec(
  `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT
  )`
)

async function getAllTasks() {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  return tasks;
}

async function getTaskById(id) {
  const data = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  return data;
}

async function createTask(title, description) {
  db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)').run(title, description);
  const new_task = db.prepare('SELECT * FROM tasks WHERE title = ? AND description = ?').get(title, description);
  return new_task;
}


async function deleteTask(id) {
  const data = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  if (data.changes > 0) {
    return true;
  }
  return false;
}

async function updateTask(id, updatedTask) {
  const data = db.prepare('UPDATE tasks SET title = ?, description = ? WHERE id = ?').run(updatedTask.title, updatedTask.description, id);
  if (data.changes > 0) {
    const updated_task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    return updated_task;
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
