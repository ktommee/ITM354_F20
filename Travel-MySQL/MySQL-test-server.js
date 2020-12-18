var express = require('express');
var app = express();
var myParser = require("body-parser");
var mysql = require('mysql');

// THIS IS ALL CODE FROM ITM 352 SERVER.JS NEEDED TO GET LOGIN TO WORK, NOT ALL OF CODE IS NECESSARY 

// Source: Port Assignment 1 Example + Lab 13 info_server_Ex4.js 
var express = require('express');
var app = express();
var myParser = require("body-parser");
var querystring = require('querystring');
var fs = require('fs'); // require readFileSync;


// Source: Lab 14 exercise 4 
var filename = "user_reg_data.json"; // define file name
var quantityqstring = "";
var loginqstring = "";
var registerqstring = "";
var schedulename = "modify_schedule.json"

var raw_data = fs.readFileSync(filename, 'utf-8');
var users_reg_data = JSON.parse(raw_data);


// Source: Lab 14 exercise 4 
app.use(myParser.urlencoded({ extended: true })); // use myparser 

// Source: Lab 14 exercise 4
// Process login form POST and redirect to invoice page if ok, back to login page if not; Admin Login
app.post("/login1.html", function (request, response) {
  let POST = request.body; // grab body of request and save it in POST
  qstring = querystring.stringify(POST); // stringify or convert POST (login info) to a string
  loginqstring = qstring;

  if (typeof POST['submit'] == undefined) {
    // check if the submit button was pressed.
    response.redirect("login1.html");
    // redirect back to login page if nothing was submitted 
  } else {
    // user submitted username and password. test them for validity

    //check if valid username exists
    var username = POST.username; // store what was typed in the username textbox in the variable username
    var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
    var usernameqstring = "&user=" + username; // creates query string for username
    if (users_reg_data[usernameLowerCase] != undefined) // check if username exists in user registration data
    {
      if (POST.password == users_reg_data[usernameLowerCase].password) // the password correctly corresponds to the defined username in the registration data
      {
        response
          .cookie('userID', usernameLowerCase)  // Add a cookie
          .redirect("admin.html"); // username and password match the user reg data; send to invoice with quantity and username info stored in query string
        return;
      }
      else {
        // username exists in user registration data but password is incorrect

        response.redirect("loginredirect2.html?" + loginqstring); // send to a redirect page along with username info saved in query string
        return;
      }
    } else {
      // username doesn't exist 
      console.log("username doesn't exist");
    }
    response.redirect("loginredirect1.html?" + loginqstring); // send to redirect page along with username info saved in query string
  }
});

// Source: Lab 14 exercise 4
// Process login form POST and redirect to invoice page if ok, back to login page if not; Teacher Login
app.post("/login2.html", function (request, response) {
  let POST = request.body; // grab body of request and save it in POST
  qstring = querystring.stringify(POST); // stringify or convert POST (login info) to a string
  loginqstring = qstring;

  if (typeof POST['submit'] == undefined) {
    // check if the submit button was pressed.
    response.redirect("login2.html");
    // redirect back to login page if nothing was submitted 
  } else {
    // user submitted username and password. test them for validity

    //check if valid username exists
    var username = POST.username; // store what was typed in the username textbox in the variable username
    var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
    var usernameqstring = "&user=" + username; // creates query string for username
    if (users_reg_data[usernameLowerCase] != undefined) // check if username exists in user registration data
    {
      if (POST.password == users_reg_data[usernameLowerCase].password) // the password correctly corresponds to the defined username in the registration data
      {
        response
          .cookie('userID', usernameLowerCase)  // Add a cookie
          .redirect("teacher.html"); // username and password match the user reg data; send to invoice with quantity and username info stored in query string
        return;
      }
      else {
        // username exists in user registration data but password is incorrect

        response.redirect("loginredirect2.html?" + loginqstring); // send to a redirect page along with username info saved in query string
        return;
      }
    } else {
      // username doesn't exist 
      console.log("username doesn't exist");
    }
    response.redirect("loginredirect1.html?" + loginqstring); // send to redirect page along with username info saved in query string
  }
});

