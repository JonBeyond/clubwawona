const database = require('../config.js').database;
const mongoose = require('mongoose');
const options = { useNewUrlParser: true, useCreateIndex: true };

//External functions:
const retrieveMembers = require('./controllers/retrievemembers.js').retrieveMembers;
const processReport = require('./controllers/retrieversvp.js').processReport;
const validateToken = require('./controllers/rsvp.js').validateToken;
const login = require('./controllers/authorization.js').login;
const master = require('./controllers/master.js');

const handleError = (err, res) => {
  console.log('Error connecting to database');
  console.log(err);
  res.status(500);
  mongoose.connection.close();
  process.exit();
}

module.exports = {
    RSVP: (req, res) => {
      mongoose.connect(database, options)
      .then(() => validateToken(req.body, res))
      .catch((err) => handleError(err, res));
    },
    allResponses: (req, res) => {
      mongoose.connect(database, options)
      .then(() => processReport(req, res))
      .catch(err => handleError(err, res));
    },
    allMembers: (req, res) => {
      mongoose.connect(database, options)
      .then(() => retrieveMembers(req, res))
      .catch(err => handleError(err, res));
    },
    login: (req, res) => {
      mongoose.connect(database, options)
      .then(() => login(req.body.credential, res))
      .catch(err => handleError(err, res));
    },
    resetEmail: (req, res) => {
      mongoose.connect(database, options)
      .then(() => master.resetEmail(req, res))
      .catch(err => handleError(err, res));
    },
    addMember: (req, res) => {
      mongoose.connect(database, options)
      .then(() => master.addMember(req, res))
      .catch(err => handleError(err, res));
    },
    deleteMember: (req, res) => {
      mongoose.connect(database, options)
      .then(() => master.deleteMember(req, res))
      .catch(err => handleError(err, res));
    }
}
