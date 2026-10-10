const foods = [
    {
        id: "tamales",
        name: "Tamales",
        category: "main",
        categoryName: "Main Dish",
        image: "images/tamales.webp",
        alt: "Traditional Guatemalan tamales",
        description:
            "Tamales are made with corn masa and can contain different fillings such as meat, tomato sauce, or other ingredients.",
        ingredients: ["Corn masa", "Tomato", "Chicken", "Pepper"],
        cultural:
            "Tamales are commonly associated with celebrations, holidays, and family gatherings in Guatemala."
    },
    {
        id: "kak-ik",
        name: "Kak-ik",
        category: "main",
        categoryName: "Main Dish",
        image: "images/kakik.webp",
        alt: "Traditional Guatemalan Kak-ik soup",
        description:
            "Kak-ik is a traditional turkey soup associated with the Q'eqchi' Maya community of Guatemala.",
        ingredients: ["Turkey", "Tomato", "Chilies", "Herbs"],
        cultural:
            "Kak-ik is an important traditional dish of the Q'eqchi' Maya people and is often served on special occasions."
    },
    {
        id: "tostadas",
        name: "Tostadas",
        category: "snack",
        categoryName: "Snack",
        image: "images/tostadas.webp",
        alt: "Traditional Guatemalan tostadas",
        description:
            "Tostadas are crispy fried tortillas traditionally served with toppings such as beans, tomato sauce, cheese, and onions.",
        ingredients: ["Corn tortillas", "Beans", "Tomato", "Cheese"],
        cultural:
            "Tostadas are a popular and accessible Guatemalan food often enjoyed as a snack or light meal."
    }
];

const foodContainer = document.querySelector("#food-container");
const filterButtons = document.querySelectorAll(".filter-button");
const filterMessage = document.querySelector("#filter-message");
const favoriteTitle = document.querySelector("#favorite-title");
const favoriteMessage = document.querySelector("#favorite-message");
const foodForm = document.querySelector("#food-form");
const formMessage = document.querySelector("#form-message");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#current-year");

function displayFoods(foodList) {
    if (!foodContainer) {
        return;
    }

    if (foodList.length === 0) {
        foodContainer.innerHTML = `
            <p class="no-results">
                No foods were found in this category.
            </p>
        `;
        return;
    }

    foodContainer.innerHTML = foodList.map((food) => `
        <article class="food-card" id="${food.id}">
            <img
                src="${food.image}"
                alt="${food.alt}"
                loading="lazy"
                width="600"
                height="400"
            >

            <div class="food-card-content">
                <span class="food-category">${food.categoryName}</span>

                <h2>${food.name}</h2>

                <p>${food.description}</p>

                <h3>Main Ingredients</h3>

                <ul>
                    ${food.ingredients.map((ingredient) => `
                        <li>${ingredient}</li>
                    `).join("")}
                </ul>

                <h3>Cultural Information</h3>

                <p>${food.cultural}</p>

                <button
                    class="favorite-button"
                    data-food="${food.name}"
                    type="button"
                >
                    Save as Favorite
                </button>
            </div>
        </article>
    `).join("");

    const favoriteButtons = document.querySelectorAll(".favorite-button");

    favoriteButtons.forEach((button) => {
        button.addEventListener("click", saveFavorite);
    });
}

function filterFoods(category) {
    let filteredFoods = foods;

    if (category !== "all") {
        filteredFoods = foods.filter((food) => food.category === category);
    }

    displayFoods(filteredFoods);

    if (category === "all") {
        filterMessage.textContent = `Showing all ${foods.length} traditional foods.`;
    } else {
        filterMessage.textContent = `
            Showing ${filteredFoods.length} food${filteredFoods.length === 1 ? "" : "s"}
            in the ${category === "main" ? "main dishes" : "snacks"} category.
        `;
    }
}

function saveFavorite(event) {
    const selectedFood = event.currentTarget.dataset.food;

    localStorage.setItem("favoriteFood", selectedFood);

    displayFavorite(selectedFood);
}

function displayFavorite(foodName) {
    if (!favoriteTitle || !favoriteMessage) {
        return;
    }

    if (foodName) {
        favoriteTitle.textContent = `Your favorite: ${foodName}`;
        favoriteMessage.textContent =
            "Your favorite food has been saved in this browser.";
    } else {
        favoriteTitle.textContent = "Choose a favorite food";
        favoriteMessage.textContent =
            "Select a food below to save it as your favorite.";
    }
}

function loadFavorite() {
    const savedFavorite = localStorage.getItem("favoriteFood");

    if (savedFavorite) {
        displayFavorite(savedFavorite);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.querySelector("#visitor-name").value.trim();
    const favorite = document.querySelector(
        'input[name="favorite-food"]:checked'
    );

    if (!name || !favorite) {
        formMessage.textContent =
            "Please complete all required fields before submitting.";
        return;
    }

    localStorage.setItem("visitorName", name);

    formMessage.textContent = `
        Thank you, ${name}! Your favorite food is ${favorite.value}.
        Your response has been saved locally.
    `;

    foodForm.reset();
}

function setupFilters() {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((filterButton) => {
                filterButton.classList.remove("active-filter");
            });

            button.classList.add("active-filter");

            const category = button.dataset.category;

            filterFoods(category);
        });
    });
}

function setupMenu() {
    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);
    });
}

function setYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

displayFoods(foods);
setupFilters();
setupMenu();
loadFavorite();
setYear();

if (foodForm) {
    foodForm.addEventListener("submit", handleFormSubmit);
}