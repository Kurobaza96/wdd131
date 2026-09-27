const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");
const menuIcon = document.querySelector(".menu-icon");


// TEMPLE DATA

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  
    // Additional temple 1
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-6813.jpg"
    },

    // Additional temple 2
    {
        templeName: "Guatemala City Guatemala",
        location: "Guatemala City, Guatemala",
        dedicated: "1984, December, 14",
        area: 11600,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/guatemala-city-guatemala-temple/guatemala-city-guatemala-temple-68580.jpg"
    },

    // Additional temple 3
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
    }
];


// DISPLAY TEMPLE CARDS

const templeContainer = document.querySelector("#temple-container");

function displayTemples(templeList) {

    // Remove previous cards
    templeContainer.innerHTML = "";

    templeList.forEach((temple) => {

        const card = document.createElement("figure");

        card.innerHTML = `
            <img 
                src="${temple.imageUrl}"
                alt="${temple.templeName}"
                loading="lazy"
                width="800"
                height="500"
            >

            <figcaption>
                <h2>${temple.templeName}</h2>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </figcaption>
        `;

        templeContainer.appendChild(card);
    });
}


// FILTER FUNCTIONS

// Home - display all temples
function showHome() {
    displayTemples(temples);
}


// Old - temples dedicated before 1900
function showOld() {

    const filteredTemples = temples.filter((temple) => {
        const year = parseInt(temple.dedicated);

        return year < 1900;
    });

    displayTemples(filteredTemples);
}


// New - temples dedicated after 2000
function showNew() {

    const filteredTemples = temples.filter((temple) => {
        const year = parseInt(temple.dedicated);

        return year > 2000;
    });

    displayTemples(filteredTemples);
}


// Large - temples larger than 90,000 square feet
function showLarge() {

    const filteredTemples = temples.filter((temple) => {
        return temple.area > 90000;
    });

    displayTemples(filteredTemples);
}


// Small - temples smaller than 10,000 square feet
function showSmall() {

    const filteredTemples = temples.filter((temple) => {
        return temple.area < 10000;
    });

    displayTemples(filteredTemples);
}


// NAVIGATION FILTER EVENTS

document.querySelector("#home-link").addEventListener("click", showHome);

document.querySelector("#old-link").addEventListener("click", showOld);

document.querySelector("#new-link").addEventListener("click", showNew);

document.querySelector("#large-link").addEventListener("click", showLarge);

document.querySelector("#small-link").addEventListener("click", showSmall);


// HAMBURGER MENU

menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    // Change hamburger icon to X
    menuIcon.textContent = isOpen
        ? "✕"
        : "☰";
});


// Close menu after selecting a navigation option

document.querySelectorAll("#primary-nav a").forEach((link) => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuIcon.textContent = "☰";
    });

});


// FOOTER

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastmodified").textContent =
    document.lastModified;


// INITIAL DISPLAY

// Show all temples when the page first loads
displayTemples(temples);


console.log("JavaScript is working");
console.log(temples);