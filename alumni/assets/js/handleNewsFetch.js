async function getNews(page = 1) {
    try {
        const response = await fetch(`/api/news/get-news?page=${page}&limit=6`);
        const data = await response.json();
        
        console.log('API response:', data); 
        if (!data || data.status !== 'success' || !Array.isArray(data.news)) {
            console.error('Unexpected API response format:', data);
            return;
        }

        const newsContainer = document.querySelector('.news-container .row');
        console.log('News container:', newsContainer); 
        if (!newsContainer) {
            console.error('News container not found in DOM');
            return;
        }

        newsContainer.innerHTML = ''; 

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
            cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between');

            const newsInfoDiv = document.createElement('div');
            newsInfoDiv.classList.add('news-info');

            const newsTitle = document.createElement('h5');
            newsTitle.classList.add('card-title');
            newsTitle.textContent = newsItem.title;

            const cardFooterDiv = document.createElement('div');
            cardFooterDiv.classList.add('card-footer', 'd-flex', 'flex-column', 'justify-content-between');

            const newsDescription = document.createElement('p');
            newsDescription.classList.add('card-text');
            newsDescription.textContent = newsItem.description;

            const readMoreBtn = document.createElement('button');
            readMoreBtn.classList.add('btn', 'btn-primary', 'btn-read-more');
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.onclick = () => window.location.href = `news/details?news_id=${newsItem.news_id}`;

            newsInfoDiv.appendChild(newsTitle);
            cardBodyDiv.appendChild(newsInfoDiv);

            cardFooterDiv.appendChild(newsDescription);
            cardFooterDiv.appendChild(readMoreBtn);

            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);
            cardDiv.appendChild(cardFooterDiv);
            colDiv.appendChild(cardDiv);

            newsContainer.appendChild(colDiv);
        });

        // Pagination controls
        const paginationContainer = document.querySelector('.pagination ul');
        paginationContainer.innerHTML = ''; 

        // Add Previous button
        const prevPageItem = document.createElement('li');
        prevPageItem.classList.add('page-item');
        const prevPageLink = document.createElement('a');
        prevPageLink.classList.add('page-link');
        prevPageLink.textContent = 'Previous';

        if (data.pagination.currentPage === 1) {
            prevPageItem.classList.add('disabled');
        } else {
            prevPageLink.addEventListener('click', (event) => {
                event.preventDefault();
                getNews(data.pagination.currentPage - 1);
            });
        }
        prevPageItem.appendChild(prevPageLink);
        paginationContainer.appendChild(prevPageItem);

        // Page number buttons
        for (let i = 1; i <= data.pagination.totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.textContent = i;

            if (i === data.pagination.currentPage) {
                pageItem.classList.add('active');
            }

            pageLink.addEventListener('click', (event) => {
                event.preventDefault();
                getNews(i);
            });

            pageItem.appendChild(pageLink);
            paginationContainer.appendChild(pageItem);
        }

        // Add Next button
        const nextPageItem = document.createElement('li');
        nextPageItem.classList.add('page-item');
        const nextPageLink = document.createElement('a');
        nextPageLink.classList.add('page-link');
        nextPageLink.textContent = 'Next';

        if (data.pagination.currentPage === data.pagination.totalPages) {
            nextPageItem.classList.add('disabled');
        } else {
            nextPageLink.addEventListener('click', (event) => {
                event.preventDefault();
                getNews(data.pagination.currentPage + 1);
            });
        }
        nextPageItem.appendChild(nextPageLink);
        paginationContainer.appendChild(nextPageItem);

    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => getNews(1));
