
// === IMPORTS ===
// Hamburger Toggle
import { initHamburger } from "./hamburger.mjs";

// Member Functions
import { getMemberData } from "./members.mjs";

// Date
import { updateDates } from "./date.mjs";

// Current Weather
import { getWeather } from "./weather.mjs"

// Forecast
import { fetchForecast } from "./forecast.mjs"

// Spotlights
import { loadSpotlights } from "./spotlight.mjs";



// === HAMBURGER MENU ===
//Store the selected elements that we are going to use.
const navButton = document.querySelector("#ham-btn");
const navLinks = document.querySelector("#nav-bar");

if(navButton && navLinks) {
    //Toggle the show class off and on
    navButton.addEventListener("click", () => {
        initHamburger(navButton, navLinks);
    });
}


// === GRID or LIST VIEW ===
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const cards = document.querySelector(".cards");

if (gridBtn && listBtn && cards) {
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

}


// === WEATHER ===
getWeather();

// === FORECAST ===
fetchForecast();

// === SPOTLIGHTS ===
loadSpotlights();

// === FOOTER ===
// Call the updateDates function when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    updateDates(); // Last Modified Time Stamp
});