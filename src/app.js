import express from "express";
import morgan from "morgan";
import errorHandler from "./Utils/CustomErrorHandler";
import ErrorResponse from "./Utils/ErrorResponse";

// Routes..
import UserRoute from "./Routes/UserRoutes";
import PostsRoute from "./Routes/PostRoute";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

//Routes...
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/posts", PostsRoute);

app.all("*", (req, res, next) => {
  return next(new ErrorResponse(`No ${req.url} found on this server.`, 404));
});
app.use(errorHandler);

export default app;
