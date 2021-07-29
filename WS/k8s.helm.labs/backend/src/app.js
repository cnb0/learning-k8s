const express = require("express");
const app = express();
const User = require("./user");

// const users = [];

app.use(express.json());

app.get("/api/users", async (req, res) => {
  console.log("api/users called!");
  //   From MongoDB
  const users = await User.find();
  console.log(users);
  res.json(users);
});

app.post("/api/user", async (req, res) => {
  const _user = req.body;
  console.log("Adding user:::::", _user);
  //   users.push(user);
  const user = new User({ username: _user.name, age: _user.age });
  // Save to MongoDB
  await user.save().then(() => console.log("User created"));

  res.json("user addedd");
});

module.exports = app;
