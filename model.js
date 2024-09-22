const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  age: Number,
  createdAt: Date,
});

const postSchema = new Schema({
  title: String,
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: Date,
});

const commentSchema = new Schema({
  text: String,
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: Date,
});

const likeSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: Date,
});

const viewSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  timestamp: Date,
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Like = mongoose.model("Like", likeSchema);
const View = mongoose.model("View", viewSchema);

module.exports = {
  User,
  Post,
  Comment,
  Like,
  View,
};
