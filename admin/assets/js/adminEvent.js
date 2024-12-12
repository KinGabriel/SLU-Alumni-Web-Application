// Author: Vergara, Carlos Miguel
// Code from Codepen
// Edited with ChatGPT

const renderCards = (cardsContainer, cards, page = 1, cardsPerPage = 6) => {
    cardsContainer.innerHTML = ""; // Clear the container before rendering
  
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToRender = cards.slice(startIndex, endIndex);
  
    cardsToRender.forEach((card) => {
      const { title, description, cover, date, tags } = card;
  
      const cardElement = document.createElement("div");
      cardElement.classList.add("col");
  
      cardElement.innerHTML = `
        <div class="card border-0 bg-transparent position-relative">
          <!-- Edit Icon -->
          <a href="#" class="edit-icon position-absolute top-0 end-0 p-2 text-dark">
            <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="${cover.length > 1 ? "has-multiple" : ""}">
            ${cover
              .map(
                (image) =>
                  `<img src="${image}" class="shadow-sm rounded cover-image w-100" alt="${title}">`
              )
              .join("")}
          </a>
          <div class="bubble date rounded small">${date}</div>
          <i class="fas fa-images ${
            cover.length > 1 ? "has-multiple-icon" : "d-none"
          }"></i>
          <div class="card-body">
            <h2 class="h4"><a href="#" class="text-dark">${title}</a></h2>
            <p class="text-muted">${description}</p>
            <p class="m-0">
              ${tags
                .map(
                  (tag) =>
                    `<a href="#" class="small me-1 text-dark border p-1 rounded">${tag}</a>`
                )
                .join(" ")}
            </p>
          </div>
        </div>
      `;
  
      cardsContainer.appendChild(cardElement);
    });
  
    const carouselItems = document.querySelectorAll(".has-multiple");
    carouselItems.forEach(initializeCarousel);
  };
  
  const initializeCarousel = (carouselItem) => {
    const images = carouselItem.querySelectorAll("img");
    let currentIndex = 0;
  
    const prevButton = document.createElement("button");
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel(carouselItem, images, currentIndex);
    });
  
    const nextButton = document.createElement("button");
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.classList.add("bubble", "end-0");
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel(carouselItem, images, currentIndex);
    });
  
    carouselItem.appendChild(prevButton);
    carouselItem.appendChild(nextButton);
  
    const updateCarousel = (carouselItem, images, currentIndex) => {
      images.forEach((image, index) => {
        image.style.transform = `translateX(${index - currentIndex}00%)`;
      });
    };
  };
  
  const searchCards = (cards, searchTerm) => {
    return cards.filter((card) => {
      return (
        card.title.toLowerCase().includes(searchTerm) ||
        card.description.toLowerCase().includes(searchTerm) ||
        card.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
  };
  
  const filterCardsByCategory = (cards, category) => {
    return cards.filter((card) => card.tags.some(tag => tag.toLowerCase() === category.toLowerCase()));
  };
  
  const handleSearch = (event, page = 1) => {
    const searchTerm = event.target.value.toLowerCase().trim();
    const selectedCategory = document
      .querySelector(".categories .active")
      .textContent.toLowerCase()
      .trim();
  
    // Start with the unfiltered cards
    let filteredCards =
      selectedCategory !== "all"
        ? filterCardsByCategory(data.cards, selectedCategory)
        : data.cards;
  
    // Apply the search filter to the selected category
    filteredCards = searchCards(filteredCards, searchTerm);
  
    renderCards(cardsContainer, filteredCards, page);
    updatePagination(filteredCards, page);
  };
  
  const handleCategoryClick = (event, page = 1) => {
    event.preventDefault();
  
    const category = event.target.textContent.toLowerCase();
  
    // Remove 'active' class from all category links
    const categoryLinks = document.querySelectorAll(".categories a");
    categoryLinks.forEach((link) => link.classList.remove("active"));
  
    // Add 'active' class to the clicked category link
    event.target.classList.add("active");
  
    // Filter based on selected category
    let filteredCards = category === "all" 
      ? data.cards 
      : filterCardsByCategory(data.cards, category);
  
    // Render filtered cards
    renderCards(cardsContainer, filteredCards, page);
    updatePagination(filteredCards, page);
  };
  
  const updatePagination = (cards, page = 1, cardsPerPage = 6) => {
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    const paginationContainer = document.querySelector(".pagination ul");
  
    paginationContainer.innerHTML = ""; // Clear previous pagination
  
    // Add "Previous" button
    const prevPage = page > 1 ? page - 1 : 1;
    paginationContainer.innerHTML += `<li class="page-item ${page === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${prevPage}">&laquo;</a>
    </li>`;
  
    // Add page number buttons
    for (let i = 1; i <= totalPages; i++) {
      paginationContainer.innerHTML += `<li class="page-item ${i === page ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>`;
    }
  
    // Add "Next" button
    const nextPage = page < totalPages ? page + 1 : totalPages;
    paginationContainer.innerHTML += `<li class="page-item ${page === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${nextPage}">Next &raquo;</a>
    </li>`;
  
    // Add event listeners to pagination links
    const paginationLinks = document.querySelectorAll(".pagination .page-link");
    paginationLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedPage = parseInt(link.getAttribute("data-page"));
        const selectedCategory = document.querySelector(".categories .active").textContent.toLowerCase().trim();
        let filteredCards = selectedCategory !== "all"
          ? filterCardsByCategory(data.cards, selectedCategory)
          : data.cards;
        renderCards(cardsContainer, filteredCards, selectedPage);
        updatePagination(filteredCards, selectedPage);
      });
    });
  };
  
  const data = {
    cards: [
      {
        title: "Event Title 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        tags: ["Ended"],
        cover: [
          "https://via.placeholder.com/550x225/7D7D7D/969696?text=Placeholder"
        ],
        date: "November 1, 2024" // Ended
      },
      {
        title: "Event Title 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        tags: ["Upcoming"],
        cover: [
          "https://via.placeholder.com/550x225/C7B15B/D5C481?text=Placeholder"
        ],
        date: "December 25, 2024" // Upcoming
      },
      {
        title: "Event Title 3",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        tags: ["Upcoming"],
        cover: [
          "https://via.placeholder.com/550x225/7D7D7D/969696?text=Placeholder"
        ],
        date: "January 10, 2025" // Upcoming
      },
      {
        title: "Event Title 4",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        tags: ["Upcoming"],
        cover: [
          "https://via.placeholder.com/550x225/7D7D7D/969696?text=Placeholder"
        ],
        date: "February 5, 2025" // Upcoming
      },
      {
        title: "Event Title 5",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        tags: ["Ended"],
        cover: [
          "https://via.placeholder.com/550x225/7D7D7D/969696?text=Placeholder"
        ],
        date: "October 20, 2024" // Ended
      },
      {
        title: "Event Title 6",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        tags: ["Upcoming"],
        cover: [
          "https://via.placeholder.com/550x225/7D7D7D/969696?text=Placeholder"
        ],
        date: "December 31, 2024" // Upcoming
      },
      {
        title: "Event Title 7",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        tags: ["Upcoming"],
        cover: [
          "https://via.placeholder.com/550x225/4C9E1F/7BC26A?text=Placeholder"
        ],
        date: "January 15, 2025" // Upcoming
      },
      {
        title: "Event Title 8",
        description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        tags: ["Ended"],
        cover: [
          "https://via.placeholder.com/550x225/3B6A47/7B8D4A?text=Placeholder"
        ],
        date: "November 15, 2024" // Ended
      },
      {
        title: "Event Title 9",
        description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        tags: ["Upcoming"],
        cover: [
          "https://via.placeholder.com/550x225/7A9A68/5C7F4F?text=Placeholder"
        ],
        date: "March 1, 2025" // Upcoming
      }
    ]
  };
  
  
  const cardsContainer = document.getElementById("cards-container");
  const searchInput = document.querySelector('input[type="search"]');
  const categoryLinks = document.querySelectorAll(".categories a");
  
  renderCards(cardsContainer, data.cards, 1); // Render cards on initial load
  updatePagination(data.cards, 1); // Set initial pagination
  
  searchInput.addEventListener("input", (event) => handleSearch(event, 1));
  categoryLinks.forEach((link) =>
    link.addEventListener("click", (event) => handleCategoryClick(event, 1))
  );