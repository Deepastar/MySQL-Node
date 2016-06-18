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

var multiSearch = function () {
    connection.query("SELECT artist FROM `top5000` GROUP BY artist HAVING count(*)>1", function (err, res){
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].artist);
        }
    })
}