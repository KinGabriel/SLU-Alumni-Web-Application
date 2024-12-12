async function getNews() {
    try {
        const response = await fetch('/api/news/get-news'); // Check if this URL is correct
        const data = await response.json();
        
        console.log('API response:', data); // Debugging

        if (!data || data.status !== 'success' || !Array.isArray(data.news)) {
            console.error('Unexpected API response format:', data);
            return;
        }

        const newsContainer = document.querySelector('.news-container .row');
        console.log('News container:', newsContainer); // Debugging
        if (!newsContainer) {
            console.error('News container not found in DOM');
            return;
        }

        newsContainer.innerHTML = ''; // Clear existing content

        data.news.forEach(newsItem => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col');
            
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'h-100');
            
            const img = document.createElement('img');
            img.src = newsItem.photo || '../assets/images/default-news.jpg';
            img.classList.add('card-img-top');
            img.alt = newsItem.title;

            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body', 'd-flex', 'align-items-center');

            const newsInfoDiv = document.createElement('div');
            newsInfoDiv.classList.add('news-info');

            const newsTitle = document.createElement('h5');
            newsTitle.classList.add('card-title');
            newsTitle.textContent = newsItem.title;

            const newsDescription = document.createElement('p');
            newsDescription.classList.add('card-text');
            newsDescription.textContent = newsItem.description;

            newsInfoDiv.appendChild(newsTitle);
            newsInfoDiv.appendChild(newsDescription);

            const cardFooterDiv = document.createElement('div');
            cardFooterDiv.classList.add('card-footer');

            const readMoreBtn = document.createElement('button');
            readMoreBtn.classList.add('btn', 'btn-primary', 'btn-read-more');
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.onclick = () => window.location.href = `news/details?news_id=${newsItem.news_id}`;

            cardFooterDiv.appendChild(readMoreBtn);

            cardBodyDiv.appendChild(newsInfoDiv);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);
            cardDiv.appendChild(cardFooterDiv);
            colDiv.appendChild(cardDiv);

            newsContainer.appendChild(colDiv);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Ensure DOM is fully loaded before calling
document.addEventListener('DOMContentLoaded', getNews);
