import express from "express";
import morgan from "morgan";
import errorHandler from "./Utils/CustomErrorHandler";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

//Routes...

app.all("*", (req, res, next) => {
  return next(new ErrorResponse(`No ${req.url} found on this server.`, 404));
});
app.use(errorHandler);

export default app;
