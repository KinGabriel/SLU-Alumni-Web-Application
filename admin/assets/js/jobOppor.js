document.addEventListener('DOMContentLoaded', function () {
    const jobCards = document.querySelectorAll('.col');
    const jobsPerPage = 4; // Number of jobs per page
    let currentPage = 1;
    let filteredJobs = Array.from(jobCards);

    // Function to show jobs for the current page
    function showPage(page) {
        const start = (page - 1) * jobsPerPage;
        const end = start + jobsPerPage;

        filteredJobs.forEach(card => card.style.display = 'none'); // Hide all jobs

        // Show only jobs for the current page
        for (let i = start; i < end && i < filteredJobs.length; i++) {
            filteredJobs[i].style.display = 'block';
        }

        updatePagination();
    }

    // Function to update pagination controls
    function updatePagination() {
        const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
        const paginationList = document.querySelector('.pagination-links');

        paginationList.innerHTML = ''; // Clear existing links
        document.getElementById('prevPage').disabled = currentPage === 1; // Disable previous button if on the first page
        document.getElementById('nextPage').disabled = currentPage === totalPages; // Disable next button if on the last page

        // Update the pagination list
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
            });
            pageItem.appendChild(pageLink);
            paginationList.appendChild(pageItem);
        }

        // Highlight the active page
        const pageItems = document.querySelectorAll('.pagination .page-item');
        pageItems.forEach(item => item.classList.remove('active'));
        pageItems[currentPage - 1]?.classList.add('active');
    }

    // Event listener for pagination (Next & Previous)
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-bubble');

    // Add event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove the 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add 'active' class to the clicked button
            button.classList.add('active');
            
            const filterType = button.getAttribute('data-filter');
            
            // Loop through all job cards and filter them
            filteredJobs = Array.from(jobCards).filter(card => {
                const jobType = card.getAttribute('data-type');
                if (filterType === 'all' || filterType === jobType) {
                    card.style.display = 'block'; // Show the card
                    return true;
                } else {
                    card.style.display = 'none'; // Hide the card
                    return false;
                }
            });

            // Reset to page 1 after applying filter
            currentPage = 1;
            showPage(currentPage);
        });
    });

    // Initialize pagination
    showPage(currentPage);
});