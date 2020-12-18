//  Common header used on all pages
var header = document.getElementById('main-header');
console.log(header);
header.innerHTML = (`
<div class="header">
               <div class="main-wrapper">
            <div class="header-top">
                <div class="logo">
                    <img src="http://www.nobusakurai.com/wp-content/uploads/2013/09/nobu-logo_pink_small.png" alt="Nobu Sakurai Piano Studios Logo" /></a>
                </div>
   </div>
   
   <div align="right">
  <a href="/index.html" class="button2">Home Page</a>
</div>
<br>
   <div align="center" style="background-color:paleturquoise">

      <a href="/admin2.html" class="button1">Schedule</a>

      <div class="dropdown">
        <button class="dropbtn">Add & Search Student</button>
        <div align = "center" class="dropdown-content">
          <a href="#">Register New Student</a>
          <a href="searchStatus.html">Search by Active Status</a>
          <a href="#">Search by Address</a>
          <a href="#">Search by Teacher</a>
        </div>
      </div>
     
    <div class="dropdown">
      <button class="dropbtn">Update Students</button>
      <div align = "center" class="dropdown-content">
         <a href="updateFull.html">Full Record</a>
         <a href="updateGeneral.html">General Information</a>
         <a href="updateStatus.html">Active Status</a>
         <a href="updateContact.html">Contact Information</a>
         <a href="updateLesson.html">Lesson Information</a>
       </div>
    </div>
 
    <div class="dropdown">
      <button class="dropbtn">Finance Reports</button>
      <div align = "center" class="dropdown-content">
        <a href="#">Overview</a>
        <form action="/hasPaid" method="POST">
          <input type="submit" value="Collected Payment" id="admin_nav" >
        </form>
        <form action="/overduePayment" method="POST">
          <input type="submit" value="Overdue Payment" id="admin_nav">
        </form>
        
        <a href="#">Payment Schedule by Trimester</a>
      </div>
    </div>

    <a href="/analysis.html" class="button1">Operations Analysis</a>

   `);

// Common footer used on all pages
var footer = document.getElementById('main-footer');
console.log(footer);
footer.innerHTML = (`
<div class="mainfooter" style="background-color: lightgray";>
    <p>NOBU SAKURAI PIANO STUDIOS | Copyright 2013 © | All Rights Reserved </p>	
    
    <div class="row">
    <div class="column2">
      <td><img src="https://image.flaticon.com/icons/png/512/2874/2874771.png"width="30"> nobu@nobusakurai.com</td>
    </div>
    <div class="column2">
      <td><img src="https://image.flaticon.com/icons/png/512/2939/2939444.png"width="30"> (808)636-0143</td>
    </div>
    <div class="column2">
      <td><img src="https://image.flaticon.com/icons/png/512/2143/2143101.png"width="30">98-1238 Kaahumanu Ave., Pearl City, HI</td>
    </div>
  </div>
       `);
   
