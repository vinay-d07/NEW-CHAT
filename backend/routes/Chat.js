const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
router.get("/", (req, res) => {
  console.log("chat ");
  res.json("chats");
});

router.post("/", async (req, res) => {
  const user = await new userModel({
    name: req.body.name,
    uid: Math.floor(1000 + Math.random() * 9000),
  });
  user.save();
  res.status(200).json("welcome");
});

router.post("/add/:sender", async (req, res) => {
  try {
    const { ID } = req.body; 
    const sender = req.params.sender; 

    const user = await userModel.findOne({ uid: sender });
    const friend = await userModel.findOne({ uid: ID });

    if (!user || !friend) {
      return res.status(404).json("User not found");
    }

    // Check if they are already friends
    const isFriend = user.friends.some((f) => f.fuid === friend.uid);
    if (isFriend) {
      return res.status(400).json("ALREADY A FRIEND");
    }

    // Update friends list
    await user.updateOne({
      $push: { friends: { name: friend.name, fuid: friend.uid } },
    });
    await friend.updateOne({
      $push: { friends: { name: user.name, fuid: user.uid } },
    });

    return res.status(200).json("ADDED SUCCESSFULLY");
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong");
  }
});

router.get("/:sender/friends", async(req, res) => {
  const sender = req.params.sender;

  try {
    const user = await userModel.findOne({ uid: sender });
    if(user){
      res.status(200).json(user.friends)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
