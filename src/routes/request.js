const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;

      const toUserId = req.params.toUserId;
      const fromUserId = user._id;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).send("invalid status");
      }

      if (fromUserId.equals(toUserId)) {
        return res
          .status(400)
          .send("cannot send connection request to yourself");
      }

      const toUserExist = await User.findById(toUserId);

      if (!toUserExist) {
        return res.status(400).send("User does not exist");
      }

      const connectionExist = await ConnectionRequest.find({
        $or: [
          { toUserId, fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });
      console.log("connectionExist : ", connectionExist);

      if (connectionExist.length) {
        return res.status(400).send("Connection already exist");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();

      res.send(user.firstName + " sent Connection request");
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  }
);

module.exports = requestRouter;
