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
  <a href="/index.html" class="button2">Student View</a>
</div>
<br>
   <div align="center" style="background-color:paleturquoise">
       <a href="/index.html" class="button1">Class Schedule</a>
       <a href="/index.html" class="button1">Available Classrooms</a>
       <a href="/index.html" class="button1">Student Information</a>
     

  
   <div align="center" style="background-color:paleturquoise">
   <a href="/index.html" class="button1">New Student Registration</a>
 
 <div class="dropdown">
 <button class="dropbtn">Finances</button>
 <div align = "left" class="dropdown-content">
   <a href="#">Outstanding Payments</a>
   <a href="#">Overview</a>
   <a href="#">Payment Schedule by Trimester</a>
 </div>
</div>

   `);

// Common footer used on all pages
var footer = document.getElementById('main-footer');
console.log(footer);
footer.innerHTML = (`
<div class="mainfooter" style="background-color: lightgray";>
  <div class="vc_span9">
    <p>NOBU SAKURAI PIANO STUDIOS Copyright 2013. All Rights Reserved.</p>	
    <table>
    <tbody>
    <tr>
        <td><img src="https://image.flaticon.com/icons/png/512/2874/2874771.png"width="75"> nobu@nobusakurai.com</td>
        
    </tr>
    <tr>
    <td><img src="https://image.flaticon.com/icons/png/512/2939/2939444.png"width="75"> (808)636-0143</td>
  </tr>
  <tr>
  <td><img src="https://image.flaticon.com/icons/png/512/2143/2143101.png"width="85">98-1238 Kaahumanu Ave., Ste. 201 Pearl City, HI</td>
    </tr>
    </tbody>
</table>
</div>
       `);
   
