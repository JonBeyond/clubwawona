const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../../config.js');
const Credentials = require('../model.js').Credentials;//can use: Master, RSVP, Credentials
const saltRounds = 13;

const generateCredential = () => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(config.credential, salt, (err, hash) => {
      let document = {
        type: 'admin',
        token: hash
      }
      Credentials.updateOne({type: 'admin'}, document, {usert: true})
      .then(() => {
        console.log('Admin credential update complete');
        mongoose.connection.close();
        process.exit();
      })
      .catch(err => handleError(err, 'Error creating credential'));
    });
  });
}

(function () {
  mongoose.connect(config.database, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => generateCredential())
  .catch((err) => console.error('Error connecting to the database'));
})();