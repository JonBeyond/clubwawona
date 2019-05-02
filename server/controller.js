const database = require('../config.js').database;
const mongoose = require('mongoose');
const options = { useNewUrlParser: true, useCreateIndex: true };

//External function importing:
const retrieveMembers = require('./controllers/retrievemembers.js').retrieveMembers;
const processReport = require('./controllers/retrieversvp.js').processReport;
const validateToken = require('./controllers/rsvp.js').validateToken;
const login = require('./controllers/authorization.js').login;
const addMember = require('./controllers/master.js').addMember;
const resetEmail = require('./controllers/master.js').resetEmail;
const deleteMember = require('./controllers/master.js').deleteMember;
const emailOne = require('./controllers/emailer.js').emailOne;
const emailAll = require('./controllers/emailer.js').emailAll;


const emailer = require('./controllers/emailer.js'); //contains multiple functions

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
      .then(() => validateToken(req, res))
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
      .then(() => login(req, res))
      .catch(err => handleError(err, res));
    },
    resetEmail: (req, res) => {
      mongoose.connect(database, options)
      .then(() => resetEmail(req, res))
      .catch(err => handleError(err, res));
    },
    addMember: (req, res) => {
      mongoose.connect(database, options)
      .then(() => addMember(req, res))
      .catch(err => handleError(err, res));
    },
    deleteMember: (req, res) => {
      mongoose.connect(database, options)
      .then(() => deleteMember(req, res))
      .catch(err => handleError(err, res));
    },
    emailOne: (req, res) => {
      mongoose.connect(database, options)
      .then(() => emailOne(req, res))
      .catch(err => handleError(err, res));
    },
    emailAll: (req, res) => {
      mongoose.connect(database, options)
      .then(() => emailAll(req, res))
      .catch(err => handleError(err, res));
    }
}
