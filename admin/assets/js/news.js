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

// delete news
async function deleteNews(news_id, title) {
    console.log("Deleting news:", news_id);
    try {
        const response = await fetch(`../controller/ProcessDeleteNews.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ news_id }),
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
        console.error("Error deleting news:", error);
        showFeedbackModal("An error occurred while deleting the news.");
    }
}
function showConfirmationDeleteModal(item) {
    const confirmMessage = document.getElementById('confirmMessage');
    confirmMessage.textContent = `Are you sure you want to delete this news?: ${decodeHtmlEntities(item.title)}?`;
    const confirmModal = document.getElementById('confirmModal');
    confirmModal.style.display = 'flex';
    const modalImage = document.getElementById('modalImage');
    modalImage.src = "../assets/images/delete.png";
    document.getElementById('confirmYes').onclick = function() {
        deleteNews(item.news_id, item.title);
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

// Function to decode HTML entities like &quot; back to "
function decodeHtmlEntities(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
}