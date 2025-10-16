const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("invalid token!");
    }

    const decoded = jwt.verify(token, "mySecretKey@");
    const { _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("No User found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("Something went Wrong! " + err.message);
  }
};

module.exports = { userAuth };
