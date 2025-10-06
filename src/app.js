const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  console.log("All user Data");
  res.send("here is the All Admins data");
});

app.get("/admin/getData", (req, res) => {
  console.log("user Data");
  res.send("here is the admin data");
});

app.use("/user/login", (req, res) => {
  console.log(" user loggedin ");
  res.send("user loggedin ");
});

app.use("/user", userAuth, (req, res) => {
  console.log("Got user data");
  res.send("Recived user Data");
});

app.listen(7777, () => {
  console.log("Server started listerning in port:7777");
});
