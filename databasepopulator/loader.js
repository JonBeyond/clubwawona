const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
const Schema = require('../server/model.js');//can use: Master, RSVP, Credentials
const config = require('../config.js');

//***********   GENERATE FAKE EMAILS   ***********//
let emails = [];
for (let i = 0; i < 50; i++) {emails.push(`fakeemail${i}@gmail.com`)}


//*********** REUSABLE HELPER FUNCTIONS ***********//
//Upsert a record, via promise:
//Example usage:
  //query: {email: doc.email}
  //cabinent: schema.RSVP, schema.Master, schema.Credentials

const update = (doc, cabinent, query) => {
  return new Promise((resolve, reject) => {
    cabinent.updateOne(query, doc, {upsert: true}, (err) => {
      if(err) reject(err);
      resolve();
    });
  });
}

//***********         LOADERS            ***********//
const generateCredential = () => {
  console.log(`creating MD5 with ${config.credential} and ${config.tokenkey}`);
  let cred = {
    password: md5(config.credential, config.tokenkey)
  }
  update(cred, Schema.Credentials, {password: cred.password})
  .then(() => {
    console.log('Database complete');
    mongoose.connection.close();
    process.exit();
  })
  .catch(err => {
    console.log('Error creating credential');
    mongoose.connection.close();
    process.exit();
  })
}

const loadRSVPs = (documents) => {
  let upserts = [];
  documents.forEach(document => {
    delete document['tokenSent'];
    document['security'] = document['token'];
    delete document['token']; //TODO:
    document['guests'] = 0;
    document['beer'] = 'Sours';
    document['wine'] = 'Cab';
    document['liquor'] = 'Tequila';
    document['other'] = '';
    upserts.push(update(document, Schema.RSVP, {email: document['email']}));
  });

  Promise.all(upserts)
  .then(() => {
    console.log('RSVPs loaded');
    generateCredential();
  })
  .catch((err) => {
    console.log('error updating RSVPs');
    console.log(err);
    mongoose.connection.close();
    process.exit();
  })
}

const createMasterList = () => {
  let upserts = [];
  let docs = [];
  emails.forEach(email => {
    let document = {
        email: email,
        token: md5(email.toLowerCase(),config.tokenkey),
        tokenSent: false,
        firstName: 'blank',
        lastName: 'blanky'
    }
    upserts.push(update(document, Schema.Master, {email: document.email}));
    docs.push(document); //replace the email with the document.
  });

  Promise.all(upserts)
  .then(() => {
    console.log('Master list has been loaded.');
    loadRSVPs(docs);
  })
  .catch((err) => {
    console.log(`error updating master list: ${err}`);
    mongoose.connection.close();
    process.exit();
  });
}

const dropDatabases = () => {
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
  .catch(err => {
    console.log('Error dropping databases');
    mongoose.connection.close();
    process.exit();
  });
}

//****** LOADER / INITIALIZER ******//
(function () {
  mongoose.connect(config.database, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => dropDatabases())
  .catch((err) => {
    console.log('error connecting to the database');
    mongoose.connection.close();
    process.exit();
  });
})()
