const express = require("express");
const users = express.Router();
const usersController = require("./usersController");

users.post("/signup", usersController.signup); // creates user
users.post("/login", usersController.login); // login user
users.delete("/:userId", usersController.deleteUser); // delete user
// TODO:
// app.post('/user/image', FBAuth, uploadImage);
// app.post('/user', FBAuth, addUserDetails);
// app.get('/user', FBAuth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);

module.exports = users;