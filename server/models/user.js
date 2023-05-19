import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { roles } from "../utils/constants.js";

import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name and surname"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    // creating custom validator -> https://mongoosejs.com/docs/validation.html#custom-validators
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false, // to prevent it to be sent to the frontEnd in the response
  },
  roles: {
    type: String,
    enum: [roles.admin, roles.applicant],
    default: roles.applicant,
    //trim: true,
    //maxlength: 20,
  },
  //location: {
  //type: String,
  //maxlength: 20,
  //trim: true,
  //default: "city or location",
  //},
});

// middleware that is executed before the action specified -> "save"
UserSchema.pre("save", async function () {
  console.log(this.modifiedPaths()); // shows the modified fields.

  //If the user signing up or logging in matches the ADMIN_EMAIL, that user automatically
  //becomes the admin user
  if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
    this.role = roles.admin;
  }

  // Here we don't hash the password again if it's not modified
  if (!this.isModified("password")) {
    return;
  }

  // else
  // Hashing password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// adding a createJWT-method to the user-object so that it can be used in the controller
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// adding a comparePassword-method to the user-object so that it can be used in the controller
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

export default mongoose.model("User", UserSchema);

// creating custom validator -> https://mongoosejs.com/docs/validation.html#custom-validators
