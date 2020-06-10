const express = require("express");
const users = express.Router();
const usersController = require("./usersController");

users.post("/signup", usersController.signup);
users.post("/login", usersController.login);
users.delete("/:userId", usersController.deleteUser);
// TODO:
// app.post('/user/image', FBAuth, uploadImage);
// app.post('/user', FBAuth, addUserDetails);
// app.get('/user', FBAuth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);

module.exports = users;