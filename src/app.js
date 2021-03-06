import express from "express";
import morgan from "morgan";
import errorHandler from "./Utils/CustomErrorHandler";
import ErrorResponse from "./Utils/ErrorResponse";
import fileUpload from 'express-fileupload'


// Routes..
import AuthRoute from "./Routes/AuthRoutes";
import PostsRoute from "./Routes/PostRoute";
import UserRoute from "./Routes/UserRoute";


const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload())


//Routes...
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/posts", PostsRoute);
app.use("/api/v1/users", UserRoute);


app.all("*", (req, res, next) => {
  return next(new ErrorResponse(`No ${req.url} found on this server.`, 404));
});
app.use(errorHandler);

export default app;
