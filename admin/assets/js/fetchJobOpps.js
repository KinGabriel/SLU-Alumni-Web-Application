document.addEventListener("DOMContentLoaded", function() {
    // Fetch the job opportunities from the PHP script
    fetch('../controller/fetchJobOpps.php')
        .then(response => {
            // Check if the response is successful (status 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Try to parse JSON
        })
        .then(data => {
            // Check if the response contains a success status
            if (data.status === 'success' && Array.isArray(data.opportunity)) {
                const opportunities = data.opportunity; // Get the job opportunities data from the response
                const jobListContainer = document.querySelector('#job-list'); // Select the container to insert jobs

                if (!jobListContainer) {
                    console.error("Job list container element not found!");
                    return;
                }

                opportunities.forEach(item => {
                    // Create a div for each job item
                    const jobItem = document.createElement('div');
                    jobItem.classList.add('col');
                    jobItem.setAttribute('data-type', item.employment_type.toLowerCase()); // Add the employment type as data attribute

                    // Create the card content
                    const jobCard = document.createElement('div');
                    jobCard.classList.add('card', 'shadow-sm');

                    // Create the card body
                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    // Job title
                    const title = document.createElement('h5');
                    title.classList.add('card-title');
                    title.textContent = item.job_title;

                    // Employment type badge
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

                    // Company info
                    const companyInfo = document.createElement('div');
                    companyInfo.classList.add('d-flex', 'align-items-center');

                    const companyLogo = document.createElement('img');
                    companyLogo.src = item.image_data ? `data:image/jpeg;base64,${item.image_data}` : '../assets/images/default-event-image.png'; // Default logo if none exists
                    companyLogo.alt = item.company_name;
                    companyLogo.classList.add('me-2');
                    companyLogo.style.width = '40px';
                    companyLogo.style.height = '40px';

                    const companyDetails = document.createElement('p');
                    companyDetails.classList.add('mb-0');
                    companyDetails.innerHTML = `${item.company_name}<br><small>@ ${item.address}</small>`;

                    // Append company logo and details
                    companyInfo.appendChild(companyLogo);
                    companyInfo.appendChild(companyDetails);

                    // Append elements to the card body
                    cardBody.appendChild(title);
                    cardBody.appendChild(employmentTypeBadge);
                    cardBody.appendChild(companyInfo);

                    // Append the card body to the card
                    jobCard.appendChild(cardBody);

                    // Append the job card to the job item
                    jobItem.appendChild(jobCard);

                    // Append the job item to the job list container
                    jobListContainer.appendChild(jobItem);
                });
            } else {
                console.error('Error fetching job opportunities data or invalid response format');
            }
        })
        .catch(error => {
            console.error('Error fetching job opportunities data:', error);
        });
});