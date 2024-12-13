/**
 * JS class for fetching the job opportunity information.
 * 
 * Author: [Carino, Mark]
 */
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1; // Start on the first page
    const itemsPerPage = 6; // Number of jobs per page
    let totalJobs = 0; // Track total number of jobs
    const jobListContainer = document.querySelector('#job-list'); // Get the job list container
    const filterButtons = document.querySelectorAll('.filter-bubble'); // Get all filter buttons

    // Current filter
    let currentFilter = 'all'; // Default filter is 'all'

    // Function to fetch job opportunities based on current filter and page
    function fetchJobs(page, filter) {
        fetch(`../controller/fetchJobOpps.php?page=${page}&filter=${filter}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Try to parse JSON
            })
            .then(data => {
                if (data.status === 'success' && Array.isArray(data.opportunity)) {
                    const opportunities = data.opportunity;

                    // Clear the previous job listings before adding new ones
                    jobListContainer.innerHTML = '';

                    // Populate the job list
                    opportunities.forEach(item => {
                        const jobItem = document.createElement('div');
                        jobItem.classList.add('col');
                        jobItem.setAttribute('data-type', item.employment_type.toLowerCase());

                        const jobCard = document.createElement('div');
                        jobCard.classList.add('card', 'shadow-sm');

                        const cardBody = document.createElement('div');
                        cardBody.classList.add('card-body');

                        const title = document.createElement('h5');
                        title.classList.add('card-title');
                        title.textContent = item.job_title;

                        const employmentTypeBadge = document.createElement('span');
                        employmentTypeBadge.classList.add('badge');
                        if (item.employment_type === 'full-time') {
                            employmentTypeBadge.classList.add('bg-success');
                        } else if (item.employment_type === 'part-time') {
                            employmentTypeBadge.classList.add('bg-warning');
                        } else if (item.employment_type === 'internship') {
                            employmentTypeBadge.classList.add('bg-info');
                        }
                        employmentTypeBadge.textContent = item.employment_type.toUpperCase();

                        const companyInfo = document.createElement('div');
                        companyInfo.classList.add('d-flex', 'align-items-center');

                        const companyLogo = document.createElement('img');
                        companyLogo.src = item.image_data
                            ? `data:image/jpeg;base64,${item.image_data}`
                            : '../assets/images/default-event-image.png';
                        companyLogo.alt = item.company_name;
                        companyLogo.classList.add('me-2');
                        companyLogo.style.width = '40px';
                        companyLogo.style.height = '40px';

                        const companyDetails = document.createElement('p');
                        companyDetails.classList.add('mb-0');
                        companyDetails.innerHTML = `${item.company_name}<br><small>@ ${item.address}</small>`;

                        companyInfo.appendChild(companyLogo);
                        companyInfo.appendChild(companyDetails);

                        cardBody.appendChild(title);
                        cardBody.appendChild(employmentTypeBadge);
                        cardBody.appendChild(companyInfo);

                        jobCard.appendChild(cardBody);
                        jobItem.appendChild(jobCard);

                        jobListContainer.appendChild(jobItem);
                    });

                    // Update total jobs count and page navigation
                    totalJobs = opportunities.length; // Number of jobs returned for the current page
                    updatePaginationControls();
                } else {
                    console.error('Error fetching job opportunities data or invalid response format');
                }
            })
            .catch(error => {
                console.error('Error fetching job opportunities data:', error);
            });
    }

    // Function to update the pagination controls
    function updatePaginationControls() {
        const prevButton = document.querySelector('#prevPage');
        const nextButton = document.querySelector('#nextPage');

        // Disable/Enable Previous button based on current page
        prevButton.disabled = currentPage === 1;

        // Disable/Enable Next button based on the total number of jobs
        nextButton.disabled = totalJobs < itemsPerPage; // Disable Next if there are fewer jobs than items per page

        // Event listeners for pagination buttons
        prevButton.removeEventListener('click', handlePrevClick);
        prevButton.addEventListener('click', handlePrevClick);

        nextButton.removeEventListener('click', handleNextClick);
        nextButton.addEventListener('click', handleNextClick);
    }

    // Handle the Previous button click
    function handlePrevClick() {
        if (currentPage > 1) {
            currentPage--;
            fetchJobs(currentPage, currentFilter); // Fetch jobs for the new page
        }
    }

    // Handle the Next button click
    function handleNextClick() {
        currentPage++;
        fetchJobs(currentPage, currentFilter); // Fetch jobs for the new page
    }

    // Set the default filter to 'all' and make sure it's visually selected
    document.querySelector('.filter-bubble[data-filter="all"]').classList.add('active');

    // Fetch the jobs for the first page with the 'all' filter when the page loads
    fetchJobs(currentPage, currentFilter);

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            this.classList.add('active');

            // Get the selected filter type, map it to exact values expected by the database
            let selectedFilter = this.getAttribute('data-filter');
            let filterMap = {
                'full-time': 'full-time',
                'part-time': 'part-time',
                'internship': 'internship',
                'all': 'all'
            };

            // Set the current filter to the mapped value
            currentFilter = filterMap[selectedFilter] || 'all'; // Default to 'all' if no match

            // Reset the current page to 1 and fetch jobs with the selected filter
            currentPage = 1;
            fetchJobs(currentPage, currentFilter);
        });
    });
});