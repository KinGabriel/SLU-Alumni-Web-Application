const renderCards = (cardsContainer, cards) => {
  cardsContainer.innerHTML = "";

  cards.forEach((card) => {
    const { title, description, cover, date, tags } = card;

    const cardElement = document.createElement("div");
    cardElement.classList.add("col");

    cardElement.innerHTML = `
      <div class="card border-0 bg-transparent">
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
        <!-- Edit Icon -->
        <button class="edit-icon position-absolute top-0 end-0 p-2 bg-transparent border-0" aria-label="Edit">
          <i class="fas fa-edit text-dark"></i>
        </button>
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

const filterCardsByCategory = (cards, category) =>
  cards.filter((card) => card.tags.includes(category));

const handleSearch = (event) => {
  const searchTerm = event.target.value.toLowerCase().trim();
  const selectedCategory = document
    .querySelector(".categories .active")
    .textContent.toLowerCase()
    .trim();

  let filteredCards =
    selectedCategory !== "all" ? filterCardsByCategory(data.cards, selectedCategory) : data.cards;

  filteredCards = searchCards(filteredCards, searchTerm);

  renderCards(cardsContainer, filteredCards);
};

const handleCategoryClick = (event) => {
  event.preventDefault();
  const category = event.target.textContent.toLowerCase();

  const categoryLinks = document.querySelectorAll(".categories a");
  categoryLinks.forEach((link) => link.classList.remove("active"));

  event.target.classList.add("active");

  if (category === "all") {
    renderCards(cardsContainer, data.cards);
  } else {
    const filteredCards = filterCardsByCategory(data.cards, category);
    renderCards(cardsContainer, filteredCards);
  }
};

const data = {
  cards: [
    {
      title: "Card Title 1",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      tags: ["category 1", "category 2"],
      cover: [
        "https://via.placeholder.com/550x225/7D7D7D/969696?text=Card+1"
      ],
      date: "October 18, 2024"
    },
    {
      title: "Card Title 2",
      description: "Quisquam ab quibusdam eligendi magni dolorem sunt.",
      tags: ["category 3"],
      cover: [
        "https://via.placeholder.com/550x225/C7B15B/D5C481?text=Card+2"
      ],
      date: "October 19, 2024"
    },
    {
      title: "Card Title 3",
      description: "Iste veritatis explicabo nostrum impedit reprehenderit.",
      tags: ["category 1", "category 3"],
      cover: [
        "https://via.placeholder.com/550x225/4A90E2/8D98A1?text=Card+3"
      ],
      date: "October 20, 2024"
    },
    {
      title: "Card Title 4",
      description: "Explicabo velit architecto ipsum officiis at.",
      tags: ["category 2", "category 3"],
      cover: [
        "https://via.placeholder.com/550x225/EFB6B6/F2A9A9?text=Card+4"
      ],
      date: "October 21, 2024"
    },
    {
      title: "Card Title 5",
      description: "Velit officiis ad architecto iusto rem alias.",
      tags: ["category 1"],
      cover: [
        "https://via.placeholder.com/550x225/FCAC0A/F6A705?text=Card+5"
      ],
      date: "October 22, 2024"
    },
    {
      title: "Card Title 6",
      description: "Est eligendi mollitia recusandae quas.",
      tags: ["category 2", "category 1"],
      cover: [
        "https://via.placeholder.com/550x225/8D6E63/F1D0A2?text=Card+6"
      ],
      date: "October 23, 2024"
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