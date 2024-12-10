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
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="h4 m-0">
              <a href="#" class="text-dark">${title}</a>
            </h2>
            <!-- Edit Icon -->
            <button class="edit-icon bg-transparent border-0" aria-label="Edit">
              <i class="fas fa-edit text-dark"></i>
            </button>
          </div>
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

    // Add event listener to edit button
    const editButton = cardElement.querySelector('.edit-icon');
    editButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`Editing card: ${title}`);
      // You can replace this with the action you want (e.g., opening a modal or redirecting)
    });
  });

  const carouselItems = document.querySelectorAll(".has-multiple");
  carouselItems.forEach(initializeCarousel);
};
