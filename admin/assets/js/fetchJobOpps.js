document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1; // Start on the first page
    const itemsPerPage = 6; // Number of jobs per page
    let totalJobs = 0; // Track total number of jobs
    const jobListContainer = document.querySelector('#job-list'); // Get the job list container

    // Function to fetch job opportunities for the current page
    function fetchJobs(page) {
        fetch(`../controller/fetchJobOpps.php?page=${page}`)
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
                        if (item.employment_type === 'Full Time') {
                            employmentTypeBadge.classList.add('bg-success');
                        } else if (item.employment_type === 'Part Time') {
                            employmentTypeBadge.classList.add('bg-warning');
                        } else {
                            employmentTypeBadge.classList.add('bg-info');
                        }
                        employmentTypeBadge.textContent = item.employment_type.toUpperCase();

                        const companyInfo = document.createElement('div');
                        companyInfo.classList.add('d-flex', 'align-items-center');

                        const companyLogo = document.createElement('img');
                        companyLogo.src = item.image_data ? `data:image/jpeg;base64,${item.image_data}` : '../assets/images/default-event-image.png';
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
                    totalJobs = opportunities.length;  // Number of jobs returned for the current page
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
        prevButton.disabled = (currentPage === 1);

        // Disable/Enable Next button based on the total number of jobs
        nextButton.disabled = (totalJobs < itemsPerPage);  // Disable Next if there are fewer jobs than items per page

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
            fetchJobs(currentPage);  // Fetch jobs for the new page
        }
    }

    // Handle the Next button click
    function handleNextClick() {
        currentPage++;
        fetchJobs(currentPage);  // Fetch jobs for the new page
    }

    // Initial fetch of jobs for the first page
    fetchJobs(currentPage);
});