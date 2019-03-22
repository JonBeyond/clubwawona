const database = require('../config.js').database;
const mongoose = require('mongoose');
const RSVP = require('./model.js').RSVP;
const Master = require('./model.js').Master;
const retrieveMembers = require('./controllers/retrievemembers.js').retrieveMembers;
const processReport = require('./controllers/retrieversvp.js').processReport;
const validateToken = require('./controllers/rsvp.js').validateToken;

const options = { useNewUrlParser: true, useCreateIndex: true };

const handleError = (err) => {
  console.log('Error connecting to database');
  res.sendStatus(500);
  mongoose.connection.close();
}

module.exports = { //These are the controller entry points
  process: {
    RSVP: (document, res) => {
      mongoose.connect(database, options)
      .then(() => validateToken(document, res))
      .catch((err) => handleError(err));
    },
    allResponses: (res) => {
      mongoose.connect(database, options)
      .then(() => processReport(res))
      .catch(err => handleError(err));
    },
    allMembers: (res) => {
      mongoose.connect(database, options)
      .then(() => retrieveMembers(res))
      .catch(err => handleError(err));
    },
    login: (req, res) => {
      mongoose.connect(database, options)
      .then(() => res.send('passed')) //TODO: UPDATE
      .catch(err => handleError(err));
    }
  }
}
