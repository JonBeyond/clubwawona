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

server.post('/api/RSVP', (req, res) => controller.process.RSVP(req.body, res));
server.get('/api/members/:auth', (req, res) => controller.process.allMembers(req, res));
server.get('/api/report/:auth', (req, res) => controller.process.allResponses(req, res));
server.post('/api/authenticate', (req, res) => controller.process.login(req.body.credential, res));

server.listen(port, () => console.log(`Server is listening on ${port}`))

//In case of unknown error, we don't want to shut down the server:
//--> this would be bad practice in a profesional server, but it is OK
//for this private website.
process.on('uncaughtException', function (err) {
  console.log(err);
})

