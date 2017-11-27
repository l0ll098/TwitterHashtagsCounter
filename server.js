'use strict';

var port = process.env.PORT || 1337;

var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var functions = require('./functions');
let path = require('path');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/dist')));

// Api paths
app.post('/api/authorize', functions.authorize);
app.post('/api/search', functions.search);


// Catch all other routes and return the index file
//This catch all route, denoted with *, MUST come last after all other API routes have been defined
app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(port);
console.log("Server listening on port " + port);