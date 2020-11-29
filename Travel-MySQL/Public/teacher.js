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
       <a href="/index.html" class="button1">Recital Registration </a>
     
     <div class="dropdown">
     <button class="dropbtn">Dropdown</button>
     <div align = "left" class="dropdown-content">
       <a href="#">Link 1</a>
       <a href="#">Link 2</a>
       <a href="#">Link 3</a>
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
</div>
       `);
   
