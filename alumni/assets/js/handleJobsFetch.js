function initializeJobBoard() {
  const jobCardsContainer = document.querySelector('.row.justify-content-center.g-4');
  const searchButton = document.querySelector('.btn.btn-primary.ms-2');
  const searchBar = document.querySelector('.search-bar');
  const filterJobType = document.querySelector('#dropdownJobType .dropdown-menu');
  const filterDatePosted = document.querySelector('#dropdownDatePosted .dropdown-menu');

  let currentPage = 1;
  let currentJobType = 'all';
  let currentDatePosted = 'all';
  
  async function fetchJobs(page = 1, searchQuery = '', jobType = 'all', datePosted = 'all') {
    console.log('Fetching jobs with parameters:', { page, searchQuery, jobType, datePosted });

    try {
        const response = await fetch(
            `/api/jobs/getJobs?page=${page}&search=${encodeURIComponent(searchQuery)}&jobType=${encodeURIComponent(jobType)}&datePosted=${encodeURIComponent(datePosted)}`
        );
        const data = await response.json();
        
        if (data.status === 'success') {
            renderJobs(data.opportunity);
            renderPagination(data.totalPages);  // Add this line to call pagination based on the total pages
        } else {
            jobCardsContainer.innerHTML = `<p class="text-danger">No jobs found.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        jobCardsContainer.innerHTML = `<p class="text-danger">An error occurred while fetching jobs. Please try again later.</p>`;
    }
}
  // Render job cards
 function renderJobs(jobs) {
    jobCardsContainer.innerHTML = ''; 

    if (jobs.length === 0) {
        const noJobsMessage = document.createElement('p');
        noJobsMessage.classList.add('text-muted');
        noJobsMessage.textContent = 'No jobs available for the selected filters.';
        jobCardsContainer.appendChild(noJobsMessage);
        return;
    }

    jobs.forEach(job => {
        // redirect to further details
        const jobLink = document.createElement('a');
        jobLink.href = `jobs/details?jobs_id=${job.opportunity_id}`;  
      jobLink.classList.add('col-md-4');  

        // Create the job card structure
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card', 'position-relative');

        const jobTitle = document.createElement('h3');
        jobTitle.classList.add('job-title', 'mb-3');
        jobTitle.textContent = job.job_title;

        const jobTypeContainer = document.createElement('div');
        jobTypeContainer.classList.add('d-flex', 'justify-content-between', 'mb-3');
        const jobType = document.createElement('span');
        jobType.classList.add('job-type', job.employment_type ? job.employment_type.toLowerCase() : 'unknown');
        jobType.textContent = job.employment_type ? job.employment_type.toUpperCase() : 'UNKNOWN';
        jobTypeContainer.appendChild(jobType);

        const companyContainer = document.createElement('div');
        companyContainer.classList.add('d-flex', 'align-items-center');

        const companyLogo = document.createElement('img');
        companyLogo.src = job.image_data;
        companyLogo.alt = 'Company Logo';
        companyLogo.classList.add('company-logo', 'me-3');

        const companyInfo = document.createElement('div');
        const companyName = document.createElement('p');
        companyName.classList.add('m-0', 'fw-bold');
        companyName.textContent = job.company_name;

        const companyAddress = document.createElement('p');
        companyAddress.classList.add('m-0', 'text-muted');
        companyAddress.textContent = job.address;

        companyInfo.appendChild(companyName);
        companyInfo.appendChild(companyAddress);

        // Append all the created elements to the job card
        jobCard.appendChild(jobTitle);
        jobCard.appendChild(jobTypeContainer);
        jobCard.appendChild(companyContainer);
        companyContainer.appendChild(companyLogo);
        companyContainer.appendChild(companyInfo);

        // Append the job card link to the container
        jobLink.appendChild(jobCard);
        jobCardsContainer.appendChild(jobLink);
    });
}


  fetchJobs();
  function renderPagination(totalPages) {
    const paginationContainer = document.querySelector('.pagination');  

    paginationContainer.innerHTML = '';  

    if (totalPages > 1) {
        const paginationList = document.createElement('ul');
        paginationList.classList.add('pagination');

        // Add Previous button
        const prevPageItem = document.createElement('li');
        prevPageItem.classList.add('page-item');
        const prevPageLink = document.createElement('a');
        prevPageLink.classList.add('page-link');
        prevPageLink.textContent = 'Previous';

        // Disable the "Previous" button on the first page
        if (currentPage === 1) {
            prevPageItem.classList.add('disabled');
        } else {
            prevPageLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    fetchJobs(currentPage, searchBar.value.trim(), currentJobType, currentDatePosted);
                }
            });
        }

        prevPageItem.appendChild(prevPageLink);
        paginationList.appendChild(prevPageItem);

        // Render page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.textContent = i;

            if (i === currentPage) {
                pageItem.classList.add('active');
            }

            pageLink.addEventListener('click', (event) => {
                event.preventDefault();
                currentPage = i;
                fetchJobs(currentPage, searchBar.value.trim(), currentJobType, currentDatePosted);
            });

            pageItem.appendChild(pageLink);
            paginationList.appendChild(pageItem);
        }

        // Add Next button
        const nextPageItem = document.createElement('li');
        nextPageItem.classList.add('page-item');
        const nextPageLink = document.createElement('a');
        nextPageLink.classList.add('page-link');
        nextPageLink.textContent = 'Next';

        // Disable the Next button on the last page
        if (currentPage === totalPages) {
            nextPageItem.classList.add('disabled');
        } else {
            nextPageLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    fetchJobs(currentPage, searchBar.value.trim(), currentJobType, currentDatePosted);
                }
            });
        }

        nextPageItem.appendChild(nextPageLink);
        paginationList.appendChild(nextPageItem);

        paginationContainer.appendChild(paginationList);
    }
}


  searchButton.addEventListener('click', () => {
      const searchQuery = searchBar.value.trim();
      console.log('Search button clicked. Search query:', searchQuery); 
      currentPage = 1;
      fetchJobs(currentPage, searchQuery, currentJobType, currentDatePosted);
  });

  function handleFilterClick(filterElement, filterType) {
      console.log(`Setting up filter for: ${filterType}`); 

      filterElement.addEventListener('click', (e) => {
          const selectedItem = e.target.closest('.dropdown-item');
          if (selectedItem) {
              const value = selectedItem.getAttribute('data-value') || 'all';
              console.log(`${filterType} filter clicked. Selected value:`, value);

              if (filterType === 'jobType') {
                  currentJobType = value;
              } else if (filterType === 'datePosted') {
                  currentDatePosted = value;
              }

              currentPage = 1; 
              fetchJobs(currentPage, searchBar.value.trim(), currentJobType, currentDatePosted); 
          }
      });
  }

  handleFilterClick(filterJobType, 'jobType');
  handleFilterClick(filterDatePosted, 'datePosted');
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Document loaded, initializing job board.');
  initializeJobBoard();
});
