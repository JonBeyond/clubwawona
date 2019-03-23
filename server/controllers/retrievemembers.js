const Master = require('../model.js').Master;
const checkCurrentAuthKey = require('./login.js').checkCurrentAuthKey;

const retrieveMembers = (req, res) => {
  if (checkCurrentAuthKey(Number(req.url.substring(13)))) {
    Master.find({}, (err, documents) => {
      if (err) res.sendStatus(500);
      let list = [];
      documents.forEach((doc) => {
        list.push([doc['email'],doc['token']]);
      });
      res.send(list);
    });
  } else res.send('bad or expired api key');
}

module.exports = { retrieveMembers };
