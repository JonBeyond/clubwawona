//Schemas:
const RSVP = require('../model.js').RSVP;
const Master = require('../model.js').Master;
const mongoose = require('mongoose');

const validateToken = (document, res) => {
  Master.findOne({email: document.email.toLowerCase()}, (err, response) => {
    if (response && response.token === document.token) {
      console.log(`Successful registration processed for ${document.email}`);
      saveRSVP(document, res);
    } else if (response === null) {
      console.log(`User ${document.email} is not registered`);
      res.sendStatus(401);
      mongoose.connection.close();
    } else {
      console.log(`Failed registration - bad key for ${document.email}`);
      res.send('badkey'); //TODO: this is BAD! Need to trace to main component and fix on both ends.  This hsould be a standard HTTP code
      mongoose.connection.close();
    }
  });
}

const saveRSVP = (document, res) => {
  RSVP.updateOne({email: document.email}, document, {upsert: true}, (err) => {
    if (err) {
      res.sendStatus(500);
      console.log('Error adding or updating RSVP');
      mongoose.connection.close();
    } else {
      res.sendStatus(201);
      mongoose.connection.close();
    }
  });
}

module.exports = { validateToken };
