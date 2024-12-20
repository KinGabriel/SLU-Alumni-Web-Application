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
                return response.json();
            })
            .then(data => {
                if (data.status === 'success' && Array.isArray(data.opportunity)) {
                    const opportunities = data.opportunity;
    
                    // Clear the previous job listings
                    jobListContainer.innerHTML = '';
    
                    // Populate the job list
                    opportunities.forEach(item => {
                        const jobItem = document.createElement('div');
                        jobItem.classList.add('col');
                        jobItem.setAttribute('data-type', item.employment_type.toLowerCase());
    
                        const jobCard = document.createElement('div');
                        jobCard.classList.add('card', 'shadow-sm', 'position-relative');
    
                       // Create the Edit Icon 
                        const editIcon = document.createElement('a');
                        editIcon.href = '#';
                        editIcon.classList.add('edit-icon');
                        editIcon.innerHTML = '<i class="fas fa-edit"></i>'; 

                        // Add an event listener for editing logic
                        editIcon.addEventListener('click', function (event) {
                            event.preventDefault();
                            console.log(`Editing job: ${item.job_id}`); 
                        });

                        // Create the Delete Icon 
                        const deleteIcon = document.createElement('a');
                        deleteIcon.href = '#';
                        deleteIcon.classList.add('delete-icon');
                        deleteIcon.innerHTML = '<i class="fas fa-trash"></i>'; 

                        // Add an event listener for delete logic
                        deleteIcon.addEventListener('click', function (event) {
                            event.preventDefault();
                            showConfirmationDeleteModal(item);
                        });
                        
                        jobCard.appendChild(editIcon);
                        jobCard.appendChild(deleteIcon);
    
                        const cardBody = document.createElement('div');
                        cardBody.classList.add('card-body');
    
                        const title = document.createElement('h5');
                        title.classList.add('card-title');
                        title.textContent = item.job_title;
                        title.textContent = decodeHtmlEntities(item.job_title);
    
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
                        companyDetails.innerHTML = `${decodeHtmlEntities(item.company_name)}<br><small>@ ${decodeHtmlEntities(item.address)}</small>`; // Apply decodeHtmlEntities here                        
    
                        companyInfo.appendChild(companyLogo);
                        companyInfo.appendChild(companyDetails);
    
                        cardBody.appendChild(title);
                        cardBody.appendChild(employmentTypeBadge);
                        cardBody.appendChild(companyInfo);
    
                        jobCard.appendChild(cardBody);
                        jobItem.appendChild(jobCard);
    
                        jobListContainer.appendChild(jobItem);
                    });
    
                    // Update pagination
                    totalJobs = opportunities.length;
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


// delete jobOps
async function deleteJobOpp(opportunity_id, title) {
    try {
        const response = await fetch(`../controller/processDeleteJobOps.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ opportunity_id }),
        });
        const data = await response.json();
        if (data.success) {
            showFeedbackModal(`${title} deleted successfully.`);
    
            setTimeout(() => {
                location.reload(); // Reload after modal is displayed
            }, 1000);
        } else {
            const errorMessage = data.error;
            showFeedbackModal(errorMessage);
        }
    } catch (error) {
        console.error("Error deleting job opportunity:", error);
        showFeedbackModal("An error occurred while deleting the job opportunity.");
    }
}

function showConfirmationDeleteModal(item) {
    const confirmMessage = document.getElementById('confirmMessage');
    confirmMessage.textContent = `Are you sure you want to delete this job posted?: ${item.job_title}?`;

    const confirmModal = document.getElementById('confirmModal');
    confirmModal.style.display = 'flex';
    const modalImage = document.getElementById('modalImage');
    modalImage.src = "../assets/images/delete.png";

    document.getElementById('confirmYes').onclick = function() {
        deleteJobOpp(item.opportunity_id, item.job_title);
        closeConfirmationModal();
    };

    document.getElementById('confirmNo').onclick = closeConfirmationModal;
}

function closeConfirmationModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

function showFeedbackModal(message) {
    const feedbackMessage = document.getElementById('feedbackMessage');
    feedbackMessage.textContent = message;

    const feedbackModal = document.getElementById('feedbackModal');
    feedbackModal.style.display = 'flex';
}

function closeFeedbackModal() {
    document.getElementById('feedbackModal').style.display = 'none';
}

function decodeHtmlEntities(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    const decodedString = doc.documentElement.textContent;
    return decodedString.replace(/\\/g, ''); // Remove all backslashes
}