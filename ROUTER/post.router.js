const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../model/post.model");
const { auth } = require("../middleware/auth.middlware");
postRouter.use(auth);
postRouter.post("/add", async (req, res) => {
  try {
    let newPost = new PostModel(req.body);
    await newPost.save();
    res.status(200).json({ msg: "new Post has been added", newPost });
  } catch (error) {
    res.status(400).json({ msg: "PLease login first" });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    await PostModel.find({ userID: req.body.userID });
    res.status(200).json({ msg: "Visible Post" });
  } catch (error) {
    res.status(400).json({ msg: "PLease login first" });
  }
});

postRouter.patch("/update/:postID", async (req, res) => {
  const userDocId = req.body.userID;
  try {
    const { postID } = req.params;
    const post = await PostModel.findOne({ _id: postID });
    const postDocId = post.userID;
    if (userDocId === postDocId) {
      await PostModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.status(200).json({ msg: "post has been updated" });
    } else {
      res.status(400).json({ msg: "Please Login" });
    }
    
  } catch (error) {
    res.status(400).json({ msg: "PLease login first" });
  }
});

postRouter.delete("/delete/:postID", async (req, res) => {
  const userDocId = req.body.userID;
  try {
    const { postID } = req.params;
    const post = await PostModel.findOne({ _id: postID });
    const postDocId = post.userID;
    if (userDocId === postDocId) {
      let updatedPost = await PostModel.findByIdAndDelete({ _id: postID });
      res.status(200).json({ msg: "post has been deleted" });
    }else{
 res.status(400).json({ msg: "Please Login" });
    }
    
  } catch (error) {
    res.status(400).json({ msg: "PLease login first" });
  }
});

module.exports = {
  postRouter,
};
