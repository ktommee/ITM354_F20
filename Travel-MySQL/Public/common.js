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
<br>
   <div align="center">
       <a href="/index.html" class="button1">Home</a>
       <div class="dropdown">
       <button class="dropbtn">About Us</button>
       <div align = "left" class="dropdown-content">
       <a href="/philosophy.html">Learning Philosophy</a> 
       <a href="/owner.html">Meet Nobu</a> 
        <a href="/testimonies.html">Student Testimonials</a>
       </div>
     </div>
     <a href="/services3.html" class="button1">Services</a>
     <div class="dropdown">
     <button class="dropbtn">Student Information</button>
     <div align = "left" class="dropdown-content">
       <a href="#">Class Availability</a>
       <a href="#">Student Registration</a>
       <a href="feedback.html">Submit Feedback</a>
     </div>
   </div>
   <div class="dropdown">
   <button class="dropbtn">Teacher Information</button>
   <div align = "left" class="dropdown-content">
   <a href="/teacher_lookup.html">Teacher Lookup</a>
   </div>
   </div>
   <a href="/login.html" class="button3">Teacher/Admin Login</a>
   

   `);

// Common footer used on all pages
var footer = document.getElementById('main-footer');
console.log(footer);
footer.innerHTML = (`
<div class="mainfooter" style="background-color: lightgray";>
    <p>NOBU SAKURAI PIANO STUDIOS | Copyright 2013 © | All Rights Reserved </p>	
    
    <div class="row">
    <div class="column">
      <td><img src="https://image.flaticon.com/icons/png/512/2874/2874771.png"width="30"> nobu@nobusakurai.com</td>
    </div>
    <div class="column">
      <td><img src="https://image.flaticon.com/icons/png/512/2939/2939444.png"width="30"> (808)636-0143</td>
    </div>
    <div class="column">
      <td><img src="https://image.flaticon.com/icons/png/512/2143/2143101.png"width="30">98-1238 Kaahumanu Ave., Pearl City, HI</td>
    </div>
  </div>
</table>
       `);
   
