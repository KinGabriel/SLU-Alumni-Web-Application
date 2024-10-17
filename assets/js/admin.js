function toggleFilter(header) {
    const content = header.nextElementSibling; // Get the next sibling (collapsible content)
    content.classList.toggle("active"); // Toggle the active class for the collapsible content
    const isActive = content.classList.contains("active");
    content.style.display = isActive ? "flex" : "none"; // Show or hide the content based on active class
}

function toggleFilter(header) {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
}