// Source: Lab 14 exercise 4
// Process login form POST and redirect to invoice page if ok, back to login page if not; Student Login
app.post("/login3.html", function (request, response) {
  let POST = request.body; // grab body of request and save it in POST
  qstring = querystring.stringify(POST); // stringify or convert POST (login info) to a string
  loginqstring = qstring;

  if (typeof POST['submit'] == undefined) {
    // check if the submit button was pressed.
    response.redirect("login3.html");
    // redirect back to login page if nothing was submitted 
  } else {
    // user submitted username and password. test them for validity

    //check if valid username exists
    var username = POST.username; // store what was typed in the username textbox in the variable username
    var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
    var usernameqstring = "&user=" + username; // creates query string for username
    if (users_reg_data[usernameLowerCase] != undefined) // check if username exists in user registration data
    {
      if (POST.password == users_reg_data[usernameLowerCase].password) // the password correctly corresponds to the defined username in the registration data
      {
        response
          .cookie('userID', usernameLowerCase)  // Add a cookie
          .redirect("student.html"); // username and password match the user reg data; send to invoice with quantity and username info stored in query string
        return;
      }
      else {
        // username exists in user registration data but password is incorrect

        response.redirect("loginredirect2.html?" + loginqstring); // send to a redirect page along with username info saved in query string
        return;
      }
    } else {
      // username doesn't exist 
      console.log("username doesn't exist");
    }
    response.redirect("loginredirect1.html?" + loginqstring); // send to redirect page along with username info saved in query string
  }
});

// Continuation of Kazman code

console.log("Connecting to localhost...");
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: "root",
  port: 3306,
  database: "harmony",
  password: ""
});

console.log("Connecting to localhost...");
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: "root",
  port: 3306,
  database: "harmony",
  password: ""
});
//Adding to Database
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'harmony'
})

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

/*function isNonNegInt(stringToCheck, returnErrors = false) {
  errors = []; // assume no errors at first
  if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
  if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
  if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

  return returnErrors ? errors : (errors.length == 0);
}

function query_DB(POST, response) {
  if (isNonNegInt(POST['low_price'])
    && isNonNegInt(POST['high_price'])) {   // Only query if we got a low and high price
    low = POST['low_price'];      // Grab the parameters from the submitted form
    high = POST['high_price'];
    query = "SELECT * FROM Room where price > " + low + " and price < " + high;  // Build the query string
    con.query(query, function (err, result, fields) {   // Run the query
      if (err) throw err;
      // console.log(result);
      var res_string = JSON.stringify(result);
      var res_json = JSON.parse(res_string);

      // Now build the response: table of results and form to do another query
      response_form = `<form action="Room-query.html" method="GET">`;
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>Room#</td><td><B>Hotel#</td><td><B>Type</td><td><B>Price</td></b>`;
      for (i in res_json) {
        response_form += `<tr><td> ${res_json[i].roomNo}</td>`;
        response_form += `<td> ${res_json[i].hotelNo}</td>`;
        response_form += `<td> ${res_json[i].type}</td>`;
        response_form += `<td> ${res_json[i].price}</td></tr>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Another Query?"> </form>`;
      response.send(response_form);
    });
  } else {
    response.send("Enter some prices doofus!");
  }
}
*/

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

/*
app.post("/process_query", function (request, response) {
  let POST = request.body;
  query_DB(POST, response);
}); */

//CLEMENT'S CODE START
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//CODE FOR TEACHER'S SCHEDULE OUTPUT
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function Teachquery_DB(POST, response) {
  teachfname = POST['teach-fname'];      // Grab the parameters from the submitted form
  teachlname = POST['teach-lname'];
  
  query = "SELECT L_day, L_time, Student_fname, Student_lname, Gender, Student_pnum, Student_email FROM Lesson_slot,Student  WHERE Lesson_id = Student_lesson_id AND Lesson_teacher_id IN(SELECT Teacher_id FROM Teachers WHERE Teacher_fname = '" + teachfname + "' AND Teacher_lname = '" + teachlname + "')";
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    //var res_string = JSON.stringify(result);
    //var res_json = JSON.parse(res_string);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="searchAndUpdate.html" method="GET">`;
    response_form += `<link rel="stylesheet" href="table_generation.css">`
    response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
    response_form += `<td><B>Lesson Day</td><td><B>Lesson Time</td><td><B>Student First Name</td><td><B>Student Last Name</td><td><B>Student Gender</td><td><B>Student Phone Number</td><td><B>Student Email</td></b>`;
    for (i in result) {
      response_form += `<tr><td> ${result[i].L_day}</td>`;
      response_form += `<td> ${result[i].L_time}</td>`;
      response_form += `<td> ${result[i].Student_fname}</td>`;
      response_form += `<td> ${result[i].Student_lname}</td>`;
      response_form += `<td> ${result[i].Gender}</td>`;
      response_form += `<td> ${result[i].Student_pnum}</td>`;
      response_form += `<td> ${result[i].Student_email}</td></tr>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Another Query?"> </form>`;
    response.send(response_form);
  });
}

