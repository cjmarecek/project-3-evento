const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");

const { Router } = require("express");
const app = express();
const middlewares = require("./middlewares");

app.use(methodOverride("_method"));
app.use(morgan("common"));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log(err));

const {
  upload,
  getAllEvents,
  getAllFiles,
  displayImage,
  postOneEvent,
  getOneEvent,
  updateEvent,
  deleteFile,
  deleteEvent,
} = require("./api/events");

const fileUpload = upload.single("image");

// Events routes
const events = Router();
app.use("/api/events", events);
events.get("/", getAllEvents);
events.get("/uploads", getAllFiles);
events.get("/uploads/:filename", displayImage);
events.post("/", fileUpload, postOneEvent);
events.get("/:eventId", getOneEvent);
events.put("/:eventId", fileUpload, updateEvent);
events.delete("/uploads/:filename", deleteFile);
events.delete("/:eventId", deleteEvent);

const { signup, login, deleteUser} = require("./api/user");
// TODO
const user = Router();
app.use("/api/user", user);

user.post("/signup", signup);
user.post("/login", login);
user.delete("/:userId", deleteUser);
// app.post('/user/image', FBAuth, uploadImage);
// app.post('/user', FBAuth, addUserDetails);
// app.get('/user', FBAuth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
