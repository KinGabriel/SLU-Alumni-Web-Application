function initializeJobBoard() {
    const jobCardsContainer = document.querySelector('.row.justify-content-center.g-4');
    const searchButton = document.querySelector('.btn.btn-primary.ms-2');
    const searchBar = document.querySelector('.search-bar');
    const filterJobType = document.querySelector('#dropdownJobType');
    const filterDatePosted = document.querySelector('#dropdownDatePosted');
    

    async function fetchJobs(page = 1, searchQuery = '', jobType = 'all', datePosted = 'all') {
      try {
        const response = await fetch(`/api/jobs/getJobs?page=${page}&search=${searchQuery}&jobType=${jobType}&datePosted=${datePosted}`);
        const data = await response.json();
    
        if (data.status === 'success') {
          renderJobs(data.opportunity);
        } else {
          console.error('Error fetching job data:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    function renderJobs(jobs) {
        jobCardsContainer.innerHTML = ''; 
    
        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('col-md-4');
            const employmentType = job.employment_type ? job.employment_type.toLowerCase() : 'unknown';  
            jobCard.innerHTML = `
              <div class="job-card position-relative">
                <h3 class="job-title mb-3">${job.job_title}</h3>
                <div class="d-flex justify-content-between mb-3">
                  <span class="job-type ${employmentType}">${employmentType.toUpperCase()}</span>
                </div>
                <div class="d-flex align-items-center">
                  <img src="${job.image_data ? `data:image/jpeg;base64,${job.image_data}` : '../assets/images/company.jpg'}" alt="Company Logo" class="company-logo me-3">
                  <div>
                    <p class="m-0 fw-bold">${job.company_name}</p>
                    <p class="m-0 text-muted">${job.address}</p>
                  </div>
                </div>
              </div>
            `;
            jobCardsContainer.appendChild(jobCard);
        });
    }

    fetchJobs();

    searchButton.addEventListener('click', () => {
      const searchQuery = searchBar.value.trim();
      fetchJobs(1, searchQuery);
    });
  

    filterJobType.addEventListener('click', (e) => {
      const selectedType = e.target.innerText.toLowerCase();
      fetchJobs(1, '', selectedType);
    });
  
    
    filterDatePosted.addEventListener('click', (e) => {
      const selectedDate = e.target.innerText.toLowerCase();
      fetchJobs(1, '', '', selectedDate);
    });
  }
  
  document.addEventListener('DOMContentLoaded', initializeJobBoard);
  