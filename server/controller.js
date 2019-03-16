const database = require('../config.js').database;
const RSVP = require('./model.js');
const mongoose = require('mongoose');

const validateToken = (document, res) => {
  //make sure token matches
  //reject if not
  //if OK, then save
  save(document, res);
}

const save = (document, res) => {
  RSVP.updateOne({email: document.email}, document, {upsert: true}, (err) => {
    if (err) {
      res.send(500);
      console.log('Error adding or updating RSVP');
    } else {
      mongoose.connection.close(()=>{
        res.send('RSVP Added');
      });
    }
  });
}

module.exports = {
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
    }
  }
}
