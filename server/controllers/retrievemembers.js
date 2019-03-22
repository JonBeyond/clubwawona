const Master = require('../model.js').Master;

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

module.exports = { retrieveMembers };