app.post("/teacher_query", function (request, response) {
let POST = request.body;
Teachquery_DB(POST, response);
});

//CODE FOR STUDENT REGISTRATION TIME 
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function StudentRegInfo_DB(POST, response) {
  dateBegin = POST['date-begin'];      // Grab the parameters from the submitted form
  dateEnding = POST['date-ending'];
  
  query = "SELECT Student_fname, Student_lname, Registration_date FROM Student WHERE Registration_date >= '" + dateBegin + "' AND Registration_date <= '" + dateEnding + "'";
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    //var res_string = JSON.stringify(result);
    //var res_json = JSON.parse(res_string);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="student_reg_info.html" method="GET">`;
    response_form += `<link rel="stylesheet" href="table_generation.css">`
    response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
    response_form += `<td><B>Student First Name</td><td><B>Student Last Name</td><td><B>Registration Date</td></b>`;
    for (i in result) {
      response_form += `<tr><td> ${result[i].Student_fname}</td>`;
      response_form += `<td> ${result[i].Student_lname}</td>`;
      response_form += `<td> ${result[i].Registration_date}</td></tr>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Another Query?"> </form>`;
    response.send(response_form);
  });
}

app.post("/process_time", function (request, response) {
let POST = request.body;
StudentRegInfo_DB(POST, response);
});

//Active Status Report
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function ActiveStatus_DB(POST, response) {
status = POST['student_activity'];      // Grab the parameters from the submitted form
  
  query = "SELECT Student_id, Student_fname, Student_lname FROM Student WHERE Active = '" + status + "'";
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    //var res_string = JSON.stringify(result);
    //var res_json = JSON.parse(res_string);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="searchStatus.html" method="GET">`;
    response_form += `<link rel="stylesheet" href="table_generation.css">`
    response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
    response_form += `<td><B>Student ID</td><td><B>Student First Name</td><td><B>Student Last Name</td></b>`;
    for (i in result) {
      response_form += `<tr><td> ${result[i].Student_id}</td>`
      response_form += `<td> ${result[i].Student_fname}</td>`;
      response_form += `<td> ${result[i].Student_lname}</td></tr>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Return"> </form>`;
    response.send(response_form);
  });
}

app.post("/active_status", function (request, response) {
let POST = request.body;
console.log(request.body)
ActiveStatus_DB(POST, response);
});

//Tuition Payment Report
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function Tuition_DB(POST, response) {
       // Grab the parameters from the submitted form
  
  query = "SELECT SUM(Tuition) AS Total_Revenue FROM Student";
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    //var res_string = JSON.stringify(result);
    //var res_json = JSON.parse(res_string);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="analysis.html" method="GET" >`;
    response_form += `<link rel="stylesheet" href="table_generation.css">`
    response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
    response_form += `<td><B>Total Revenue</td></b>`;
    for (i in result) {
      response_form += `<tr><td> ${result[i].Total_Revenue}</td></tr>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Another Query?"> </form>`;
    response.send(response_form);
  });
}

app.post("/tuition_payment", function (request, response) {
let POST = request.body;
Tuition_DB(POST, response);
});

