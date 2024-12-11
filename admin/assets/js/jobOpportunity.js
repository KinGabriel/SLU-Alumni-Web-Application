document.addEventListener('DOMContentLoaded', function () {
    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-bubble');

    // Get all job cards
    const jobCards = document.querySelectorAll('.col');

    // Add event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove the 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add 'active' class to the clicked button
            button.classList.add('active');
            
            const filterType = button.getAttribute('data-filter');
            
            // Loop through all job cards
            jobCards.forEach(card => {
                const jobType = card.getAttribute('data-type');
                
                // Show or hide job card based on the filter type
                if (filterType === 'all' || filterType === jobType) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    });
});