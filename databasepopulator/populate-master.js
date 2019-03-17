const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Master = require('../server/model.js').Master;
const md5 = require('blueimp-md5');

//Config files:
const database = require('../config.js').database;
const key = require('../config.js').tokenkey;
//const emails = require('../config.js').emails;

let emails = fs.readFileSync(path.join(__dirname, 'emails.csv'),"utf8").toString().split(',')
// console.log(emails);
// process.exit();

const update = (doc) => {
  return new Promise((resolve, reject) => {
    Master.updateOne({email: doc.email}, doc, {upsert: true}, (err) => {
      if(err) reject(err);
      resolve();
    });
  })
}

mongoose.connect(database, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    let updates = [];
    emails.forEach(email => {
      let document = {
        email: email,
        token: md5(email,key),
        sent: false
      }
      updates.push(update(document));
    });
    Promise.all(updates).then(() => {
      mongoose.connection.close(); //just in case?? TODO: investigate.
      process.exit();
    })
    .catch((err) => {
      mongoose.connection.close(); //just in case?? TODO: investigate.
      process.exit();
    });
  });
