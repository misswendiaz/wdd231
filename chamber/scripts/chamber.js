
// === IMPORTS ===
// Hamburger Toggle
import { initHamburger } from "./hamburger.mjs";

// Member Functions
import { getMemberData } from "./members.mjs";

// Date
import { updateDates } from "./date.mjs";

// Current Weather
import { apiFetch } from "./weather.mjs"



// === HAMBURGER MENU ===
//Store the selected elements that we are going to use.
const navButton = document.querySelector("#ham-btn");
const navLinks = document.querySelector("#nav-bar");

//Toggle the show class off and on
navButton.addEventListener("click", () => {
    initHamburger(navButton, navLinks);
});


// === GRID or LIST VIEW ===
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const cards = document.querySelector("#cards");

gridBtn.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
    cards.innerHTML = ""; // clear current
    getMemberData(cards); // reload
});

listBtn.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
    cards.innerHTML = ""; //clear current
    getMemberData(cards); // reload
});

// Load members initially
getMemberData(cards);


// === WEATHER ===
apiFetch();

// === FOOTER ===

// Call the updateDates function when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    updateDates(); // uses defaults: #currentyear and #lastModified
});