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
  <a href="/login.html" class="button2">Teacher Login</a>
</div>
<br>
   <div align="center" style="background-color:paleturquoise">
       <a href="/index.html" class="button1">Home</a>
       <div class="dropdown">
       <button class="dropbtn">About Us</button>
       <div align = "left" class="dropdown-content">
         <a href="/services.html">Services</a>
         <a href="/philosophy.html">Learning Philosophy</a>
         <a href="/testimonies.html">Student Testimonies</a>
       </div>
     </div>
     
     <div class="dropdown">
     <button class="dropbtn">Student Information</button>
     <div class="dropdown-content">
       <a href="#">Link 1</a>
       <a href="#">Link 2</a>
       <a href="#">Link 3</a>
     </div>
   </div>
   <div class="dropdown">
   <button class="dropbtn">Teacher Information</button>
   <div class="dropdown-content">
     <a href="#">Link 1</a>
     <a href="#">Link 2</a>
     <a href="#">Link 3</a>
   </div>

   `);
