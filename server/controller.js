const database = require('../config.js').database;
const mongoose = require('mongoose');

//External functions:
const retrieveMembers = require('./controllers/retrievemembers.js').retrieveMembers;
const processReport = require('./controllers/retrieversvp.js').processReport;
const validateToken = require('./controllers/rsvp.js').validateToken;
const login = require('./controllers/login.js').login;
const updateMember = require('./controllers/updatemember.js').updateMember;


const options = { useNewUrlParser: true, useCreateIndex: true };

const handleError = (err, res) => {
  console.log('Error connecting to database');
  console.log(err);
  res.status(500);
  mongoose.connection.close();
  process.exit();
}


module.exports = {
  process: {
    RSVP: (document, res) => {
      mongoose.connect(database, options)
      .then(() => validateToken(document, res))
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
    login: (credential, res) => {
      mongoose.connect(database, options)
      .then(() => login(credential, res))
      .catch(err => handleError(err, res));
    },
    member: (req, res) => {
      mongoose.connect(database, options)
      .then(() => updateMember(req, res))
      .catch(err => handleError(err, res));
    }
  }
}
