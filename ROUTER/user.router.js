const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// registration
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;

  let existedUser = await UserModel.findOne({ email });
  try {
    if (existedUser) {
      res.status(200).json({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).json({ msg: "something wrong" });
        } else {
          let newUser = new UserModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
            is_married,
          });
          await newUser.save();
          res.status(200).json({ msg: "new user has been added" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let registeredUser = await UserModel.findOne({ email });
  if (registeredUser) {
    try {
      bcrypt.compare(password, registeredUser.password, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: registeredUser._id, user: registeredUser.name },
            "sagar"
          );
          res.status(200).json({ msg: "Loggin Successful", token: token });
        } else {
          res.status(400).json({ error: "something wrong" });
        }
      });
    } catch (error) {
      res.status(400).json({ err: error.message });
    }
  } else {
    res.status(200).json({ msg: "Please Loggin " });
  }
});

module.exports = {
  userRouter,
};
