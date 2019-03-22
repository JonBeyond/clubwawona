const express = require('express');
const server = express();
const bodyParser = require("body-parser");
const path = require('path');
const controller = require('./controller.js');
const port = 3000;

server.use(bodyParser.json());

//TODO: this is for dev only
//once deployed, bundle should be served from S3
server.use('/',express.static(path.join(__dirname, '../frontend/dist')));

server.post('/api/RSVP', (req, res) => {
  //TODO: check for proper headers / key
  controller.process.RSVP(req.body, res);
})

server.get('/api/members', (req, res) => {
  controller.process.allMembers(res);
})

server.get('/api/report', (req, res) => {
  controller.process.allResponses(res);
})

server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
})

//In case of unknown error, we don't want to shut down the server:
process.on('uncaughtException', function (err) {
  console.log(err);
})

