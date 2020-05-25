const { Router } = require('express');
const EventEntry = require('../models/EventEntry');
const router = Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

router.get('/', async (req, res, next) => {
  try {
    const entries = await EventEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', upload.none(), async (req, res, next) => {
  try {
    const eventEntry = new EventEntry({
      title: req.body.title,
      description: req.body.description,
      place: req.body.place,
      date: req.body.date,
    });
    const createdEntry = await eventEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/', upload.single('eventImage'), async (req, res, next) => {
  try {
    const eventEntry = new EventEntry({
      title: req.body.title,
      description: req.body.description,
      place: req.body.place,
      date: req.body.date,
      eventImage: req.file.path,
    });
    const createdEntry = await eventEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    console.log(`My req.param.id: ${req.params.id}`);

    const entry = await EventEntry.findById({
      _id: req.params.id,
    });
    console.log(`My entry object is: ${entry}`);

    res.json(entry);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', upload.none(), async (req, res, next) => {
  try {
    const entry = await EventEntry.findById({
      _id: req.params.id,
    });
    const updatedEvent = await EventEntry.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        place: req.body.place,
        date: req.body.date,
      },
    );
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', upload.single('eventImage'), async (req, res, next) => {
  try {
    const entry = await EventEntry.findById({
      _id: req.params.id,
    });
    if (entry.eventImage) {
      fs.unlink(entry.eventImage, (err) => {
        if (err) throw err;
        console.log(err);
      });
    }
    const updatedEvent = await EventEntry.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        place: req.body.place,
        date: req.body.date,
        eventImage: req.file.path,
      },
    );
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', upload.none(), async (req, res, next) => {
  try {
    const entry = await EventEntry.findById({
      _id: req.params.id,
    });

    const entry1 = await EventEntry.findByIdAndRemove({
      _id: req.params.id,
    });

    res.json(entry1);
  } catch (errror) {
    next(error);
  }
});
router.delete('/:id', upload.single('eventImage'), async (req, res, next) => {
  try {
    const entry = await EventEntry.findById({
      _id: req.params.id,
    });
    fs.unlink(entry.eventImage, (err) => {
      if (err) throw err;
      console.log(`File: ${entry.eventImage} was not deleted`);
    });

    const entry1 = await EventEntry.findByIdAndRemove({
      _id: req.params.id,
    });

    res.json(entry1);
  } catch (errror) {
    next(error);
  }
});

module.exports = router;
