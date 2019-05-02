const express = require('express');
const server = express();
const bodyParser = require("body-parser");
const path = require('path');
const controller = require('./controller.js');
const endpoint = require('../config.js').endpoint;
const port = 3000;

server.use(bodyParser.json());

//TODO: this is for dev only
//once deployed, bundle should be served from S3
server.use('/',express.static(path.join(__dirname, '../frontend/dist')));

//Client RSVP:
server.post('/api/RSVP', (req, res) => controller.RSVP(req, res));

//Admin Login:
server.post(`/api/login/${endpoint}`, (req, res) => controller.login(req, res)); //TODO: this endpoint may not be following the RESTful standards

//Admin Metrics:
server.get('/api/report/:auth', (req, res) => controller.allResponses(req, res));

//Admin Management:
server.get('/api/members/retrieve/:auth', (req, res) => controller.allMembers(req, res));
server.post('/api/members/new/:auth', (req, res) => controller.addMember(req, res));
server.patch('/api/members/reset/:email/:auth', (req, res) => controller.resetEmail(req, res));
server.delete('/api/members/:email/:auth', (req, res) => controller.deleteMember(req, res));

//Email System Management
server.patch('/api/email/:email/:auth', (req, res) => controller.emailOne(req, res));
server.patch('/api/email/all/:auth', (req, res) => controller.emailAll(req, res));

server.listen(port, () => console.log(`Server is listening on ${port}`))

//In case of unknown error, I don't want to shut down the server:
//--> this would be bad practice in a profesional server, but it is OK
//for this private website.
process.on('uncaughtException', function (err) {
  console.log(err);
})

