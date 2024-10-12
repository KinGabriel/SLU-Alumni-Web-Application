<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>

<div class="header-seperator"></div>
<header>
    <h1>
        <img src="assets/images/logo.png" alt="Logo">
        <span>SLU Alumina</span>
    </h1>
    <nav>
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Alumni Stories</a>
        <a href="#">Career Opportunities</a>
    </nav>
    <button class="btn-login">Log In</button>
</header>

<div class="hero">
    <div class="slides fade">
        <img src="assets/images/SLUmain.png">  
        <div class="text-overlay ">  
            <h1>SLU ALUMINA</h1> 
            <p>STORIES</p>
            <button class="btn-hero">READ STORY</button>
        </div>
    </div>
    <div class="slides fade">
        <img src="assets/images/slu.jpg">  
        <div class="text-overlay ">  
            <h1>SLU ALUMINA</h1> 
            <p>STORIES</p>
            <button class="btn-hero">READ STORY</button>
        </div>
    </div>
    <div class="slides fade">
        <img src="assets/images/slu.png">
        <div class="text-overlay ">  
            <h1>SLU ALUMINA</h1> 
            <p>STORIES</p>
            <button class="btn-hero">READ STORY</button>
        </div>
    </div>
</div>

<script>
let slideIndex = 0;
automateSlides();

function automateSlides() {
    let i;
    let slides = document.getElementsByClassName("slides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 7000); 
}
</script>
</body>
</html>
