const database = require('../config.js').database;
const RSVP = require('./model.js').RSVP;
const Master = require('./model.js').Master;
const mongoose = require('mongoose');

const validateToken = (document, res) => {
  Master.findOne({email: document.email}, (err, response) => {
    if (response && response.token === document.security) {
      console.log('pass');
      save(document, res);
    } else {
      console.log('fail');
      res.sendStatus(400);
    }
  });

}

const save = (document, res) => {
  RSVP.updateOne({email: document.email}, document, {upsert: true}, (err) => {
    if (err) {
      res.send(500);
      console.log('Error adding or updating RSVP');
    } else {
      mongoose.connection.close(()=>{
        res.sendStatus(200);
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
