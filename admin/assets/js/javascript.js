const data = {
  cards: [
    {
      title: "Event 1",
      description: "Lorem ipsum dolor sit amet.",
      tags: ["Ended"],
      cover: ["https://via.placeholder.com/550x225"],
      date: "2023-10-10"
    },
    {
      title: "Event 2",
      description: "Lorem ipsum dolor sit amet.",
      tags: ["Upcoming"],
      cover: ["https://via.placeholder.com/550x225"],
      date: "2024-01-01"
    },
    {
      title: "Event 3",
      description: "Lorem ipsum dolor sit amet.",
      tags: ["Upcoming"],
      cover: ["https://via.placeholder.com/550x225"],
      date: "2024-02-01"
    },
    {
      title: "Event 4",
      description: "Lorem ipsum dolor sit amet.",
      tags: ["Ended"],
      cover: ["https://via.placeholder.com/550x225"],
      date: "2023-08-15"
    }
  ]
};

// DOM elements
const cardsContainer = document.getElementById("cards-container");
const searchInput = document.querySelector('input[type="search"]');
const categoryLinks = document.querySelectorAll(".categories a");

// Render cards based on provided filtered data
const renderCards = (cards) => {
  cardsContainer.innerHTML = ""; // Clear previous cards
  console.log("Rendering cards:", cards); // Debugging
  cards.forEach(card => {
    const { title, description, cover, date, tags } = card;
    const cardElement = document.createElement("div");
    cardElement.classList.add("col");

    cardElement.innerHTML = `
      <div class="card border-0 bg-transparent">
        <a href="#" class="${cover.length > 1 ? "has-multiple" : ""}">
          ${cover
            .map(image => `<img src="${image}" class="shadow-sm rounded cover-image w-100" alt="${title}">`)
            .join("")}
        </a>
        <div class="bubble date rounded small">${date}</div>
        <div class="card-body">
          <h2 class="h4"><a href="#" class="text-dark">${title}</a></h2>
          <p class="text-muted">${description}</p>
          <p class="m-0">
            ${tags.map(tag => `<a href="#" class="small me-1 text-dark border p-1 rounded">${tag}</a>`).join(" ")}
          </p>
        </div>
      </div>
    `;
    cardsContainer.appendChild(cardElement);
  });
};

// Filter cards based on category (Upcoming, Ended, or All)
const filterCardsByCategory = (category) => {
  console.log(`Filtering by category: ${category}`); // Debugging
  if (category === "All") {
    return data.cards; // Return all cards if 'All' is selected
  }
  return data.cards.filter(card => card.tags.includes(category));
};

// Filter cards based on the search term
const searchCards = (searchTerm) => {
  console.log(`Searching for: ${searchTerm}`); // Debugging
  return data.cards.filter(card => {
    const searchString = (card.title + card.description + card.tags.join(" ")).toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
};

// Handle search input event (filter based on search term)
const handleSearch = () => {
  const searchTerm = searchInput.value.trim();
  const selectedCategory = document.querySelector(".categories .active").textContent;
  console.log("Search term:", searchTerm); // Debugging
  console.log("Selected category:", selectedCategory); // Debugging
  
  let filteredCards = filterCardsByCategory(selectedCategory); // Filter by selected category
  filteredCards = searchCards(searchTerm); // Filter by search term
  renderCards(filteredCards); // Render the filtered cards
};

// Handle category click event (change active category and filter)
const handleCategoryClick = (event) => {
  event.preventDefault();
  const category = event.target.textContent;
  console.log("Category clicked:", category); // Debugging

  // Toggle the active class for categories
  categoryLinks.forEach(link => link.classList.remove("active"));
  event.target.classList.add("active");

  // Filter the cards based on the selected category
  let filteredCards = filterCardsByCategory(category);

  // Also filter by the search term (if any)
  const searchTerm = searchInput.value.trim();
  filteredCards = searchCards(searchTerm);

  renderCards(filteredCards); // Render the filtered cards
};

// Event Listeners
searchInput.addEventListener("input", handleSearch);
categoryLinks.forEach(link => link.addEventListener("click", handleCategoryClick));

// Initial rendering of all cards
renderCards(data.cards);
