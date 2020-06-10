const express = require("express");
const user = express.Router();
const userController = require("./userController");

user.post("/signup", userController.signup);
user.post("/login", userController.login);
user.delete("/:userId", userController.deleteUser);
// TODO:
// app.post('/user/image', FBAuth, uploadImage);
// app.post('/user', FBAuth, addUserDetails);
// app.get('/user', FBAuth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);

module.exports = user;