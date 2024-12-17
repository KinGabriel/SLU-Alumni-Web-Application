let currentPage = 1;
const itemsPerPage = 6;
let currentFilter = 'all'; 

// fetch events based 
const fetchEvents = async (page = 1) => {
    try {
        const response = await fetch(`/api/events/get-events?page=${page}&limit=${itemsPerPage}&filter=${currentFilter}`);
        const data = await response.json();

        if (data.status === 'success') {
            populateEvents(data.events);
            renderPagination(Math.ceil(data.totalCount / itemsPerPage));
        } else {
            console.error('Failed to fetch events:', data.message);
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};
// Populate the events section 
const populateEvents = (events) => {
    const eventsContainer = document.querySelector('.row.row-cols-1.row-cols-md-3.g-4');
    eventsContainer.innerHTML = ''; // Clear existing content

    events.forEach(event => {
        // Create the card container
        const eventCard = document.createElement('div');
        eventCard.classList.add('col');

        // Create the card itself
        const card = document.createElement('div');
        card.classList.add('card', 'h-100');

        // image element 
        if (event.image_data) {
            const img = document.createElement('img');
            img.src = event.image_data;
            img.classList.add('card-img-top');
            img.alt = event.event_title;
            card.appendChild(img);
        }

        //  card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'align-items-center');
        
        // event date container
        const eventDateContainer = document.createElement('div');
        eventDateContainer.classList.add('event-date-container', 'me-3');
        
        const eventDate = document.createElement('div');
        eventDate.classList.add('event-date');
        
        const month = document.createElement('span');
        month.classList.add('month');
        month.textContent = new Date(event.start_date).toLocaleString('default', { month: 'short' }).toUpperCase();
        eventDate.appendChild(month);
        
        const day = document.createElement('span');
        day.classList.add('day');
        day.textContent = new Date(event.start_date).getDate();
        eventDate.appendChild(day);
        
        eventDateContainer.appendChild(eventDate);
        cardBody.appendChild(eventDateContainer);

        // event info container
        const eventInfo = document.createElement('div');
        eventInfo.classList.add('event-info');
        
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = event.event_title;
        eventInfo.appendChild(title);
        
        const description = document.createElement('p');
        description.classList.add('card-text');
        
       
        const truncatedDescription = event.event_description.length > 200
            ? event.event_description.substring(0, 200) + '...'
            : event.event_description;
        
        description.textContent = truncatedDescription;
        eventInfo.appendChild(description);
        
        const dateText = document.createElement('p');
        dateText.classList.add('card-text');
        const small = document.createElement('small');
        small.classList.add('text-muted');
        small.textContent = new Date(
            new Date(`${event.start_date}`).getFullYear(),
            new Date(`${event.start_date}`).getMonth(),
            new Date(`${event.start_date}`).getDate(),
            ...event.start_time.split(':')
        ).toLocaleString();
        dateText.appendChild(small);
        eventInfo.appendChild(dateText);
        
        cardBody.appendChild(eventInfo);
        card.appendChild(cardBody);

        // card footer with Read More button
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');
        
        const readMoreButton = document.createElement('a');
        readMoreButton.classList.add('btn', 'btn-primary', 'btn-interested');
        readMoreButton.textContent = 'Read More';
        readMoreButton.href = `events/details?events_id=${event.event_id}`;
        cardFooter.appendChild(readMoreButton);
        
        card.appendChild(cardFooter);
        
        // Append the card to the eventCard container
        eventCard.appendChild(card);
        
        // Append the event card to the events container
        eventsContainer.appendChild(eventCard);
    });
};


// Render pagination dynamically
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

        if (currentPage === 1) {
            prevPageItem.classList.add('disabled');
        } else {
            prevPageLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    fetchEvents(currentPage);
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
                fetchEvents(currentPage);
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

        if (currentPage === totalPages) {
            nextPageItem.classList.add('disabled');
        } else {
            nextPageLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    fetchEvents(currentPage);
                }
            });
        }

        nextPageItem.appendChild(nextPageLink);
        paginationList.appendChild(nextPageItem);

        paginationContainer.appendChild(paginationList);
    }
}


const filterEvents = (filter) => {
    currentFilter = filter; // Set the current filter
    fetchEvents(currentPage); // Fetch events based on the selected filter
    updateButtonStates(); // Update button states (active/inactive)
};

const updateButtonStates = () => {
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        if (button.innerText.toLowerCase() === currentFilter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
};


fetchEvents(currentPage);
