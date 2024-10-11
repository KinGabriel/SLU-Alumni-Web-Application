<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="assets/css/output.css" rel="stylesheet">
</head>
<body>
<div class="bg-[#003DA5] pb-[2vw] w-full -mt-[1vh] mb-[0.5vh]"></div>
<header class="flex items-center bg-white p-4 shadow-md">
    <h1 class="flex items-center">
        <img src="assets/images/logo.png" alt="Logo" class="h-14 w-20">
        <span class="font-bold ml-2">SLU Alumina</span>
    </h1>
    <nav>
        <a href="#" class="p-2 hover:text-blue-500">Home</a>
        <a href="#" class="p-2 hover:text-blue-500">About Us</a>
        <a href="#" class="p-2 hover:text-blue-500">Alumni Stories</a>
        <a href="#" class="p-2 hover:text-blue-500">Career Opportunities</a>
    </nav>
    <button class="btn-login bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded">Log In</button>
</header>

<div class="hero">
        <div class="slides fade">
            <img src="assets/images/SLUmain.png">  
            <div class="text-overlay ">  
            <h1 class=" font-bold -mb-[2vw]">SLU ALUMINA</h1> 
        <p>STORIES</p>
        <button class="bg-yellow-600 hover:bg-yellow-300 text-white mt-14 py-1 px-4 rounded">READ STORY</button>
            </div>
        </div>
        <div class="slides fade">
            <img src="assets/images/slu.jpg">  
            <div class="text-overlay ">  
            <h1 class=" font-bold -mb-6">SLU ALUMINA</h1> 
        <p>STORIES</p>
        <button class="bg-yellow-600 hover:bg-yellow-300 text-white mt-14 py-1 px-4 rounded">READ STORY</button>
            </div>
        </div>
        <div class="slides fade">
            <img src="assets/images/slu.png">
            <div class="text-overlay ">  
            <h1 class=" font-bold -mb-6">SLU ALUMINA</h1> 
        <p>STORIES</p>
        <button class="bg-yellow-600 hover:bg-yellow-300 text-white mt-14 py-1 px-4 rounded">READ STORY</button>
            </div>
        </div>
<script>
let slideIndex = 0;
showSlides();
function showSlides() {
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
