import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: [true, "Please provide Display name"],
    },
    bio: { type: String, maxlength: 160 },
    location: { type: String, maxlength: 30 },
    userName: {
      type: String,
      required: [true, "Please provide Email Address"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide Email Address"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Please Provide Password"],
    },
    profilePicture: { type: String, default: "no-photo.png" },
    coverPic: { type: String, default: "no-photo.png" },
    isVerified: { type: Boolean, default: false },
    // TODO: 
    //likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Sign jwt (json web token) for user
UserSchema.methods.token = function () {
  return jwt.sign({ id: this.id }, process.env.API_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// has the plain password before saving to db
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});



export default model("User", UserSchema);
