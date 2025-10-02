// The URL of the JSON data file that contains discover items information.
const url = "https://misswendiaz.github.io/wdd231/chamber/data/discover.json";

/**
 * Fetch the item data from the JSON file and call displayItems.
 * @param {HTMLElement} container - The DOM element to render the items into.
 */

export async function getItemData(container) {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);

    // Parse the response into a JavaScript object
    const data = await response.json();

    // Call displayItems to actually render the data into the page
    displayItems(data.discover, container);
}

/**
 * Display items either in grid view or list view.
 * @param {Array} items - Array of discover objects.
 * @param {HTMLElement} container - The DOM element to render the items into.
 */
function displayItems(discover, container) {
    // Loop through each member object in the array
    discover.forEach((item, index) => {

        // Decide which renderer to use (grid or list)
        const isListView = container.classList.contains("list");
        const card = isListView
            ? renderListCard(item) // if list view
            : renderGridCard(item, index); // if grid view

        container.appendChild(card);
    });
}

/**
 * Render a single item card in GRID view.
 * @param {Object} item - Member object from JSON.
 * @param {number} index - Position in the array (for image loading priority).
 * @returns {HTMLElement} - A <section> element representing the grid card.
 */

function renderGridCard(item, index) {
    // Create a <section> element that will hold the item card
    let card = document.createElement("section");
    card.classList.add("item-card");

    // Logo
    let image = document.createElement("img");
    image.classList.add("member-logo");
    image.setAttribute("src", member.image);
    image.setAttribute("alt", `Logo of ${member.name}`);
    image.setAttribute("width", 120);
    image.setAttribute("height", 120);

    // Optimize loading:
    // First two images load with "high" priority,
    // others load lazily as you scroll
    if (index === 0 || index === 1) {
        image.setAttribute("fetchpriority", "high");
    } else {
        image.setAttribute("loading", "lazy");
    }

    // Name
    let name = document.createElement("h2");
    name.classList.add("member-name");
    name.textContent = member.name;

    // Tagline
    let tagline = document.createElement("p");
    tagline.classList.add("member-tagline");
    tagline.textContent = member.tagline;

    // Address
    let address = document.createElement("p");
    address.classList.add("member-details");
    address.innerHTML =
        `<img src="images/office.svg"
                alt="Office"
                class="icon">
                ${member.address.street}, ${member.address.city}`;

    // Email
    let email = document.createElement("p");
    email.classList.add("member-details");
    email.innerHTML =
        `<img src="images/envelope.svg"
                alt="Email" class="icon">
                <a href="mailto:${member.email}">${member.email}</a>`;

    // Phone
    let phone = document.createElement("p");
    phone.classList.add("member-details");
    phone.innerHTML =
        `<img src="images/phone.svg"
                alt="Phone"
                class="icon">
                <a href="tel:${member.phonenumbers}">${member.phonenumbers}</a>`;

    // Shortened Website URL
    let link = document.createElement("p");
    link.classList.add("member-details");
    link.innerHTML =
        `<img src="images/url.svg"
                alt="Website"
                class="icon">

                <a href="${member.url}"
                target="_blank"
                rel="noopener noreferrer">
                ${new URL(member.url).hostname.replace(/^www\./, "")}
                </a>`;

    // Append the columns into the container (grid or list)
    card.append(image, name, tagline, address, email, phone, link);
    return card;
}

/**
* Render a single member card in LIST view.
* @param {Object} member - Member object from JSON.
* @returns { HTMLElement} - A <section> element representing the list card.
*/
function renderListCard(member) {
    // Create a <section> element that will hold the member card
    let card = document.createElement("section");
    card.classList.add("member-card", "list-row");

    // Name
    let nameCol = document.createElement("div");
    nameCol.classList.add("member-name-col");
    nameCol.textContent = member.name;

    // Address
    let addressCol = document.createElement("div");
    addressCol.classList.add("member-col");
    addressCol.textContent = `${member.address.street}, ${member.address.city}`;

    // Phone
    let phoneCol = document.createElement("div");
    phoneCol.classList.add("member-col");
    phoneCol.innerHTML =
        `<a href="tel:${member.phonenumbers}">${member.phonenumbers}</a>`;

    // Shortened Website URL
    let urlCol = document.createElement("div");
    urlCol.classList.add("member-col");
    urlCol.innerHTML =
        `<a href="${member.url}"
        target="_blank"
        rel="noopener noreferrer">
        ${new URL(member.url).hostname.replace(/^www\./, "")}
        </a>`;

    // Append all columns into one row (section)
    card.append(nameCol, addressCol, phoneCol, urlCol);

    return card;
}