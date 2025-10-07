const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added sucessfully");
  } catch (err) {
    res.status(400).send("Error saving the user", +err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB connection Sucessful");
    app.listen(7777, () => {
      console.log("Server started listerning in port:7777");
    });
  })
  .catch((err) => {
    console.error("Database connection not sucessful", err);
  });
