var mysql = require('mysql');
var inquirer= require('inquirer');

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: process.argv[2],
    database: "greatbay_db
})

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected with id " + connection.threadId);
}
                   
var start = function () {
    inquirer.prompt ({
        name: "postOrBid",
        type: "rawList",
        message: "Would you like to [POST] an auction or [BID] or an auction?",
        choices: ["POST", "BID"]
    }).then(function(answer) {
        if(answer.postOrBid.toUpperCase() == "POST"){
            postAuction();
        }
        else {
            bidAuction();
        }
    })
};

var postAuction = function () {
    inquirer.prompt([
        { 
        name: "item",
        type: "input",
        message: "What is the item you would like to submit?"   
        },
        {
        name: "category",
        type: "input",
        message: "What category would you like to place your auction in?"    
        },
        {
        name: "startingBid",
        type: "input",
        message: "What would you like your starting bid to be?",
        validate: function (value) {
            if (isNan(value) == false) {
                return true;
            }
            else {
                return false;
            }
        }    
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO auctions SET ?", {}, function (err, res) {
        
        
        })
    })
}
