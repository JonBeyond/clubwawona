const mongoose = require('mongoose');

//TODO: update the schema type for new events
const RSVPSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  guests: Number,
  security: String,
  beer: String,
  liquor: String,
  wine: String,
  other: String
});

//TODO: update the collection for new events
const version = 'MAY2019RSVP';
const RSVP = mongoose.model(version, RSVPSchema);

module.exports = RSVP;