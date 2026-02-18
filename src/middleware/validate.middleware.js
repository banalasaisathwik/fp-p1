function validateTask(req, res, next) {
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

function validateId(req, res, next) {

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

function validatePatch(req, res, next) {
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

export  {
  validateTask,
  validateId,
  validatePatch
};

