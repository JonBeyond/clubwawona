const Master = require('../model.js').Master;
const checkCurrentAuthKey = require('./authorization.js').checkCurrentAuthKey;
const mongoose = require('mongoose');

 //for user tokens
const uuidv5 = require('uuid/v5');
const config = require('../../config.js');

const resetEmail = (req, res) => {
  if (checkCurrentAuthKey(req.params.auth)) {
    Master.findOneAndUpdate({email: req.params.email}, {tokenSent: false}, {upsert: false}, (err, doc)  => {
      if (err) {
        res.sendStatus(500);
        console.error(`Error reseting email: ${err}`);
      } else if (doc) {
        res.sendStatus(200);
      } else {
        console.error(`Attempted reset to of a non-existant email: ${JSON.stringify(req.params.email.toLowerCase())}`);
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
  let member = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email.toLowerCase(),
    token: uuidv5(req.body.email.toLowerCase(), config.eventIdentifier),
    tokenSent: false
  };
  Master.updateOne({email: member.email}, member, {upsert: true}, (err, doc) => {
    if (err) {
      res.sendStatus(500);
      console.error(`Error adding new member ${member.email}`);
    } else {
      res.sendStatus(200);
      console.error(`Added email ${member.email}`);
    }
    if (doc) console.log(doc);
    mongoose.connection.close();
  })
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
