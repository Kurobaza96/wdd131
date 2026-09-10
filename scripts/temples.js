
const menuButton = document.querySelector("#menu-button");

const navigation = document.querySelector("#primary-nav");

const menuIcon = document.querySelector(".menu-icon");

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


document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastmodified").textContent =
    document.lastModified;