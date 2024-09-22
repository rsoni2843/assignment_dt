const express = require("express");
const { User } = require("./model");
const socialRouter = express.Router();

socialRouter.get("/user-activity", async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $bucket: {
          groupBy: "$age",
          boundaries: [18, 25, 35, 45, 100],
          default: "45+",
          output: {
            users: { $push: "$$ROOT" },
          },
        },
      },
      {
        $unwind: "$users",
      },
      {
        $lookup: {
          from: "posts",
          localField: "users._id",
          foreignField: "authorId",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "users._id",
          foreignField: "userId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "users._id",
          foreignField: "userId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "views",
          localField: "users._id",
          foreignField: "userId",
          as: "views",
        },
      },
      {
        $group: {
          _id: "$_id",
          userCount: { $sum: 1 },
          postCount: { $sum: { $size: "$posts" } },
          commentCount: { $sum: { $size: "$comments" } },
          likeCount: { $sum: { $size: "$likes" } },
          viewCount: { $sum: { $size: "$views" } },
        },
      },
      {
        $addFields: {
          ageRange: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 18] }, then: "18-24" },
                { case: { $eq: ["$_id", 25] }, then: "25-34" },
                { case: { $eq: ["$_id", 35] }, then: "35-44" },
                { case: { $eq: ["$_id", 45] }, then: "45+" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          ageRange: 1,
          userCount: 1,
          postCount: 1,
          commentCount: 1,
          likeCount: 1,
          viewCount: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = socialRouter;