//Student_House_Analysis
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function House_DB(POST, response) {
  // Grab the parameters from the submitted form

query = "SELECT Student_city, COUNT(Student_city) AS Number_Of_Students FROM Student GROUP BY Student_city";
con.query(query, function (err, result, fields) {   // Run the query
if (err) throw err;
console.log(result);

//var res_string = JSON.stringify(result);
//var res_json = JSON.parse(res_string);
let labels = [];
let data = [];

for(let i = 0; i < result.length; i++) {
  labels.push('"' + result[i]["Student_city"] + '"');
  data.push(result[i]["Number_Of_Students"]);
}

response_form = `<form action="analysis.html" method="GET">`;
response_form += `<link rel="stylesheet" href="style2.css">`
response_form += `<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
<body>
<h1>Student Household Location Analysis</h1>
<canvas id="popChart" width="2000" height="1000" style="display: block; height: 385px; width: 770px;"></canvas>
<script type="text/javascript">
var popCanvas = document.getElementById("popChart");
var barChart = new Chart(popCanvas, {
  type: 'horizontalBar',
  data: {
    labels: [${labels}],
    datasets: [{
      label: 'Number of Students',
      data: [${data}],
      backgroundColor: 'gray'
    }]
  },
  "options":{"scales":{"xAxes":[{"ticks":{"beginAtZero":true, max: 5, min: 0, stepSize: 1}}]}}
});
</script>
</body>`;


response_form += `<input type="submit" value="Another Query?"> </form>`;
response.send(response_form);

});
}

app.post("/student_house_analysis", function (request, response) {
let POST = request.body;
House_DB(POST, response);
})

//Student_School_Analysis
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function School_DB(POST, response) {
  // Grab the parameters from the submitted form

query = "SELECT School, COUNT(School) AS Number_Of_Students FROM Student GROUP BY School";
con.query(query, function (err, result, fields) {   // Run the query
if (err) throw err;
console.log(result);

//var res_string = JSON.stringify(result);
//var res_json = JSON.parse(res_string);
let labels = [];
let data = [];

for(let i = 0; i < result.length; i++) {
  labels.push('"' + result[i]["School"] + '"');
  data.push(result[i]["Number_Of_Students"]);
}

response_form = `<form action="analysis.html" method="GET">`;
response_form += `<link rel="stylesheet" href="style2.css">`
response_form += `<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
<body>
<h1>Student School Analysis</h1>
<canvas id="popChart" width="2000" height="1000" style="display: block; height: 385px; width: 770px;"></canvas>
<script type="text/javascript">
var popCanvas = document.getElementById("popChart");
var barChart = new Chart(popCanvas, {
  type: 'horizontalBar',
  data: {
    labels: [${labels}],
    datasets: [{
      label: 'Number of Students',
      data: [${data}],
      backgroundColor: 'gray'
    }]
  },
  "options":{"scales":{"xAxes":[{"ticks":{"beginAtZero":true, max: 5, min: 0, stepSize: 1}}]}}
});
</script>
</body>`;


response_form += `<input type="submit" value="Another Query?"> </form>`;
response.send(response_form);

});
}

app.post("/student_school_analysis", function (request, response) {
let POST = request.body;
School_DB(POST, response);
});

//Student_Lesson_Analysis
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function Lesson_DB(POST, response) {
  // Grab the parameters from the submitted form

query = "SELECT CONCAT(L_day, ' ', L_time) AS Time, Student_lesson_id, COUNT(Student_lesson_id) AS Number_Of_Students FROM Student, Lesson_slot WHERE Lesson_id = Student_lesson_id GROUP BY Student_lesson_id";
con.query(query, function (err, result, fields) {   // Run the query
if (err) throw err;
console.log(result);

//var res_string = JSON.stringify(result);
//var res_json = JSON.parse(res_string);
let labels = [];
let data = [];

for(let i = 0; i < result.length; i++) {
  labels.push('"' + result[i]["Time"] + '"');
  data.push(result[i]["Number_Of_Students"]);
}

response_form = `<form action="analysis.html" method="GET">`;
response_form += `<link rel="stylesheet" href="style2.css">`
response_form += `<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
<body>
<h1>Student Lesson Analysis</h1>
<canvas id="popChart" width="2000" height="1000" style="display: block; height: 385px; width: 770px;"></canvas>
<script type="text/javascript">
var popCanvas = document.getElementById("popChart");
var barChart = new Chart(popCanvas, {
  type: 'doughnut',
  data: {
    labels: [${labels}],
    datasets: [{
      label: 'Number of Students',
      data: [${data}],
      backgroundColor: ["red", "blue", "green", "pink", "orange", "cyan", "gray", "purple"]
    }]
  },
});
</script>
</body>`;


response_form += `<br><input type="submit" value="Another Query?"> </form>`;
response.send(response_form);

});
}

