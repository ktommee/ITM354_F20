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
// Process login form POST and redirect to invoice page if ok, back to login page if not
app.post("/login.html", function (request, response) {
  let POST = request.body; // grab body of request and save it in POST
  qstring = querystring.stringify(POST); // stringify or convert POST (login info) to a string
  loginqstring = qstring;

  if (typeof POST['submit'] == undefined) {
    // check if the submit button was pressed.
    response.redirect("login.html");
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

// Source: Lab 14 Exercise 4 
app.post("/register.html", function (request, response) {
  // process a register form, redirect to invoice page if ok, back to register page if not 
  let POST = request.body; // take body of request and save it in local variable, POST
  var username = POST.username; // store what was typed in the username textbox in the variable username
  var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
  var password = POST.password; // store what was typed in the password textbox in the variable password
  var repeatPassword = POST.repeatPassword; // store what was typed in the repeat password textbox in the variable repeatPassword
  var email = POST.email; // store what was typed in the email textbox in the variable email
  var fullname = POST.fullname; // store what was typed in the fullname textbox in the variable fullname
  var usernameqstring = "&user=" + username; // creates query string for username
  var d = Date(); // Records time of registration
  a = d.toString();

  is_valid = true; // initializing variable is_valid
  // check if username is valid
  errs_array = usernameValidation(usernameLowerCase, true);
  if (errs_array.length != 0) // there are errors in the username
    is_valid = false; // username is not valid 

  // check if password is valid 
  errs_array = passwordValidation(password, true);
  if (errs_array.length != 0) // there are errors in the password
    is_valid = false; // password is not valid 

  // check if email is valid 
  errs_array = emailValidation(email, true);
  if (errs_array.length != 0) // there are errors in the email
    is_valid = false; // email is not valid 

  // check if fullname is valid
  errs_array = fullnameValidation(fullname, true);
  if (errs_array.length != 0) // there are errors in the full name
    is_valid = false; // full name is not valid 

  // Now check if there were any errors
  if (!is_valid) {
    // there are errors
    qstring = querystring.stringify(POST); // stringify or convert POST (registration info) to a string
    registerqstring = qstring;
    response.redirect("register.html?" + registerqstring); // there are errors, send back to the register page with the register info stored in query string
    return;
  }

  if (repeatPassword != password) {
    // repeat password does match password
    qstring = querystring.stringify(POST); // stringify or convert POST (registration info) to a string
    registerqstring = qstring;
    response.redirect("register.html?" + registerqstring); // send back to register page with register info stored in query string
    return;
  }

  if (typeof users_reg_data[usernameLowerCase] == 'undefined') // username doesn't exist in user registration data
  {
    users_reg_data[usernameLowerCase] = {};  // create empty object 
    users_reg_data[usernameLowerCase].username = usernameLowerCase; // store the usernameLowerCase value into users_reg_data file under username
    users_reg_data[usernameLowerCase].password = POST.password; // store the passoword value into users_reg_data file under password
    users_reg_data[usernameLowerCase].full_name = POST.fullname; // store the full name value into users_reg_data file under full name
    users_reg_data[usernameLowerCase].email = POST.email; // store the email value into users_reg_data file under email
    users_reg_data[usernameLowerCase].registrationDate = a;
    response.cookie('userID', usernameLowerCase) // Add a cookie


    var output_data = JSON.stringify(users_reg_data); // stringify users_reg_data
    fs.writeFileSync(filename, output_data, "utf-8");

    response.redirect("/registrationredirect.html"); // registration information is valid; send to invoice with quantity and username info stored in query string
    return;
  }
  else {
    response.redirect("redirect.html"); // username already taken; send user to redirect.html page 
  }
});

// Source: Lab 13 info_server_Ex4.js
// Source of functions for validation: https://www.w3resource.com/javascript/form/javascript-sample-registration-form-validation.php

// validates to make sure that username meets requirements 
function usernameValidation(usernameLowerCase, return_errors = false) {
  var letters = /^[0-9a-zA-Z]+$/; // allowable characters 
  errors = []; // assume no errors at first
  // check if length is okay; length must be between 4 and 10 characters
  if (usernameLowerCase.length > 10 || usernameLowerCase.length < 4) {
    // username doesn't doesn't meet requirements 
    errors.push('<font color="black">Username must be between 4 and 10 characters long!</font>');
  }
  // check if there are only letters and numbers; check if matches the variable letters
  if (!usernameLowerCase.match(letters)) {
    // if contain characters that are not defined in letters = error 
    errors.push('<font color="black">Username can only contain alphanumeric characters only!</font>');
  }

  return return_errors ? errors : (errors.length == 0);
}

// validates password; it should be of length 6 characters or greater.
function passwordValidation(password, return_errors = false) {
  if (password.length < 6) {
    errors.push('<font color="black">Password must be at least 6 characters long!</font>')
  }

  return return_errors ? errors : (errors.length == 0);
}

// validate email format
function emailValidation(email, return_errors = false) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(mailformat)) {
    // doesn't match email format 
    errors.push('<font color="black">You have entered an invalid email address!</font>');
  }

  return return_errors ? errors : (errors.length == 0);
}
// validate fullname checks whether user name input field is provided with alphabates characters. If not, it displays an alert 
function fullnameValidation(fullName, return_errors = false) {
  var letters = /^[A-Za-z ]+$/;
  if (!fullName.match(letters)) {
    // full name includes character not defined in the variable letters
    errors.push('<font color="black">Username can only contain letters</font>');
  }

  return return_errors ? errors : (errors.length == 0);
}


// Continuation of Kazman code

console.log("Connecting to localhost...");
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: "root",
  port: 3306,
  database: "Travel",
  password: ""
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

function isNonNegInt(stringToCheck, returnErrors = false) {
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

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

app.post("/process_query", function (request, response) {
  let POST = request.body;
  query_DB(POST, response);
});

app.listen(8080, () => console.log(`listening on port 8080`));