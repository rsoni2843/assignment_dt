const express = require("express");
const mongoose = require("mongoose");
const socialRouter = require("./social-router");
const { User, Post, Comment, Like, View } = require("./model");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://0.0.0.0:27017/socialapp")
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error(err));

// const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// UNCOMMENT THIS BELOW CODE TO MAKE SAMPLE ENTRIES IN DB, IF ENTRIES DOES NOT EXIST
// async function createSampleEntries() {
//   try {
//     // Define age groups to create users for
//     const ageGroups = [18, 22, 27, 32, 40, 50, 60]; // Sample ages
//     const userIds = [];
//     const postIds = [];

//     for (const age of ageGroups) {
//       const user = new User({
//         username: `user_${age}`,
//         email: `user_${age}@example.com`,
//         age: age,
//         createdAt: new Date(),
//       });
//       await user.save();
//       userIds.push(user._id);
//     }

//     for (let i = 0; i < userIds.length; i++) {
//       const post = new Post({
//         title: `Sample Post by user_${i + 1}`,
//         content: `This is the content of post by user_${i + 1}`,
//         authorId: userIds[i],
//         createdAt: new Date(),
//       });
//       await post.save();
//       postIds.push(post._id); // Store post IDs for future use
//     }

//     for (let i = 0; i < 20; i++) {
//       const comment = new Comment({
//         text: `Sample comment ${i + 1}`,
//         postId: getRandomElement(postIds),
//         userId: getRandomElement(userIds),
//         createdAt: new Date(),
//       });
//       await comment.save();
//     }

//     for (let i = 0; i < 20; i++) {
//       const like = new Like({
//         postId: getRandomElement(postIds),
//         userId: getRandomElement(userIds),
//         createdAt: new Date(),
//       });
//       await like.save();
//     }

//     for (let i = 0; i < 20; i++) {
//       const view = new View({
//         postId: getRandomElement(postIds),
//         userId: getRandomElement(userIds),
//         timestamp: new Date(),
//       });
//       await view.save();
//     }

//     console.log("Sample entries created successfully!");
//   } catch (error) {
//     console.error("Error creating sample entries:", error);
//   }
// }

// createSampleEntries();

app.use("/api", socialRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
