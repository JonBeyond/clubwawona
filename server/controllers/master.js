const Master = require('../model.js').Master;
const checkCurrentAuthKey = require('./authorization.js').checkCurrentAuthKey;
const mongoose = require('mongoose');

const resetEmail = (req, res) => {
  if (checkCurrentAuthKey(req.params.auth)) {
    Master.findOneAndUpdate({email: req.body.email.toLowerCase()}, {tokenSent: false}, {upsert: false}, (err, doc)  => {
      if (err) {
        res.sendStatus(500);
        console.error(`Error reseting email: ${err}`);
      } else if (doc) {
        res.sendStatus(200);
      } else {
        console.error(`Attempted reset to of a non-existant email: ${req.body.email.toLowerCase()}`);
        res.sendStatus(500);
      }
      mongoose.connection.close();
    });
  } else {
    res.sendStatus(401);
    mongoose.connection.close();
  }
}

const addMember = (req, res) => {
  //TODO: add a new email into the database
  //use 'upsert'.  This will allow for name changes.
  //handle errors
};

const deleteMember = (req, res) => {
  if (checkCurrentAuthKey(req.params.auth)) {
    console.log(`Looking for ${req.params.email} and removing`);
    Master.findOneAndDelete({email: req.params.email})
    .then((doc) => {
      if (doc) {
        console.log(`${JSON.stringify(doc)} removed from list`);
        res.sendStatus(200);
      } else {
        console.log(`Email not found`);
        res.sendStatus(404);
      }
      mongoose.connection.close();
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
      mongoose.connection.close();
    })
  } else {
    res.sendStatus(401);
    mongoose.connection.close();
  }
};

module.exports = { resetEmail, addMember, deleteMember };
