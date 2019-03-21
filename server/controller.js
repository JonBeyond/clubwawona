const database = require('../config.js').database;
const RSVP = require('./model.js').RSVP;
const Master = require('./model.js').Master;
const mongoose = require('mongoose');

const validateToken = (document, res) => {
  Master.findOne({email: document.email}, (err, response) => {
    if (response && response.token === document.security) {
      console.log('Successful registration processed');
      saveRSVP(document, res);
    } else {
      console.log('Failed registration - bad key');
      res.send('badkey');
    }
  });

}

const saveRSVP = (document, res) => {
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

const processResponses = (res) => {
  RSVP.find({}, (err, documents) => {
    if (err) res.sendStatus(500);
    dataBreakdown(res, documents);
  });
}

const retrieveMembers = (res) => {
  Master.find({}, (err, documents) => {
    if (err) res.sendStatus(500);
    let list = [];
    documents.forEach((doc) => {
      list.push([doc['email'],doc['token']]);
    });
    res.send(list);
  })
}

const dataBreakdown = (res, documents) => {
  let breakdown = {
    registrations: [],
    emails: [],
    other: [],
    primaryGuests: 0,
    secondaryGuests: 0,
    beer: {
      "Animal": 0,
      "none": 0,
      "Hops": 0,
      "Light": 0,
      "Sours": 0,
      "Heavy": 0
    },
    liquor: {
      "Animal": 0,
      "none": 0,
      "Vodka": 0,
      "Tequila": 0,
      "Whiskey": 0,
      "Gin": 0
    },
    wine:{
      "Animal": 0,
      "none": 0,
      "Cab": 0,
      "Syrah": 0,
      "Pinot": 0,
      "White": 0
    }
  };

  documents.forEach(response => {
    let name = `${response['firstName']} ${response['lastName']}`;
    breakdown.emails.push(response['email']);
    breakdown.registrations.push(name);
    if (response['other'] !== '') {
      let obj = {};
      obj[name] = response['other'];
      breakdown.other.push(obj);
    }
    breakdown.beer[response['beer']]++;
    breakdown.liquor[response['liquor']]++;
    breakdown.wine[response['wine']]++;
    breakdown.primaryGuests++;
    breakdown.secondaryGuests += response['guests'];
  });

  res.send(breakdown);
}

module.exports = { //These are the controller entry points
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
    },

    allResponses: (res) => {
      mongoose.connect(database, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => {
        processResponses(res);
      })
      .catch(err => {
        console.log(err);
        res.send(500);
        mongoose.connection.close(); //just in case?? TODO: investigate.
      });
    },

    allMembers: (res) => {
      mongoose.connect(database, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => {
        retrieveMembers(res);
      })
      .catch(err => {
        console.log(err);
        res.send(500);
        mongoose.connection.close(); //just in case?? TODO: investigate.
      });
    }
  }
}
