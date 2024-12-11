// Author: Vergara, Carlos Miguel
// Code from Codepen
// Edited with ChatGPT

const renderCards = (cardsContainer, cards) => {
  cardsContainer.innerHTML = ""; // Clear the container before rendering

  cards.forEach((card) => {
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

const handleSearch = (event) => {
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

  renderCards(cardsContainer, filteredCards);
};

const handleCategoryClick = (event) => {
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
  renderCards(cardsContainer, filteredCards);
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
      date: "October 18, 2024"
    },
    {
      title: "Event Title 2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      tags: ["Upcoming"],
      cover: [
        "https://via.placeholder.com/550x225/C7B15B/D5C481?text=Placeholder",
      ],
      date: "October 16, 2024"
    },
    {
      title: "Event Title 3",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      tags: ["Upcoming"],
      cover: [
        "https://via.placeholder.com/550x225/7D7D7D/969696?text=Placeholder"
      ],
      date: "October 18, 2024"
    },
    {
      title: "Event Title 4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      tags: ["Upcoming"],
      cover: [
        "https://via.placeholder.com/550x225/7D7D7D/969696?text=Placeholder"
      ],
      date: "October 20, 2024"
    },
    {
      title: "Event Title 5",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      tags: ["Ended"],
      cover: [
        "https://via.placeholder.com/550x225/7D7D7D/969696?text=Placeholder"
      ],
      date: "October 21, 2024"
    },
    {
      title: "Event Title 6",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      tags: ["Upcoming"],
      cover: [
        "https://via.placeholder.com/550x225/7D7D7D/969696?text=Placeholder"
      ],
      date: "October 22, 2024"
    }
  ]
};

const cardsContainer = document.getElementById("cards-container");
const searchInput = document.querySelector('input[type="search"]');
const categoryLinks = document.querySelectorAll(".categories a");

renderCards(cardsContainer, data.cards);

searchInput.addEventListener("input", handleSearch);
categoryLinks.forEach((link) =>
  link.addEventListener("click", handleCategoryClick)
);
