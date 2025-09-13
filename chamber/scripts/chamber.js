// HAMBURGER
//Store the selected elements that we are going to use.
const navButton = document.querySelector("#ham-btn");
const navLinks = document.querySelector("#nav-bar");

//Toggle the show class off and on
navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navLinks.classList.toggle("show");
});


// VIEW
// Grid & List view toggle
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

const display = document.getElementById("cards");

gridBtn.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});



// MEMBER CARDS
const url = 'https://misswendiaz.github.io/wdd231/chamber/data/members.json';

const cards = document.querySelector('#cards');

async function getMemberData() {
    const response = await fetch(url); // request
    const data = await response.json(); // parse the JSON data
    // console.table(data.prophets); // temp output test of data response 
    displayMembers(data.members); // note that you reference the members array of the JSON data object, not just the object
};

const displayMembers = (members) => {
    members.forEach((member) => {
        //Create elements to add to the div.cards element and their class
        let card = document.createElement('section');

        let name = document.createElement('h2');
        name.classList.add("member-name");

        let tagline = document.createElement('p');
        tagline.classList.add("member-tagline");

        let image = document.createElement('img');
        image.classList.add("member-logo");

        let email = document.createElement('p');
        email.classList.add("member-contact");

        let phonenumbers = document.createElement('p');
        phonenumbers.classList.add("member-contact");

        let url = document.createElement('p');
        url.classList.add("member-contact");

        //Build the h2 content out to show the member's full name
        name.textContent = `${member.name}`;

        //Build the p content out to show the member's data
        tagline.textContent = `${member.tagline}`;
        email.textContent = `EMAIL: ${member.email}`;
        phonenumbers.textContent = `PHONE: ${member.phonenumbers}`;
        url.textContent = `URL: ${member.url}`;

        //Build the image by setting all the relevant attributes
        image.setAttribute('src', member.image);
        image.setAttribute('alt', `Logo of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '100');
        image.setAttribute('height', '100');

        //Append the section(card) with the created elements
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(tagline);
        card.appendChild(email);
        card.appendChild(phonenumbers);
        card.appendChild(url);

        cards.appendChild(card);
    });
}
getMemberData();



// Grid and List View Buttons


// Get the current year
const currentYear = new Date().getFullYear();

// Insert the current year into the element with ID "currentyear"
document.getElementById("currentyear").textContent = currentYear;

// Get the raw date when the document was last modified
const rawDate = new Date(document.lastModified);

// Create a date formatter for US English, with full date and 24-hour time
const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full", // e.g., Friday, July 4, 2025
    timeStyle: "long", // e.g. 21:21:25 GMT+8
    hour12: false // 24-hour format
})

// Format the raw date using the formatter
const formattedDate = formatter.format(rawDate);

// Insert the formated date string into the element with ID "lastModified"
document.getElementById("lastModified").textContent += formattedDate;