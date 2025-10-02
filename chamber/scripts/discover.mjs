// The URL of the JSON data file that contains discover items information.
const url = "https://misswendiaz.github.io/wdd231/chamber/data/discover.json";

/**
 * Fetch the item data from the JSON file and call displayItems.
 * @param {HTMLElement} container - The DOM element to render the items into.
 */
export async function getItemData(container) {
    try {
        // Fetch the JSON file
        const response = await fetch(url);

        // Parse the response into a JavaScript object
        const data = await response.json();

        // Call displayItems to render items
        displayItems(data.discover, container);
    } catch (error) {
        console.error("Error fetching discover data:", error);
    }
}

/**
 * Display discover items in a simple grid layout.
 * @param {Array} discover - Array of discover objects.
 * @param {HTMLElement} container - The DOM element to render the items into.
 */
function displayItems(discover, container) {
    discover.forEach((item, index) => {
        const card = renderGridCard(item, index);
        container.appendChild(card);
    });
}

/**
 * Render a single item card (Grid style).
 * @param {Object} item - Discover object from JSON.
 * @param {number} index - Position in the array (for image loading priority).
 * @returns {HTMLElement} - A <section> element representing the item card.
 */
function renderGridCard(item, index) {
    let card = document.createElement("section");
    card.classList.add("item-card");

    // Name
    let name = document.createElement("h2");
    name.classList.add("item-name");
    name.textContent = item.name;

    // Image
    let image = document.createElement("img");
    image.classList.add("item-image");
    image.setAttribute("src", item.image);
    image.setAttribute("alt", item.name);
    image.setAttribute("width", 300);
    image.setAttribute("height", 200);

    // Optimize image loading
    if (index === 0 || index === 1) {
        image.setAttribute("fetchpriority", "high");
    } else {
        image.setAttribute("loading", "lazy");
    }

    // // Description
    // let description = document.createElement("p");
    // description.classList.add("item-description");
    // description.textContent = item.description;

    // Learn More button
    let learnMoreButton = document.createElement("button");
    learnMoreButton.classList.add("learnMoreButton")
    learnMoreButton.textContent = "Learn More"

    // Append into card
    card.append(name, image, learnMoreButton);

    return card;
}
