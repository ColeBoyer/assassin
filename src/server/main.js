var assassinDB = require('./database.js');
assassinDB.createDB();
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index.htm', function(req, res) {
	res.sendFile(__dirname + "/" + "index.htm");
});

app.get('/process_get', function(req, res) {
	var name = req.query.name, email = req.query.email;
	assassinDB.addPlayer(name, email);
});

var server = app.listen(8081, function() {

})
