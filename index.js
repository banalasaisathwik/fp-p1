const express = require("express");

const app = express();
app.use(express.json());

let id_counter = 1;
let tasks_arr = [];

function log_request(req, res, next) {
  const start = Date.now()

  res.on('finish',()=>{
    const duration = Date.now()-start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  })
  next();
}

function validatie_task(req, res, next) {
    const { title, description } = req.body;
    if(!title || !description || typeof title !== "string" || typeof description !== "string") {
      const err = Error("Invalid task data");
      err.status = 400;
      throw err;  
         
    }
    else{
      next();
    }
    
}

function validate_id(req, res, next) {

  const id = Number(req.params.id);
  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    const err = Error("Invalid ID");
    err.status = 400;
    next(err);
    return
  } else {
    next();
  }
}

function validatie_patch(req, res, next) {
  const { title, description } = req.body;
  if((title && typeof title !== "string") || (description && typeof description !== "string")) {
    const err = Error("Invalid task data");
    err.status = 400;
    next(err);
    return
  }
  else{
    next();
  }
}

app.use(log_request);

app.get("/tasks", (req, res) => {
  console.log(tasks_arr);
  res.json(tasks_arr);
  return

});

app.post("/tasks",validatie_task, (req, res,next) => {
  const { title, description } = req.body;
  const new_task = {
    id: id_counter,
    title,
    description,
  };
  tasks_arr.push(new_task);
  id_counter++;
  res.json(new_task);
  return
});

app.get("/tasks/:id",validate_id,async (req, res,next) => {
  const id = Number(req.params.id);
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {resolve()}, 1000);
  });
  await p
  const task = tasks_arr.find((t) => t.id === id);
  if (task) {
    res.json(task);
    return
  } else {
    const err = Error("Task not found");
    err.status = 404;
    throw err;
    return
  }
});

app.delete("/tasks/:id",validate_id, (req, res,next) => {
  const id = Number(req.params.id);
  const index = tasks_arr.findIndex((t) => t.id === id);
  if (index !== -1) {
    const deleted_task = tasks_arr.splice(index, 1);
    res.json(deleted_task[0]);
    return
  } else {
    const err = Error("Task not found");
    err.status = 404;
    next(err);
    return
  }
});

app.patch("/tasks/:id",validate_id,validatie_patch, (req, res,next) => {
  const id = Number(req.params.id);
  const task = tasks_arr.find((t) => t.id === id);
  if (task) {
    const { title, description } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    res.json(task);
    return
  } else {
    const err = Error("Task not found");
    err.status = 404;
    next(err);
    return
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
  return
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
