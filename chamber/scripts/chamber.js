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
    cards.innerHTML = ""; // clear current
    getMemberData();      // reload
});

listBtn.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
    cards.innerHTML = ""; // clear current
    getMemberData();      // reload
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
    members.forEach((member, index) => {
        // Create the card
        let card = document.createElement('section');
        card.classList.add("member-card");

        // Determine if we are in grid or list view
        const isListView = display.classList.contains('list');

        if (!isListView) {
            // --- GRID VIEW CONTENT ---

            // Logo
            let image = document.createElement('img');
            image.classList.add("member-logo");
            image.setAttribute('src', member.image);
            image.setAttribute('alt', `Logo of ${member.name}`);
            image.setAttribute('width', '120');
            image.setAttribute('height', '120');

            if (index === 0 || index === 1) {
                image.setAttribute('fetchpriority', 'high');
            } else {
                image.setAttribute('loading', 'lazy');
            }

            // Name
            let name = document.createElement('h2');
            name.classList.add("member-name");
            name.textContent = member.name;

            // Tagline
            let tagline = document.createElement('p');
            tagline.classList.add("member-tagline");
            tagline.textContent = member.tagline;

            // Address
            let addresses = document.createElement('p');
            addresses.classList.add("member-details");
            addresses.innerHTML =
                `<img src="images/office.svg" alt="Office" class="icon">
                ${member.addresses.address1} ${member.addresses.address2}`;

            // Email
            let email = document.createElement('p');
            email.classList.add("member-details");
            email.innerHTML = `
                <img src="images/envelope.svg" alt="Email" class="icon">
                <a href="mailto:${member.email}">${member.email}</a>
            `;

            // Phone
            let phone = document.createElement('p');
            phone.classList.add("member-details");
            phone.innerHTML = `
                <img src="images/phone.svg" alt="Phone" class="icon">
                <a href="tel:${member.phonenumbers}">${member.phonenumbers}</a>
            `;

            // URL
            let link = document.createElement('p');
            link.classList.add("member-details");
            link.innerHTML = `
                <img src="images/url.svg" alt="Website" class="icon">
                <a href="${member.url}" target="_blank" rel="noopener noreferrer">
                    ${new URL(member.url).hostname.replace(/^www\./, '')}
                </a>
            `;

            // Append
            card.append(image, name, tagline, addresses, email, phone, link);

        } else {
            // --- LIST VIEW CONTENT ---

            // Add a class for flex layout
            card.classList.add("list-row");

            // Name column
            let name = document.createElement('div');
            name.classList.add("member-col");
            name.textContent = member.name;

            // Address column
            let address = document.createElement('div');
            address.classList.add("member-col");
            address.textContent = `${member.addresses.address1} ${member.addresses.address2}`;

            // Phone column
            let phone = document.createElement('div');
            phone.classList.add("member-col");
            phone.innerHTML = `<a href="tel:${member.phonenumbers}">${member.phonenumbers}</a>`;

            // URL column
            let url = document.createElement('div');
            url.classList.add("member-col");
            url.innerHTML = `<a href="${member.url}" target="_blank" rel="noopener noreferrer">${new URL(member.url).hostname.replace(/^www\./, '')}</a>`;

            // Append in row order
            card.append(name, address, phone, url);
        }

        cards.appendChild(card);
    });
};


getMemberData();


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