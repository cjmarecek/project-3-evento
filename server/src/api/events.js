// @router /api/events/
// @desc Return, post, upload and delete events,
const { Router } = require("express");
const EventEntry = require("../models/EventEntry");
const router = Router();
const mongoose = require("mongoose");

// @desc File upload imports
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");

//init gfs
let gfs;

const conn = mongoose.createConnection(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false 
});
mongoose.set('useUnifiedTopology', true);

conn.once("open", () => {
  // init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Storage Engine
const storage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage: storage });

// @route GET /
// @desc Returns all events
router.get("/", async (req, res, next) => {
  try {
    const events = await EventEntry.find();
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// @route GET /uploads
// @desc  Display all files in JSON
router.get("/uploads", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /uploads/:filename
// @desc Displays Image
router.get("/uploads/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

// @route POST /
// @desc Saves event to DB
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const eventEntry = new EventEntry({
      title: req.body.title,
      description: req.body.description,
      place: req.body.place,
      date: req.body.date,
      image: req.file ? req.file.filename : null,
    });
    const createdEntry = await eventEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

// @route GET /:eventId
// @desc Fetches one event
router.get("/:eventId", async (req, res, next) => {
  try {
    const event = await EventEntry.findById({ _id: req.params.eventId });
    res.json(event);
  } catch (error) {
    next(error);
  }
});

// @route PUT /:eventId
// @desc Updates event with or without image
router.put("/:eventId", upload.single("image"), async (req, res, next) => {
  try {
    const event = await EventEntry.findById({ _id: req.params.eventId });
    // if no image upload
    if (!req.file) {
      const updatedEvent = await EventEntry.findByIdAndUpdate(
        {
          _id: req.params.eventId,
        },
        {
          title: req.body.title,
          description: req.body.description,
          place: req.body.place,
          date: req.body.date,
          image: null,
        }
      );
      res.json(updatedEvent);
    }
    // if image upload, check if it's the same image
    else if (req.file && event.image) {
      if(req.file.originalname !== event.image){
        gfs.remove(
          { filename: event.image, root: "uploads" },
          (error, gridStore) => {
            if (error) {
              next(error);
            }
          }
        );
      }
      const updatedEvent = await EventEntry.findByIdAndUpdate(
        {
          _id: req.params.eventId,
        },
        {
          title: req.body.title,
          description: req.body.description,
          place: req.body.place,
          date: req.body.date,
          image: req.file.filename,
        }
      );
      res.json(updatedEvent);
    } 
    // if event without image updating with image
    else {
      const updatedEvent = await EventEntry.findByIdAndUpdate(
        {
          _id: req.params.eventId,
        },
        {
          title: req.body.title,
          description: req.body.description,
          place: req.body.place,
          date: req.body.date,
          image: req.file.filename,
        }
      );
      res.json(updatedEvent);
    }
  } catch (error) {
    next(error);
  }
});

// @route DELETE /uploads/:filename
// @desc  Deletes file
router.delete("/uploads/:filename", (req, res, next) => {
  gfs.remove(
    { filename: req.params.filename, root: "uploads" },
    (err, gridStore) => {
      if (err) {
        next(err);
      }
      res.status(200).json({ message: "file deleted" });
    }
  );
});

// @route DELETE /:eventId
// @desc Deletes event as well as it's image
router.delete("/:eventId", async (req, res, next) => {
  try {
    const event = await EventEntry.findById({ _id: req.params.eventId });
    if (event.image) {
      gfs.remove(
        { filename: event.image, root: "uploads" },
        (error, gridStore) => {
          if (error) {
            next(error);
          }
        }
      );
    }
    const deletedEvent = await EventEntry.deleteOne({
      _id: req.params.eventId,
    });
    res.json(deletedEvent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
