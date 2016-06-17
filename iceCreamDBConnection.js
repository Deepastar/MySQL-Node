// tell application that the "mysql" NPM must be installed in order to run
var mysql = require('mysql');

//creates a connection to the "icecreamDB" database using a localhost connection.
var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password: process.argv[2],
    database: "icecreamDB"
})

//Node connect to the MySQL server and inform the user that they have connected properly.
connection.connect(function(err){
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
})

//connection.query(<STRING>,function(err,res){}), we are telling Node to send an SQL query to our database and return the data collected through the "res" variable

//R - READ   - SELECT * FROM pets;
connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    console.log(res);
})
//C - CREATE - INSERT INTO pets (name, type, age) VALUES ('fido', 'dog', 3);
connection.query("INSERT INTO products SET ?",{flavor:"Rocky Road",price:3.00,quantity:50},function(err,res){}); 

//U - UDPATE - UPDATE pets SET name='under dog' WHERE type = 'dog';
connection.query("UPDATE products SET ? WHERE ?",[{quantity:100},{flavor:"Rocky Road"}],function(err,res){});

//D - DELETE - DELETE FROM pets WHERE type = 'mouse';

connection.query("DELETE FROM products WHERE ?",{flavor:"strawberry"},function(err,res){});

