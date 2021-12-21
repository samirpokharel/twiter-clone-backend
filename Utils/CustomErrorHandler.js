import ErrorResponse from "../Models/Error";

export default function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;
  console.error(err);

  //* Check for dublicate field value
  if (error.code === 11000) {
    const message = "Dublicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  //* Check for mongodb `objectid` error
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  //*  Check for mongoose validationError
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  return res.status(error.statusCode || 500).send({
    success: false,
    error: error.message || "Server Error",
  });
}
