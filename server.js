// get the things we need
var express = require('express');
var app = express();
var path = require('path');

// set the public folder to serve public assets
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/website1'));
app.use(express.static(__dirname + '/public/gcal_publisher'));

// setup alt route for website
app.get('/site', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/website1/index.html'));
});

// routes for gcal publisher app
app.get('/gapi', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/gcal_publisher/gapi.html'));
});
app.get('/gpub', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/gcal_publisher/index.html'));
});

//default to the website

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/website1/index.html'));
});



// start the server on port 8080 (http://localhost:8080)
app.listen(process.env.PORT || 8080);
console.log('Magic happens on port '+process.env.PORT +'.');
