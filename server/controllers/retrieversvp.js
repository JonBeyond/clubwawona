const RSVP = require('../model.js').RSVP;
const checkCurrentAuthKey = require('./authorization.js').checkCurrentAuthKey;
const mongoose = require('mongoose');

const processReport = (req, res) => {
  if (checkCurrentAuthKey(req.params.auth)) {
    RSVP.find({}, (err, documents) => {
      if (err) res.sendStatus(500);
      dataBreakdown(res, documents);
      mongoose.connection.close();
    });
  } else {
    res.send('bad or expired api key');
    mongoose.connection.close();
  }
}

const dataBreakdown = (res, documents) => {
  let breakdown = {
    registrations: [],
    emails: [],
    other: [],
    primaryGuests: 0,
    secondaryGuests: 0,
    beer: {
      "None": 0,
      "Hops": 0,
      "Light": 0,
      "Sours": 0,
      "Heavy": 0
    },
    liquor: {
      "None": 0,
      "Vodka": 0,
      "Tequila": 0,
      "Whiskey": 0,
      "Gin": 0
    },
    wine:{
      "None": 0,
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

  //***** RETURN TO CLIENT *****/
  res.send(breakdown);
}

module.exports = { processReport };
