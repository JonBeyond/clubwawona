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
server.post(`/api/authenticate/${endpoint}`, (req, res) => controller.login(req, res)); //TODO: this endpoint may not be following the RESTful standards

//Admin Metrics:
server.get('/api/members/:auth', (req, res) => controller.allMembers(req, res)); //TODO: this endpoint may not be following the RESTful standards
server.get('/api/report/:auth', (req, res) => controller.allResponses(req, res));

//Admin Management:
server.post('/api/master/:auth', (req, res) => controller.addMember(req, res));
server.patch('/api/master/:auth/reset', (req, res) => controller.resetEmail(req, res));
server.delete('/api/master/:auth/:email', (req, res) => controller.deleteMember(req, res));

//TODO: endpoints for sending emails

server.listen(port, () => console.log(`Server is listening on ${port}`))

//In case of unknown error, I don't want to shut down the server:
//--> this would be bad practice in a profesional server, but it is OK
//for this private website.
process.on('uncaughtException', function (err) {
  console.log(err);
})

