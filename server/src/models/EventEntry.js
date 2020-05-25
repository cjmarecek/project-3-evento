const mongoose = require('mongoose');

const { Schema } = mongoose;

// const requiredNumber = { type: Number, required: true };
const requiredString = { type: String, required: true };
const eventEntrySchema = new Schema(
  {
    title: requiredString,
    description: String,
    place: requiredString,
    date: { type: Date, required: true },
    eventImage: {type: String, required: false},
  },
  {
    timestamps: true,
  },
);

const EventEntry = mongoose.model('EventEntry', eventEntrySchema);

module.exports = EventEntry;

// latitude: {
//   ...requiredNumber,
//   min: -90,
//   max: 90,
// },
// longiture: {
//   ...requiredNumber,
//   min: -180,
//   max: 180,
// },
