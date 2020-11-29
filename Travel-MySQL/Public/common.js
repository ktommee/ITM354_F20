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
   Teachers and Administrators:
  <a href="/login.html" class="button2">Login</a>
  <a href="/register.html" class="button2">Register</a>
</div>
<br>
   <div align="center" style="background-color:paleturquoise">
       <a href="/index.html" class="button1">Home</a>
       <a href="/aboutus.html" class="button1">About Us</a>
       <a href="/schedule.html" class="button1">Student Information</a>
       <a href="/blog.html" class="button1">Teacher Information</a>
   </div>

   `);
