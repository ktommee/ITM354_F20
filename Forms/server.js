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

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: "root",
  port: 3306,
  database: "harmony",
  password: ""
});

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'harmony'
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
//-----------------------------------------------------------------------
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

//Update Student
//-----------------------------------------------------------------------
app.post('/updateStudentFname', (request, response) => {

  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`Connected as id ${connection.threadId}`) //??
    
    var update_sql = "UPDATE student SET Student_fname = ? WHERE Student_id = ?";
    var update_fname = request.body.first_name;
    var grab_id = request.body.stu_id;

    connection.query(update_sql, [update_fname, grab_id], function(err, result)  { 
      connection.release() //return the connection to the pool

    })
    console.log(request.body)
    response.redirect("/searchAndUpdate.html");
  })
})

//Query Table Creation for STUDENT NAMES
//-----------------------------------------------------------------------
//Potential Code help: https://coursesweb.net/nodejs/select-mysql-output-html-table
//CLEMENT'S CODE FOR TEACHER'S SCHEDULE OUTPUT
//THIS IS BASED OFF THE SAMPLE DATABASE
function Studentquery_DB(POST, response) {
  stufname = POST['stu-fname']; // Grab the parameters from the submitted form
  stulname = POST['stu-lname'];
  
  query = "SELECT * FROM student WHERE Student_fname = '" + stufname + "' AND Student_lname = '" + stulname + "'";
  connection.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    //var res_string = JSON.stringify(result);
    //var res_json = JSON.parse(res_string);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="searchAndUpdate.html" method="GET">`;
    response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
    response_form += `<td><B>Student ID</td><td><B>First Name</td><td><B>Last Name</td><td><B>Registration Date</td><td><B>Start Date</td><td><B>School</td><td><B>Grade</td><td><B>Email</td><td><B>Phone#</td><td><B>Active Status</td><td><B>Gender</td><td><B>Lesson ID</td></b>`;
    for (i in result) {
      response_form += `<tr><td> ${result[i].Student_id}</td>`;
      response_form += `<td> ${result[i].Student_fname}</td>`;
      response_form += `<td> ${result[i].Student_lname}</td>`;
      response_form += `<td> ${result[i].Student_city}</td>`;
      response_form += `<td> ${result[i].Registration_date}</td>`;
      response_form += `<td> ${result[i].Start_date}</td>`;
      response_form += `<td> ${result[i].School}</td>`;
      response_form += `<td> ${result[i].Grade}</td>`;
      response_form += `<td> ${result[i].Student_email}</td>`;
      response_form += `<td> ${result[i].Student_pnum}</td>`;
      response_form += `<td> ${result[i].Active}</td>`;
      response_form += `<td> ${result[i].Gender}</td>`;
      response_form += `<td> ${result[i].Student_lesson_id}</td></tr>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Another Query?"> </form>`;
    response.send(response_form);
  });
}

app.post("/student_query", function (request, response) {
let POST = request.body;
Studentquery_DB(POST, response);
});
//END OF CLEMENT'S CODE

//Listen on port 8080
app.listen(8080, () => console.log(`listening on port 8080`));

