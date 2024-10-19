const sidenav = document.querySelector('.sidebar-container'); 

// Add hover event to sidenav
sidenav.addEventListener('mouseenter', () => {
  mainContent.style.left = '5px'; // Move content to the right
});

sidenav.addEventListener('mouseleave', () => {
  mainContent.style.left = '100px'; // Move content back to original position
});

