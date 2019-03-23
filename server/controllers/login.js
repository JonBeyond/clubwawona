const bcrypt = require('bcrypt');
const Credentials = require('../model.js').Credentials;

const login = (providedPassword, res) => {
  Credentials.findOne({type: 'admin'})
  .then(credential => {
    bcrypt.compare(providedPassword,  credential.token)
    .then(response => {
      if(response) res.send('PASSED')
      else res.send('badkey')
    })
  })
  .catch(err => {
    console.log('error retrieving admin hash');
    res.send(500);
  });
}

module.exports = { login };
