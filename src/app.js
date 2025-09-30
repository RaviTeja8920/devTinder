const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Ravi");
});

app.get("/hello", (req, res) => {
  res.send("this is hello api");
});

app.get("/test", (req, res) => {
  res.send("this is test api");
});

app.listen(7777, () => {
  console.log("server started");
});
