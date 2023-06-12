const mongoose = require("mongoose");

//userSchema

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

// userModel

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
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
