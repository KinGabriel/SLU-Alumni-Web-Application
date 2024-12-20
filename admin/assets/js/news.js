document.addEventListener("DOMContentLoaded", function() {
    // Fetch the news data from the PHP script
    fetch('../controller/fetchNews.php')
        .then(response => response.json())
        .then(data => {
            // Check if the response contains a success status
            if (data.status === 'success' && Array.isArray(data.news)) {
                const news = data.news; // Get the news data from the response
                const newsContainer = document.querySelector('.news-container .row'); // Select the container to insert news items

                if (!newsContainer) {
                    console.error("News container element not found!");
                    return;
                }

                news.forEach(item => {
                    // Decode HTML entities in title and description
                    const title = decodeHtmlEntities(item.title);
                    const description = decodeHtmlEntities(item.description);

                    // Create a div for each news item
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('col', 'mb-4'); // Bootstrap grid classes
                
                    // Create the content for the news item
                    const newsContent = document.createElement('div');
                    newsContent.classList.add('card', 'h-100');
                
                    // Create the image for the news item (if any)
                    const img = document.createElement('img');
                    img.classList.add('card-img-top');
                    img.src = item.photo ? `data:image/jpeg;base64,${item.photo}` : '../assets/images/default-event-image.png'; // Use default image if no photo
                    img.alt = title;  // Use the decoded title for the alt text
                
                    // Create the card body
                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');
                
                    const titleElement = document.createElement('h5');
                    titleElement.classList.add('card-title');
                    titleElement.textContent = title;
                
                    const descriptionElement = document.createElement('p');
                    descriptionElement.classList.add('card-text');
                    descriptionElement.textContent = description;


                    const maxLength = 500; 
                    const fullDescription = description || "";
                    if (fullDescription.length > maxLength) {
                        descriptionElement.textContent = fullDescription.substring(0, maxLength) + '...';
                    } else {
                        descriptionElement.textContent = fullDescription;
                    }
                
                    const datetime = document.createElement('small');
                    datetime.classList.add('text-muted');
                    const date = new Date(item.datetime);
                    datetime.textContent = !isNaN(date) ? date.toLocaleString() : "Invalid date";
                
                    // Create the Edit Icon link
                    const editIcon = document.createElement('a');
                    editIcon.href = '#';
                    editIcon.classList.add('edit-icon');
                    editIcon.innerHTML = '<i class="fas fa-edit"></i>'; // Font Awesome edit icon
                    // edit icon
                    editIcon.addEventListener('click', function(event) {
                        event.preventDefault();
                        console.log(`Editing item: ${item.news_id}`);
                    });

                    const deleteIcon = document.createElement('a');
                    deleteIcon.href = '#';
                    deleteIcon.classList.add('delete-icon');
                    deleteIcon.innerHTML = '<i class="fas fa-trash"></i>'; 
                    // delete icon
                    deleteIcon.addEventListener('click', function(event) {
                        event.preventDefault();
                        showConfirmationDeleteModal(item); 
                    });
                    // Append the elements to the card body
                    cardBody.appendChild(titleElement);
                    cardBody.appendChild(descriptionElement);
                    cardBody.appendChild(datetime);
                
                    // Append the Edit and Delete Icon to the card body
                    cardBody.appendChild(editIcon);
                    cardBody.appendChild(deleteIcon);
                    // Append the card image and body to the card
                    newsContent.appendChild(img);
                    newsContent.appendChild(cardBody);
                
                    // Append the news item to the container
                    newsItem.appendChild(newsContent);
                    newsContainer.appendChild(newsItem);
                });                
            } else {
                console.error('Error fetching news data or invalid response format');
            }
        })
        .catch(error => {
            console.error('Error fetching news data:', error);
        });
});

// Function to decode HTML entities like &quot; back to "
function decodeHtmlEntities(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
}