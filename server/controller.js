const database = require('../config.js').database;
const mongoose = require('mongoose');
const RSVP = require('./model.js').RSVP;
const Master = require('./model.js').Master;
const retrieveMembers = require('./controllers/retrievemembers.js').retrieveMembers;
const processReport = require('./controllers/retrieversvp.js').processReport;
const validateToken = require('./controllers/rsvp.js').validateToken;
const login = require('./controllers/login.js').login;

const options = { useNewUrlParser: true, useCreateIndex: true };

const handleError = (err, res) => {
  console.log('Error connecting to database');
  console.log(err);
  res.status(500);
  mongoose.connection.close();
  process.exit();
}

module.exports = { //These are the controller entry points
  process: {
    RSVP: (document, res) => {
      mongoose.connect(database, options)
      .then(() => validateToken(document, res))
      .catch((err) => handleError(err, res));
    },
    allResponses: (res) => {
      mongoose.connect(database, options)
      .then(() => processReport(res))
      .catch(err => handleError(err, res));
    },
    allMembers: (res) => {
      mongoose.connect(database, options)
      .then(() => retrieveMembers(res))
      .catch(err => handleError(err, res));
    },
    login: (credential, res) => {
      mongoose.connect(database, options)
      .then(() => login(credential, res))
      .catch(err => handleError(err, res));
    }
  }
}
