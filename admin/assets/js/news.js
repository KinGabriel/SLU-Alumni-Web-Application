/**
 * JS class for displaying the fetched news information.
 * 
 * Author: [Carino, Mark]
 */
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
                    img.alt = item.title;
                
                    // Create the card body
                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');
                
                    const title = document.createElement('h5');
                    title.classList.add('card-title');
                    title.textContent = item.title;
                
                    const description = document.createElement('p');
                    description.classList.add('card-text');
                    description.textContent = item.description;

                    const maxLength = 200; 
                    const fullDescription = item.description || "";
                    if (fullDescription.length > maxLength) {
                        description.textContent = fullDescription.substring(0, maxLength) + '...';
                    } else {
                        description.textContent = fullDescription;
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
                
                    // Optionally, you can add an event listener for when the edit icon is clicked
                    editIcon.addEventListener('click', function(event) {
                        event.preventDefault();
                        // Add logic here to handle editing the news item
                        console.log(`Editing item: ${item.title}`);
                    });
                
                    // Append the elements to the card body
                    cardBody.appendChild(title);
                    cardBody.appendChild(description);
                    cardBody.appendChild(datetime);
                
                    // Append the Edit Icon to the card body
                    cardBody.appendChild(editIcon);
                
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