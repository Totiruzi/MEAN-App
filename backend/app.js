const express = require('express');

const app = express();
app.use((req, res, next) => {
console.log('Hello from Express');
next()
})

app.use((req, res, next) => {
  res.send(' I am sitting in an express framwork!')
})

module.exports = app;
