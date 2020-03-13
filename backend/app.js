const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");

const app = express();
mongoose
  .connect(
    "mongodb+srv://Chris:OMfuUMtPlHzF4nQk@mean-stack-kjwhp.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conneted to MongoDb");
  })
  .catch(() => {
    console.log("Connection Failled :(");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
module.exports = app;
