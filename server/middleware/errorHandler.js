// middleware/errorHandler.js (CommonJS)
const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({ success: false, message: err.message });
};

module.exports = { notFound, errorHandler };
