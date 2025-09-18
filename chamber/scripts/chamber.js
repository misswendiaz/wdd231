

import { initHamburger } from "./hamburger.mjs";
import { getMemberData } from "./members.mjs";

// === HAMBURGER ===
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

// === FOOTER ===

// Get the current year
const currentYear = new Date().getFullYear();

// Insert the current year into the element with ID "currentyear"
document.getElementById("currentyear").textContent = `© ${currentYear} Makati City Chamber of Commerce`;

// Get the raw date when the document was last modified
const rawDate = new Date(document.lastModified);

// Create a date formatter for US English, with full date and 24-hour time
const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false // 24-hour format
})

// Format the raw date using the formatter
const formattedDate = formatter.format(rawDate);

// Insert the formated date string into the element with ID "lastModified"
document.getElementById("lastModified").textContent += formattedDate;