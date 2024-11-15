let slideIndex = 0;
automateSlides();
// Hero automation
function automateSlides() {
    let i;
    let slides = document.getElementsByClassName("slides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(automateSlides, 7000); 
}
// 
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});


window.onscroll = function() {
  var scrollPostion = window.pageYOffset;
  var headerSeparator = document.getElementsByClassName("header-seperator")[0];
  var header = document.getElementsByTagName("header")[0];
  if (scrollPostion === 0) {
    headerSeparator.style.top = "0";
    header.style.top = "30px";  
  } else {
    headerSeparator.style.top = "-10px";
    header.style.top = "0";  
  }

  if(scrollPostion > 100){
    header.style.position ="fixed";
  }



};

