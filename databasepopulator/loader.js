// This file is intended for development purposes,
//until the full admin panel is ready for deployment.
//At that point, all database configuration will take place
//via the admin panel.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = require('../server/model.js');//can use: Master, RSVP, Credentials
const config = require('../config.js');
const saltRounds = 12; //13 for production
const uuidv5 = require('uuid/v5'); //for user tokens


//***********   GENERATE FAKE EMAILS   ***********//
let emails = [];
for (let i = 0; i < 50; i++) {emails.push(`fakeemail${i}@gmail.com`)}

//*********** REUSABLE HELPER FUNCTIONS ***********//

//********************************
//Upsert a record, via promise:
//Example input:
  //query: {email: doc.email}
  //cabinent: schema.RSVP, schema.Master, schema.Credentials
const update = (doc, cabinent, query) => {
  return new Promise((resolve, reject) => {
    cabinent.updateOne(query, doc, {upsert: true}, (err) => {
      if(err) reject(err);
      resolve(doc);
    });
  });
}

const getRandomSelection = (array) => {
  let rand = ~~(Math.random()*Math.random()*array.length);
  return array[rand];
}

const handleError = (err, state) => {
  console.error(state);
  console.error(err);
  mongoose.connection.close();
  process.exit();
}

//***********         LOADERS            ***********//
const generateCredential = () => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(config.credential, salt, (err, hash) => {
      let document = {
        type: 'admin',
        token: hash
      }
      update(document, Schema.Credentials, {type: 'admin'})
      .then(() => {
        console.log('Admin credential complete');
        mongoose.connection.close();
        process.exit();
      })
      .catch(err => handleError(err, 'Error creating credential'));
    });
  });
}

const loadRSVPs = (documents) => {
  let upserts = [];
  const beerOptions = ['None','Sours','Light','Hops','Heavy'];
  const liquorOptions = ['None', 'Tequila', 'Whiskey', 'Gin'];
  const wineOptions = ['None', 'Cab', 'Syrah', 'Pinot', 'White'];
  documents.forEach(document => {
    delete document['tokenSent'];
    delete document['token'];
    document['guests'] = 0;
    document['beer'] = getRandomSelection(beerOptions);
    document['wine'] = getRandomSelection(wineOptions);
    document['liquor'] = getRandomSelection(liquorOptions);
    document['other'] = '';
    upserts.push(update(document, Schema.RSVP, {email: document['email']}));
  });

  Promise.all(upserts)
  .then((docs) => {
    console.log('RSVPs loaded');
    generateCredential();
  })
  .catch((err) => handleError(err, 'Error updating RSVPs'));
}

const createMasterList = () => {
  let upserts = emails.map(email => {
    return generateUUID(email);
  });
  Promise.all(upserts)
  .then((docs) => {
    console.log('Master list has been loaded.');
    loadRSVPs(docs);
  })
  .catch((err) => handleError(err, 'Error updating master list'));
}

const generateUUID = (email) => {
  //note: this function can be safely de-promisified
  return new Promise((resolve, reject) => {
    let document = {
      email: email,
      firstName: 'blank',
      lastName: 'blanky',
      token: uuidv5(email, config.eventIdentifier),
      tokenSent: false
    }
    update(document, Schema.Master, {email: document.email})
    .then(document => resolve(document))
    .catch(err => reject(err));
  });
}

const deleteExistingCollections = () => {
  Schema.RSVP.deleteMany({}).then(() => {
    console.log('RSVPs deleted.');
    Schema.Master.deleteMany({}).then(() => {
      console.log('Master list deleted.');
      Schema.Credentials.deleteMany({}).then(() => {
        console.log('Credentials deleted.');
        createMasterList();
      })
    })
  })
  .catch(err => handleError(err, 'Error dropping databases'));
}

//****** START THE LOADER ******//
(function () {
  mongoose.connect(config.database, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => deleteExistingCollections())
  .catch((err) => handleError(err, 'Error connecting to the database'));
})()
