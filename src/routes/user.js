const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();
const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "about",
  "photoUrl",
  "skills",
];

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: `Pending connection requests received for user: ${loggedInUser.firstName}`,
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.toUserId._id.equals(loggedInUser._id)) {
        return row.fromUserId;
      }
      if (row.fromUserId._id.equals(loggedInUser._id)) {
        return row.toUserId;
      }
    });

    res.json({
      message: `${loggedInUser.firstName} connections are: `,
      data: data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * 10;

    const existingConnections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hiddenFilteredUsers = new Set();
    existingConnections.forEach((connection) => {
      hiddenFilteredUsers.add(connection.toUserId.toString());
      hiddenFilteredUsers.add(connection.fromUserId.toString());
    });

    const userFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenFilteredUsers) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({
      message: `Feed of ${loggedInUser.firstName} : `,
      data: userFeed,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
