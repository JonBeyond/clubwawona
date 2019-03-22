const md5 = require('blueimp-md5');
const key = require('../../config.js').tokenkey;
const lookup = require('../../config.js').lookup;
const Credentials = require('../model.js').Master;

const login = (credential, res) => {
  let hashCredential = md5(credential,key);
  Credentials.findOne({password: hashCredential}, (err, document) => {
    if (err) res.send(500);
    else if (document && document.password === hashCredential) { //just double check
      res.send('PASSED');
    } else {
      res.send('badkey');
    }
  });
}

module.exports = { login };