app.post("/student_lesson_analysis", function (request, response) {
let POST = request.body;
Lesson_DB(POST, response);
});

//Teacher_Workload
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function Workload_DB(POST, response) {
  // Grab the parameters from the submitted form

query = "SELECT CONCAT(Teacher_fname, ' ', Teacher_lname) AS Teacher_name, Lesson_teacher_id, COUNT(Lesson_teacher_id) AS Number_Of_Lessons FROM Teachers, Lesson_slot WHERE Teacher_id = Lesson_teacher_id GROUP BY Lesson_teacher_id";
con.query(query, function (err, result, fields) {   // Run the query
if (err) throw err;
console.log(result);

//var res_string = JSON.stringify(result);
//var res_json = JSON.parse(res_string);
let labels = [];
let data = [];

for(let i = 0; i < result.length; i++) {
  labels.push('"' + result[i]["Teacher_name"] + '"');
  data.push(result[i]["Number_Of_Lessons"]);
}

response_form = `<form action="analysis.html" method="GET">`;
response_form += `<link rel="stylesheet" href="style2.css">`
response_form += `<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
<body>
<h1>Teacher Workload Analysis</h1>
<canvas id="popChart" width="2000" height="1000" style="display: block; height: 385px; width: 770px;"></canvas>
<script type="text/javascript">
var popCanvas = document.getElementById("popChart");
var barChart = new Chart(popCanvas, {
  type: 'doughnut',
  data: {
    labels: [${labels}],
    datasets: [{
      label: 'Number of Lessons',
      data: [${data}],
      backgroundColor: ["red", "blue", "green"]
    }]
  },
});
</script>
</body>`;


response_form += `<br><input type="submit" value="Another Query?"> </form>`;
response.send(response_form);

});
}

app.post("/teacher_workload_analysis", function (request, response) {
let POST = request.body;
Workload_DB(POST, response);
});

