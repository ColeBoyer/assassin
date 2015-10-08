//This is all very bad and certainly not anything close to final
var assassinDB = require('./database.js');
assassinDB.createDB();
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index.html', function(req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});

app.post('/submit', function(req, res) {
	var name = req.query.name, email = req.query.email;
	assassinDB.addPlayer(name, email);
	res.end("Thank you for submitting.");
});

var server = app.listen(8081, function() {

})
