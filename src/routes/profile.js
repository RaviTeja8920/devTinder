const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateUserEditData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error while loading profile : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateUserEditData(req)) {
      return res
        .status(400)
        .send("something went wrong while validating the data");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your data is updated!`,
      data: loggedInUser,
    });
  } catch (err) {
    throw new Error("something went wrong : " + err.message);
  }
});

module.exports = profileRouter;