//Timeslot_Availability_Day
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function Timeslot_Day_DB(POST, response) {
  lesson_day = POST['lesson_day'];      // Grab the parameters from the submitted form
    
    query = "SELECT L_day, L_time, CONCAT(Teacher_fname, ' ', Teacher_lname) AS Teacher_name, Teacher_email FROM Lesson_slot, Teachers WHERE Lesson_teacher_id = Teacher_id AND Student_Capacity < 4 AND L_day = '" + lesson_day + "'";
    con.query(query, function (err, result, fields) {   // Run the query
      if (err) throw err;
      console.log(result);
      //var res_string = JSON.stringify(result);
      //var res_json = JSON.parse(res_string);
  
      // Now build the response: table of results and form to do another query
      response_form = `<form action="availability.html" method="GET">`;
      response_form += `<link rel="stylesheet" href="table_generation.css">`
      response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
      response_form += `<td><B>Lesson Day</td><td><B>Lesson Time</td><td><B>Teacher Name</td><td><B>Teacher Email</td></b>`;
      for (i in result) {
        response_form += `<tr><td> ${result[i].L_day}</td>`;
        response_form += `<td> ${result[i].L_time}</td>`;
        response_form += `<td> ${result[i].Teacher_name}</td>`;
        response_form += `<td> ${result[i].Teacher_email}</td></tr>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Another Query?"> </form>`;
      response.send(response_form);
    });
  }
  
  app.post("/timeslot_availability_day", function (request, response) {
  let POST = request.body;
  console.log(request.body)
  Timeslot_Day_DB(POST, response);
  });

//Timeslot_Availability_Day
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function Student_Report_DB(POST, response) {
  studentfname = POST['student_fname'];      // Grab the parameters from the submitted form
  studentlname = POST['student_lname'];
  
    query = query = "SELECT Report_date, Report FROM Progress_report WHERE Progress_student_id IN(SELECT Student_id FROM Student WHERE Student_fname = '" + studentfname + "' AND Student_lname = '" + studentlname + "')";
    con.query(query, function (err, result, fields) {   // Run the query
      if (err) throw err;
      console.log(result);
      //var res_string = JSON.stringify(result);
      //var res_json = JSON.parse(res_string);
  
      // Now build the response: table of results and form to do another query
      response_form = `<form action="student_report.html" method="GET">`;
      response_form += `<link rel="stylesheet" href="style2.css">`
      response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
      response_form += `<td><B>Report Date</td><td><B>Report</td></b>`;
      for (i in result) {
        response_form += `<tr><td> ${result[i].Report_date}</td>`;
        response_form += `<td> ${result[i].Report}</td></tr>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Another Query?"> </form>`;
      response.send(response_form);
    });
  }
  
  app.post("/student_report", function (request, response) {
  let POST = request.body;
  console.log(request.body)
  Student_Report_DB(POST, response);
  });

//END OF CLEMENT'S CODE

//Joey's Code for forms and queries
//--------------------------------------------------------
//Add records
//-----------------------------------------------------------------------
app.post('/addStudent', (request, response) => {

  pool.getConnection((err, connection) => {
    if(err) throw err

    //create variable sql creating mysql query
    var forminfo = request.body;
    var sql = "INSERT INTO student (Student_id, Student_fname, Student_lname, Student_city, Registration_date, Start_date, School, Grade, Student_email, Student_pnum, Active, Gender, Tuition, Deposit_amount, Student_lesson_id) VALUES (null, '" + request.body.fname + "', '" + request.body.lname + "',  '" + request.body.stu_city + "', '" + request.body.s_regDate + "', '" + request.body.s_startDate + "',  '" + request.body.school + "', '" + request.body.grade + "', '" + request.body.s_email + "', '" + request.body.pnumber + "', '1', '" + request.body.gender + "', '" + request.body.tuition + "', '" + request.body.deposit + "', '" + request.body.lessonID + "')";
    
    connection.query(sql, function(err, result)  {
      connection.release() //return the connection to the pool

    })
    //console.log(request.body)
    response.redirect("/action_confirmed.html");
  })
})

//Update Student Name
//-----------------------------------------------------------------------
app.post('/updateStudentFname', (request, response) => {

  pool.getConnection((err, connection) => {
    if(err) throw err
    
    var update_sql = "UPDATE student SET Student_fname = ? WHERE Student_id = ?";
    var update_fname = request.body.first_name;
    var grab_id = request.body.stu_id;

    connection.query(update_sql, [update_fname, grab_id], function(err, result)  { 
      connection.release() //return the connection to the pool

    })
    //console.log(request.body)
    response.redirect("/searchAndUpdate.html");
  })
})

//Update Student Status
//-----------------------------------------------------------------------
app.post('/updateStatus', (request, response) => {

  pool.getConnection((err, connection) => {
    if(err) throw err
    
    var update_sql = "UPDATE student SET Active = ? WHERE Student_id = ?";
    var update_status = request.body.upStatus;
    var grab_id = request.body.stu_id;

    connection.query(update_sql, [update_status, grab_id], function(err, result)  { 
      connection.release() //return the connection to the pool

    })
    //console.log(request.body)
    response.redirect("/action_confirmed_StatusUpdate.html");
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
    response_form += `<link rel="stylesheet" href="table_generation.css">`
    response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
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

//CODE FOR All Available Classes
//-----------------------------------------------------------------------------------------------------------------------
function availableclassAll_Query(POST, response) { 
  allAvailquery = "SELECT L_day, L_time, CONCAT(Teacher_fname, ' ', Teacher_lname) AS Teacher_name, Teacher_email FROM lesson_slot LEFT JOIN teachers ON Lesson_teacher_id = Teacher_id WHERE Student_capacity < 4;";
  connection.query(allAvailquery, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    //var res_string = JSON.stringify(result);
    //var res_json = JSON.parse(res_string);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="availability.html" method="GET">`;
    response_form += `<link rel="stylesheet" href="table_generation.css">`
    response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
    response_form += `<td><B>Lesson Day</td><td><B>Lesson Time</td><td><B>Teacher Name</td><td><B>Teacher Email</td></b>`;
    for (i in result) {
      response_form += `<tr><td> ${result[i].L_day}</td>`;
      response_form += `<td> ${result[i].L_time}</td>`;
      response_form += `<td> ${result[i].Teacher_name}</td>`;
      response_form += `<td> ${result[i].Teacher_email}</td></tr>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Another Query?"> </form>`;
    response.send(response_form);
  });
}

app.post("/allavailable", function (request, response) {
  let POST = request.body;
  availableclassAll_Query(POST, response);
  });

/*NO LONGER BEING USED
//Pull Applications
//------------------------------------------------
function applyquery_DB(POST, response) {
  stufname = POST['stu-fname']; // Grab the parameters from the submitted form
  stulname = POST['stu-lname'];
  
  query = "SELECT * FROM student WHERE Active = '2'";
  connection.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    //var res_string = JSON.stringify(result);
    //var res_json = JSON.parse(res_string);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="newStudentReg.html" method="GET">`;
    response_form += `<link rel="stylesheet" href="table_generation.css">`
    response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
    response_form += `<td><B>Student ID</td><td><B>First Name</td><td><B>Last Name</td><td><B>City</td><td><B>School</td><td><B>Grade</td><td><B>Email</td><td><B>Phone#</td></b>`;
    for (i in result) {
      response_form += `<tr><td> ${result[i].Student_id}</td>`;
      response_form += `<td> ${result[i].Student_fname}</td>`;
      response_form += `<td> ${result[i].Student_lname}</td>`;
      response_form += `<td> ${result[i].Student_city}</td>`;
      response_form += `<td> ${result[i].School}</td>`;
      response_form += `<td> ${result[i].Grade}</td>`;
      response_form += `<td> ${result[i].Student_email}</td>`;
      response_form += `<td> ${result[i].Student_pnum}</td></tr>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Another Query?"> </form>`;
    response.send(response_form);
  });
}

app.post("/apply_query", function (request, response) {
let POST = request.body;
applyquery_DB(POST, response);
});
*/


//Collected Payments Report
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function collectedPay_DB(POST, response) {
    
  query = "SELECT Student_Fname, Student_Lname, Payment_date FROM Student, Payment WHERE Active=1 AND Student_id=Payment_student_id AND payment_date>='2020-02-01' AND payment_date<='2020-04-01'";
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    //var res_string = JSON.stringify(result);
    //var res_json = JSON.parse(res_string);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="admin2.html" method="GET">`;
    response_form += `<link rel="stylesheet" href="table_generation.css">`
    response_form += `<h2>Students with Collected Tuition this Month</h2>`
    response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
    response_form += `<td><B>Fist Name</td><td><B>Last Name</td><td><B>Payment Date</td></b>`;
    for (i in result) {
      response_form += `<tr><td> ${result[i].Student_Fname}</td>`;
      response_form += `<td> ${result[i].Student_Lname}</td>`;
      response_form += `<td> ${result[i].Payment_date}</td></tr>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Return to Homepage"> </form>`;
    response.send(response_form);
  });
}

app.post("/hasPaid", function (request, response) {
let POST = request.body;
console.log(request.body)
collectedPay_DB(POST, response);
});

//Overdue Payments Report
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function overduePay_DB(POST, response) {
    
    query = "SELECT Student_Fname, Student_Lname FROM Student WHERE Active=1 AND NOT EXISTS (SELECT * FROM Payment WHERE Student_id=Payment_student_id AND payment_date>='2020-01-01' AND payment_date<='2020-02-01')";
    con.query(query, function (err, result, fields) {   // Run the query
      if (err) throw err;
      console.log(result);
      //var res_string = JSON.stringify(result);
      //var res_json = JSON.parse(res_string);
  
      // Now build the response: table of results and form to do another query
      response_form = `<form action="admin2.html" method="GET">`;
      response_form += `<link rel="stylesheet" href="table_generation.css">`
      response_form += `<h2>Students with Overdue Payments this Month</h2>`
      response_form += `<table border="3" cellpadding="5" cellspacing="5" id="report_table">`;
      response_form += `<td><B>Fist Name</td><td><B>Last Name</td></b>`;
      for (i in result) {
        response_form += `<tr><td> ${result[i].Student_Fname}</td>`;
        response_form += `<td> ${result[i].Student_Lname}</td></tr>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Return to Homepage"> </form>`;
      response.send(response_form);
    });
  }
  
  app.post("/overduePayment", function (request, response) {
  let POST = request.body;
  console.log(request.body)
 overduePay_DB(POST, response);
  });

app.listen(8080, () => console.log(`listening on port 8080`));