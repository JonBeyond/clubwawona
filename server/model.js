const mongoose = require('mongoose');

const RSVPVersion = 'MAY2019RSVP';
const RSVPSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  guests: Number,
  beer: String,
  liquor: String,
  wine: String,
  other: String
});
const RSVP = mongoose.model(RSVPVersion, RSVPSchema);

const MemberList = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  token: String,
  tokenSent: Boolean
});

const masterVersion = 'MAY2019MASTER';
const Master = mongoose.model(masterVersion, MemberList);

const CredentialSchema = mongoose.Schema({
  token: String,
  type: String
});
const CredentialStorage = 'AUTHENTICATE';
const Credentials = mongoose.model(CredentialStorage, CredentialSchema);

module.exports = { RSVP, Master, Credentials };
