import mongoose from "mongoose";

const User = mongoose.model("User", {
  email: String,
  password: String
});

export default User;
