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
      res.send('unregistered');
    } else {
      console.log(`Failed registration - bad key for ${document.email}`);
      res.send('badkey');
    }
  });
}

const saveRSVP = (document, res) => {
  RSVP.updateOne({email: document.email}, document, {upsert: true}, (err) => {
    if (err) {
      res.sendStatus(500);
      console.log('Error adding or updating RSVP');
    } else {
      mongoose.connection.close(()=>{
        res.send('Accepted');
      });
    }
  });
}

module.exports = { validateToken };
