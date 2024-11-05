<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SLU Alumina</title>
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>

<div class="header-seperator"></div>
<header>
    <h1>
        <img src="assets/images/logo.png" alt="SLU Alumina Logo">
        <span>SLU Alumina</span>
    </h1>
    <nav>
        <a href="#home">Home</a>
        <a href="#whoarewe">About Us</a>
        <a href="#alumnistories">Alumni Stories</a>
        <a href="#news_events_job">Others</a>
    </nav>
    <a href="view/Login.php" target="_blank" class="btn-login">Log In</a>
</header>

<div id="home" class="hero">
    <div class="slides fade">
        <img src="assets/images/mainslu.png" alt="Main SLU">  
        <div class="text-overlay ">  
            <h1>WELCOME TO</h1> 
            <p>SLU ALUMINA</p>
            <button class="btn-hero">CONTINUE</button>
        </div>
    </div>
    <div class="slides fade">
        <img src="assets/images/maryheights.jpg" alt="Maryheights Campus">  
        <div class="text-overlay ">  
            <h1>SLU ALUMINA</h1> 
            <p>GALLERY</p>
            <button class="btn-hero">VIEW GALLERY</button>
        </div>
    </div>
    <div class="slides fade">
        <img src="assets/images/slugym.jpg" alt ="SLU gym">
        <div class="text-overlay ">  
            <h1>SLU ALUMINA</h1> 
            <p>STORIES</p>
            <button class="btn-hero">READ STORY</button>
        </div>
    </div>
</div>

<!-- Who Are We section -->
<div id="whoarewe" class="whoarewe hidden">
    <div class="content">
        <h1>WHO ARE WE</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
    </div>
    <div class="card-container">
        <div class="card">
            <img src="assets/images/SLU_thumbnail.png" alt="SLU Image"> 
        </div>
        <div class="card">
            <img src="assets/images/navi.jpg" alt="Navi"> 
        </div>
        <div class="card">
            <img src="assets/images/bakakeng.jpg" alt="Bakakeng"> 
        </div>
    </div>
</div>

<!-- Alumni Stories Section -->
<div id="alumnistories" class="alumni-stories hidden">
    <div class="alumni-content">
        <img src="assets/images/alumni.jpg" alt="Alumni Image" class="alumni-image">
        <div class="alumni-messages">
            <h2>Alumni Stories</h2>
            <h4>Hannah Jordan</h4>
            <p>Read the inspiring stories of our alumni, their journey, and achievements.</p>
            <button class="btn-read-story">Read Story</button>
        </div>
    </div>
</div>

