const express = require("express");
const morgan = require("morgan");
const app = express();

const coffeeRouter = require("./routes/coffeeRoute");
const userRouter = require("./routes/usersRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public/images/coffeeimage`));

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/coffee", coffeeRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
