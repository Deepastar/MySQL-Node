var mysql = require ('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user: "root",
    password: process.argv[2],
    database: "playlistDB"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected with id ", connection.threadId);
});

connection.query('SELECT * FROM songs', function(err, res) {
    if(err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    }
    
    console.log("-----------------------------------");
});

connection.query('SELECT * FROM songs WHERE genre=?', ['Classic Rock'], function (err, res) {
    for (var i =0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);     
    }
})