<!-- Latest News, Events & Job Opportunities section -->
<div id="news_events_job" class="news_events_job hidden">
    <!-- Scrollable News Column -->
    <div class="scrollable" id="news">
        <h2>News</h2>
        <p>Latest news: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>In other news: Proin bibendum nunc quis risus fermentum, nec sagittis lacus dignissim.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Curabitur lacinia sem id elit vestibulum, eget vehicula nunc pharetra.</p>
        <p>Fusce vehicula augue a ligula malesuada suscipit.</p>
        <p>Suspendisse vitae metus at turpis tincidunt luctus.</p>
        <p>Donec ultricies justo in est blandit tincidunt.</p>
        <p>Nam nec urna nec diam scelerisque volutpat.</p>
        <p>Aliquam erat volutpat. Quisque quis nisl vel ex accumsan egestas.</p>
        <p>Phasellus sit amet felis nec urna vehicula vehicula.</p>
    </div>

    <!-- Scrollable Events Column -->
    <div class="scrollable" id="events">
        <h2>Events</h2>
        <p>Upcoming event: Vivamus ullamcorper est vitae felis laoreet, vel cursus urna interdum.</p>
        <p>Event 2: Mauris in tortor a lectus congue tincidunt sit amet eget odio.</p>
        <p>Event 3: Quisque nec augue a metus volutpat ullamcorper sed eget leo.</p>
        <p>Event 4: Duis finibus tortor vel velit ultrices, sed laoreet nulla fermentum.</p>
        <p>Event 5: Pellentesque eget ante eget erat blandit porttitor quis quis eros.</p>
        <p>Event 6: Nulla facilisi. Nam laoreet malesuada metus at consectetur.</p>
        <p>Event 7: Proin congue tortor vitae ligula fermentum, id convallis justo placerat.</p>
        <p>Event 8: Suspendisse ut sapien vitae nisi hendrerit tincidunt.</p>
        <p>Event 9: Integer eu sapien a turpis vestibulum varius.</p>
        <p>Event 10: Fusce dictum urna id est pharetra feugiat.</p>
    </div>

    <!-- Scrollable Job Opportunities Column -->
    <div class="scrollable" id="jobs">
        <h2>Job Opportunities</h2>
        <p>Job 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Job 2: Vivamus pulvinar lectus a mi faucibus, et scelerisque felis sodales.</p>
        <p>Job 3: Integer varius sapien ac metus dictum ullamcorper.</p>
        <p>Job 4: Duis ac sem sit amet mi tincidunt placerat sed vel dui.</p>
        <p>Job 5: Sed nec lorem non mauris euismod congue.</p>
        <p>Job 6: Praesent in erat dapibus, auctor elit id, fermentum felis.</p>
        <p>Job 7: Fusce non mi ut magna vehicula lobortis.</p>
        <p>Job 8: Mauris pharetra felis sit amet ex scelerisque, sit amet vehicula lacus cursus.</p>
        <p>Job 9: Curabitur egestas sapien non diam vehicula, id facilisis sapien pretium.</p>
        <p>Job 10: Nunc consequat dui sed orci aliquam, eget efficitur leo luctus.</p>
    </div>
</div>
<!-- footer section start -->
<footer id="footer">
    <div class="container footer-container">
        <div class="footer-column">
            <img src="assets/images/Logo.png" alt="Alumni Image" class="alumni-image">
            <div class="footer-about">
            </div>
        </div>
        <div class="footer-column">
            <div class="useful-link">
                <h2>Useful Links</h2>
                <img src="./assets/images/about/home_line.png" alt="" class="img-fluid">
                <div class="use-links">
                    <li><a href="index.html"><i class="fa-solid fa-angles-right"></i> Home</a></li>
                    <li><a href="about.html"><i class="fa-solid fa-angles-right"></i> About Us</a></li>
                    <li><a href="gallery.html"><i class="fa-solid fa-angles-right"></i> Gallery</a></li>
                    <li><a href="contact.html"><i class="fa-solid fa-angles-right"></i> Contact</a></li>
                </div>
            </div>
        </div>
        <div class="footer-column">
            <div class="social-links">
                <h2>Follow Us</h2>
                <img src="./assets/images/about/home_line.png" alt="">
                <div class="social-icons">
                    <li><a href="#"><i class="fa-brands fa-facebook-f"></i> Facebook</a></li>
                    <li><a href="#"><i class="fa-brands fa-instagram"></i> Instagram</a></li>
                    <li><a href="#"><i class="fa-brands fa-linkedin-in"></i> Twitter</a></li>
                </div>
            </div>
        </div>
        <div class="footer-column">
            <div class="address">
                <h2>Account</h2>
                <img src="./assets/images/about/home_line.png" alt="" class="img-fluid">
                <div class="address-links">
                    <li class="address1"><i class="fa-solid fa-location-dot"></i> Profile</li>
                    <li><a href=""><i class="fa-solid fa-phone"></i> Stories</a></li>
                    <li><a href=""><i class="fa-solid fa-envelope"></i> Gallery</a></li>
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- footer section end -->

<!-- footer copy right section start -->
<section id="copy-right">
    <div class="copy-right-sec">
        <i class="fa-solid fa-copyright"></i> Copyright 2024 Saint Louis Alumina All rights reserved.
    </div>
</section>
<!-- footer copy right section end -->
<script src="assets/js/LandingPageAnimations.js"></script>
</body>
</html>
