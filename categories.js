// Stores the game information used by the catalog
const games = [
  {
    name: "Cyberpunk 2077",
    price: 620,
    tags: ["Action", "RPG", "Adventure", "Indie"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg"
  },
  {
    name: "Elden Ring",
    price: 1800,
    tags: ["Action", "RPG", "Adventure"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg"
  },
  {
    name: "Red Dead Redemption 2",
    price: 1600,
    tags: ["Action", "Adventure", "Simulation"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg"
  },
  {
    name: "Stardew Valley",
    price: 350,
    tags: ["Indie", "Casual", "Simulation", "RPG"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg"
  },
  {
    name: "Hollow Knight",
    price: 400,
    tags: ["Indie", "Action", "Adventure"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg"
  },
  {
    name: "The Sims 4",
    price: 0,
    tags: ["Casual", "Simulation"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222670/header.jpg"
  },
  {
    name: "Resident Evil 4",
    price: 1200,
    tags: ["Action", "Adventure", "Horror"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg"
  },
  {
    name: "Left 4 Dead 2",
    price: 200,
    tags: ["Action", "Horror", "Multiplayer"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/550/header.jpg"
  },
  {
    name: "Civilization VI",
    price: 900,
    tags: ["Strategy", "Simulation", "Indie"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/289070/header.jpg"
  }
];

// Gets the elements that will be updated on the page
const gameGrid = document.getElementById("game-grid");
const searchInput = document.getElementById("game-search");
const sortSelect = document.getElementById("sort-games");
const tagButtons = document.querySelectorAll(".tag-button");
const selectedTagTitle = document.getElementById("selected-tag-title");
const resultsCount = document.getElementById("results-count");
const noResults = document.getElementById("no-results");

// Sets the default category
let selectedTag = "All";

// Displays the games as cards on the page
function displayGames(gamesToShow) {
  const gameGrid = document.getElementById("game-grid");

  gameGrid.innerHTML = gamesToShow.map(game => `
    <article class="game-card">
      <div class="game-image">
        <img src="${game.image}" alt="${game.name}" loading="lazy">
      </div>

      <div class="game-info">
        <h3>${game.name}</h3>
        <p class="game-tags">${game.tags.join(" · ")}</p>
        <p class="game-price">
          ${game.price === 0
            ? "Free to Play"
            : "₱" + game.price.toLocaleString("en-PH")}
        </p>
      </div>
    </article>
  `).join("");
}

// Filters the games by category and search text
function updateGames() {
  const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";

  // Keeps games that match the selected category and search
  let filteredGames = games.filter(function (game) {
    const matchesTag = selectedTag === "All" || game.tags.includes(selectedTag);
    const matchesSearch = game.name.toLowerCase().includes(searchText);
    return matchesTag && matchesSearch;
  });

  // Arranges the games according to the selected sorting option
  const sortOption = sortSelect ? sortSelect.value : "";

  if (sortOption === "name-asc") {
    filteredGames.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (sortOption === "price-asc") {
    filteredGames.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sortOption === "price-desc") {
    filteredGames.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  // Updates the heading to show the selected category
  if (selectedTagTitle) {
    selectedTagTitle.textContent =
      selectedTag === "All" ? "All Games" : selectedTag;
  }

  // Updates the number of games 
  if (resultsCount) {
    const total = filteredGames.length;
    resultsCount.textContent =
      total === 1 ? "1 game" : total + " games";
  }

  // Shows a message when no games match the current filters
  if (noResults) {
    noResults.hidden = filteredGames.length > 0;
  }

  // Displays the filtered and sorted games
  displayGames(filteredGames);
}

// Changes the active category when a category button is clicked
tagButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedTag = button.dataset.tag;

    // Removes the active style from all category buttons
    tagButtons.forEach(function (tagButton) {
      tagButton.classList.remove("active");
    });

    // Highlights the selected category button
    button.classList.add("active");

    updateGames();
  });
});

// Updates the results whenever the user types in the search
if (searchInput) {
  searchInput.addEventListener("input", updateGames);
}

// Updates the results when the sorting option changes
if (sortSelect) {
  sortSelect.addEventListener("change", updateGames);
}

// Displays the initial list of games when the page loads
updateGames();
