//NOTE: 
//-----------------------------------------------------------------------------------------------
var express = require('express');
var app = express();
var myParser = require("body-parser");
var mysql = require('mysql');
const { response, request } = require('express');
const { createConnection } = require('net');

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json())

//MySQL Connection
console.log("Connecting to localhost...");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: ''
})

//Code tutorial: https://www.youtube.com/watch?v=f5kye3ESXE8 

//Get information from database.
app.get('/test', (request, response) => { //type localhost:8080/test to get data. Good way to check if its been updated.
  
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`Connected as id ${connection.threadId}`)

    connection.query('SELECT * from X', (err, rows) => { //obtain data from X table
      connection.release() //return the connection to pool

      if(!err) {
        response.send(rows)
      } else {
        console.log(err)
      }
    })
  })
})

//Add records
app.post('/addStudent', (request, response) => {

  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`Connected as id ${connection.threadId}`) //??

    //create variable sql creating mysql query
    var forminfo = request.body;
    var sql = "INSERT INTO student (X) VALUES (null, '" + request.body.fname + "', '" + request.body.lname + "',  '" + request.body.deposit + "', '" + request.body.depdate + "', '" + request.body.pnumber + "', '" + request.body.s_email + "', '" + request.body.gender + "', '" + request.body.s_address + "', '" + request.body.s_startDate + "', '" + request.body.lessonID + "')";
    
    connection.query(sql, function(err, result)  {
      connection.release() //return the connection to the pool

      if(!err) {
        response.send(`Student with Name: ${forminfo.first_name} has been added`) //Doesn't quite work
      } else {
        console.log(err)
      }
    })
    console.log(request.body)
  })
})

//Listen on port 8080
app.listen(8080, () => console.log(`listening on port 8080`));