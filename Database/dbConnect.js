const mysql = require('mysql');
const conn = require('../config/config.json');

var connection = mysql.createConnection({

    host: conn.host,

    user : conn.user,

    password : conn.password,

    database : conn.database

});



connection.connect(function(error)

{

    console.log('Connecting to the database....')

    if(error)

    {

        console.log('Something went wrong while connecting to database !');

    }

    else{

        console.log('Successfully Connected !');

    }

});



module.exports = connection;