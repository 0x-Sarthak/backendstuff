const mongoose = require("mongoose");

//postSchema

const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    userID:String,
    user :String
  },
  {
    versionKey: false,
  }
);

// postModel

const PostModel = mongoose.model("posts", postSchema);

module.exports = {
  PostModel,
};

/*
name ==> String
email ==> String
gender ==> String
password ==> String
age ==> Number
city ==> String
is_married ==> boolean

*/
