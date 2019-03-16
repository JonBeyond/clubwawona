const express = require('express');
const server = express();
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
const controller = require('./controller.js');
const port = 3000;

server.use(bodyParser.json());

//TODO: this is for dev only
//once deployed, bundle should be served from S3
server.use('/', express.static(path.join(__dirname, '../frontend/dist')));

// server.get('/', (req,res) => {
//   TODO: production
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

server.post('/api/RSVP', (req, res) => {
  controller.process.RSVP(req.body, res);
})

server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
})
