function notfound(req, res, next) {
  res.status(404).json({ message: "Endpoint not found" });
  return
};

function error_handler(err, req, res, next) {
  res.status(err.status ?? 500).json({ message: err.message });
}

export {
  notfound,
  error_handler
}