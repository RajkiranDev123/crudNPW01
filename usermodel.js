import mongoose from "mongoose";

// connect with database server from application server
mongoose.connect("mongodb://localhost:27017/chabi");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
});

export const user = mongoose.model("user", userSchema);
