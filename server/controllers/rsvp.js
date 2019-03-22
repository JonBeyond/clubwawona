//Schemas:
const RSVP = require('../model.js').RSVP;
const Master = require('../model.js').Master;

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

module.exports = { validateToken };
