const express = require("express");
const users = express.Router();
const usersController = require("./usersController");
const { checkAuth } = require("../../middlewares");
const fileUpload = usersController.fileUpload.single("image");

users.post("/signup", usersController.signup); // creates user
users.post("/login", usersController.login); // login user
users.delete("/:userId", usersController.deleteUser); // delete user
users.put("/image", checkAuth, fileUpload, usersController.imageUpdate ); // changes profile picture
// TODO:
// app.post('/user', FBAuth, addUserDetails);
// app.get('/user', FBAuth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);

module.exports = users;
