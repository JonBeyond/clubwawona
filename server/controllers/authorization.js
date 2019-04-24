const bcrypt = require('bcrypt');
const Credentials = require('../model.js').Credentials;
var authKey = null;

const login = (providedPassword, res) => {
  Credentials.findOne({type: 'admin'})
  .then(credential => {
    bcrypt.compare(providedPassword,  credential.token)
    .then(response => {
      if(response) {
        //generate and store a key that will be deleted after a set time
        let response = {
          status: 'PASSED',
          APIKey: generateTemporaryKey()
        }
        res.send(JSON.stringify(response));
      }
      else {
        let response = {
          status: 'badkey',
          APIKey: null
        }
        res.send(JSON.stringify(response));
      }
    })
  })
  .catch(err => {
    console.log('error retrieving admin hash');
    res.send(500);
  });
}

const generateTemporaryKey = () => {
  authKey = ~~(Math.random()*100000000);
  console.log(`Generated new key: ${authKey}`);
  //generate a temporary key (Only one session can be active at any time)
  setTimeout(() => {
    console.log(`Authkey timeout: ${authKey}`);
    authKey = null;
    console.log(`Authkey should be null: ${authKey}`);
  }, 600000);
  return authKey;
}

const checkCurrentAuthKey = (input) => {
  let key = Number(input);
  console.log(`comparing providied: ${key} with official: ${authKey} (Result: ${key === authKey})`);
  if (key === null) return false;
  else return key === authKey;
}

module.exports = { login, checkCurrentAuthKey };
