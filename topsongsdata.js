var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: process.argv[2], //Your password
    database: "TopSongsDb;"
})

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
})

var runSearch = function() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Find songs by artist", "Find all artists who appear more than once", "Find data within a specific range", "Search for a specific song"]
    }).then(function(answer) {
        if (answer.action == "Find songs by artist") {
            artistSearch();
        }
        if (answer.action == "Find all artists who appear more than once") {
            multiSearch();
        }
        if (answer.action == "Find data within a specific range") {
            rangeSearch();
        }
        if (answer.action == "Search for a specific song") {
            songSearch();
        }
    })
}

//all data for songs sung by a specific artist
var artistSearch = function () {
    inquirer.prompt({
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
    }).then(function (answer) {
        connection.query("SELECT position, song, year FROM `top5000` WHERE artist=?", answer.artist, function (err, res){
            for (var i = 0; i < res.length; i++) {
                console.log("Position " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
            }
            runSearch();
        })
    })
}

//all artists who appear within the top 5000 more than once
var multiSearch = function () {
    connection.query("SELECT artist FROM `top5000` GROUP BY artist HAVING count(*)>1", function (err, res){
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].artist);
        }
    })
}

//all data contained within a specific range
var rangeSearch = function () {
    inquirer.prompt([
        {
            name: "start",
            type: "input",
            message: "Enter starting position: ",
            validate: function (value) {
                if (isNan(value) == false){
                    return true;
                } else {
                    return false;
                }   
            }   
        }
    ]).then(function(answer){
        connection.query("SELECT position, song, artist, year FROM `top5000` WHERE position BETWEEN " + answer.start + "AND" + answer.end, function (err, res){
            for (var i = 0; i < res.length; i++) {
                console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Artist: " + res[i].artist + " || Year: " + res[i].year);
            }
            runSearch();
        })
    })
}

//searches for a specific song in the top 5000 and returns the data for it

var songSearch = function() {
    inquirer.prompt({
        name: "song",
        type: "input",
        message: "What song would you like to look for?"
    }).then(function(answer) {
        console.log(answer.song)
        connection.query('SELECT * FROM top5000 WHERE song = "' + answer.song + '"', function(err, res) {
            console.log("Position: " + res[0].position + " || Song: " + res[0].song + " || Artist: " + res[0].artist + " || Year: " + res[0].year);
            runSearch();
        })
    })
}


