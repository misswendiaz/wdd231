const url = 'https://misswendiaz.github.io/wdd231/chamber/data/members.json';

const cards = document.querySelector('#cards');

async function getMembersData() {
    const response = await fetch(url); // request
    const data = await response.json(); // parse the JSON data
    // console.table(data.prophets); // temp output test of data response 
    displayMembers(data.members); // note that you reference the members array of the JSON data object, not just the object
};

const displayMembers = (members) => {
    members.forEach((member) => {
        //Create elements to add to the div.cards element
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let tagline = document.createElement('p');
        let image = document.createElement('img');
        let email = document.createElement('p');
        let phonenumbers = document.createElement('p');
        let url = document.createElement('p');

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
        card.appendChild(name);
        card.appendChild(tagline);
        card.appendChild(image);
        card.appendChild(email);
        card.appendChild(phonenumbers);
        card.appendChild(url);

        cards.appendChild(card);
    });
}
getMemberData();






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