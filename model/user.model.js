const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String,
    is_married: Boolean,
  },
  {
    versionKey: false,
  }
);

const logoutSchema = mongoose.Schema(
  {
    token: String,
  },
  {
    versionKey: false,
  }
);

   
const postSchema = mongoose.Schema({
  title: String,
  body: String,
  device: {
    type: String,
    enum: ["Laptop", "Tablet", "Mobile"],
  },
  no_of_comments: Number,
  userID:String,
  user:String
});

//model
const userModel = mongoose.model("user", userSchema);
const logoutModel = mongoose.model("blacklist", logoutSchema);

const postModel= mongoose.model("post", postSchema);

module.exports = {
  userModel,
  logoutModel,
  postModel
};
