const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler")

// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose
  .connect(
    "mongodb+srv://1st_job_task:sTHBOThNxow3ZASy@cluster0.iqbbhit.mongodb.net"
  )
  .then(() => console.log("conextion successful"))
  .catch((err) => console.log(err));

//application routes
app.use("/todo", todoHandler)

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("app listening at port 3000");
});
