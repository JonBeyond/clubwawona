const Master = require('../model.js').Master;
const checkCurrentAuthKey = require('./authorization.js').checkCurrentAuthKey;
const mongoose = require('mongoose');

const retrieveMembers = (req, res) => {
  if (checkCurrentAuthKey(req.params.auth)) {
    Master.find({}, (err, documents) => {
      if (err) res.sendStatus(500);
      let list = [];
      documents.forEach((doc) => {
        list.push({
          name: doc['firstName'] + ' ' + doc['lastName'],
          email: doc['email'],
          token: doc['token'],
          tokenSent: doc['tokenSent']});
      });
      res.send(list);
      mongoose.connection.close();
    });
  } else {
    res.send('bad or expired api key');
    mongoose.connection.close();
  }
}

module.exports = { retrieveMembers };
