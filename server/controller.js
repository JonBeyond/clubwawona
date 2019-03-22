const database = require('../config.js').database;
const mongoose = require('mongoose');
const RSVP = require('./model.js').RSVP;
const Master = require('./model.js').Master;
const retrieveMembers = require('./controllers/retrievemembers.js').retrieveMembers;
const processReport = require('./controllers/retrieversvp.js').processReport;
const validateToken = require('./controllers/rsvp.js').validateToken;

module.exports = { //These are the controller entry points
  process: {
    RSVP: (document, res) => {
      mongoose.connect(database, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => {
        validateToken(document, res);
      })
      .catch((err) => {
        console.log('Error connecting to mlab');
        res.sendStatus(500);
        mongoose.connection.close(); //just in case?? TODO: investigate.
      });
    },

    allResponses: (res) => {
      mongoose.connect(database, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => {
        processReport(res);
      })
      .catch(err => {
        console.log(err);
        res.send(500);
        mongoose.connection.close(); //just in case?? TODO: investigate.
      });
    },

    allMembers: (res) => {
      mongoose.connect(database, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => {
        retrieveMembers(res);
      })
      .catch(err => {
        console.log(err);
        res.send(500);
        mongoose.connection.close(); //just in case?? TODO: investigate.
      });
    }
  }
}
