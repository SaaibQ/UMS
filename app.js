const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routers/userRoutes.js");
const globalErrorMiddleware = require("./controllers/errorController.js");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();

// MIDDLEWARES
app.use(express.static("public/html"));
app.use(express.static("public/css"));
app.use(express.static("public/js"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES
app.use("/api/v1/users", userRouter);

// GLOBAL-ERROR MIDDLEWARE
app.use(globalErrorMiddleware);

module.exports = app;
