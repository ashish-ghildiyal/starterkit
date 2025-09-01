import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],   
    },  
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      }
    ],
    refreshToken: {
        type: String,
    }, 
    
  }, 
          
    { timestamps: true }
);

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare entered password with hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};  

// Method to generate JWT access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email,
  }, 
  process.env.ACCESS_TOKEN_SECRET, 
  { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

// Method to generate JWT refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
      id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
  }

const User = mongoose.model("User", userSchema);

export default User;

