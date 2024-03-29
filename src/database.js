var fs = require("fs");
var dbFile = "data.db";
var exists = fs.existsSync(dbFile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFile);
var exports = module.exports = {};

exports.createDB = function() {
	db.serialize(function() {
		if(!exists) {
			db.run("CREATE TABLE GAMES(GAME_ID INTEGER PRIMARY KEY);");
			db.run("CREATE TABLE PLAYERS(PLAYER_ID INTEGER PRIMARY KEY, CONTACT TEXT, NAME TEXT);");
			db.run("CREATE TABLE PLAYERTARGETS(ASSASSIN_P_ID INTEGER, TARGET_P_ID, GAME_ID INTEGER);");
		}
	});
}

exports.addPlayer = function(playerName, contact) {
	db.serialize(function() {
		//Inserting NULL into the PLAYER_ID column with generate a unique integer for that player
		db.exec("INSERT INTO PLAYERS VALUES(NULL, \"" + playerName + "\",  \"" + contact + "\");"); 
	});
}

exports.addGame = function() {
	db.serialize(function() {
		//Only inserting a null value into the GAMES table will create a unique id to identify that game
		db.exec("INSERT INTO GAMES VALUES(NULL)");
	});
}

exports.removeGame = function(gameID) {
	db.serialize(function() {
		db.exec("DELETE FROM GAMES WHERE GAME_ID = " + gameID + ";");
	});
}

exports.addPlayerTarget = function(assassinID, targetID, gameID) {
	db.serialize(function() {
		db.exec("INSERT INTO PLAYERTARGETS VALUES(" + assassinID + ", " + targetID + ", " + gameID + ");");
	});
}	

exports.removePlayerTarget = function(assassinID, targetID, gameID) {
	db.serialize(function() {
		db.exec("DELETE FROM PLAYERTARGETS WHERE ASSASSIN_P_ID = " + assassinID + " & TARGET_P_ID = " + targetID + " & GAME_ID = " + gameID + ";");
	});
}

/*exports.getPlayerID = function(contact) {
	db.serialize(function() {
		db.
	}
}*/

exports.getAssassinID = function(targetID, gameID) {
	db.serialize(function() {
		db.get("SELECT TARGET_P_ID AS assassinID, targetID, gameID, FROM PLAYERTARGETS WHERE TARGET_P_ID = " + targetID + " & GAME_ID = " + gameID + ";", function(err, row){
			return row.assassinID;
		});
	});	
}

exports.getTargetID = function(assassinID, gameID) {
	db.serialize(function() {
		db.get("SELECT ASSASSIN_P_ID AS assassinID, targetID, gameID, FROM PLAYERTARGETS WHERE TARGET_P_ID = " + targetID + " & GAME_ID = " + gameID + ";", function(err, row){
			return row.targetID;
		});
	});
}

exports.getGamePlayerCount = function(gameID) {
	var playerCount = 0;
	db.serialize(function() {
		db.each("SELECT ROWID AS assassinID, targetID, gameID, FROM PLAYERTARGETS WHERE GAME_ID = " + gameID + ";", function(err, row) {
			++playerCount;	
		});
	});
	return playerCount;
}

