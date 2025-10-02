/**
 * Loop through discover items and display them
 * @param {Array} discover - The array of discover objects from JSON
 * @param {HTMLElement} container - The container element where cards will be appended
 */
function displayItems(discover, container) {
    discover.forEach((item, index) => {
        // ✅ Detect if current view is "list" or "grid"
        const isListView = container.classList.contains("list");

        // ✅ Use the appropriate renderer
        const card = isListView
            ? renderListCard(item)
            : renderGridCard(item, index);

        // ✅ Append the card into the container
        container.appendChild(card);
    });
}

/**
 * Render a discover item in GRID view
 * @param {Object} item - A single discover object from JSON
 * @param {number} index - Index of the item (for image fetch priority)
 * @returns {HTMLElement} A <section> card in grid format
 */
function renderGridCard(item, index) {
    // Create section for the card
    let card = document.createElement("section");
    card.classList.add("item-card");

    // Name
    let name = document.createElement("h2");
    name.classList.add("item-name");
    name.textContent = item.name; // ✅ FIXED: was using discover.name

    // Image
    let image = document.createElement("img");
    image.classList.add("item-image");
    image.setAttribute("src", item.image);   // ✅ FIXED
    image.setAttribute("alt", item.name);    // ✅ FIXED
    image.setAttribute("width", 300);
    image.setAttribute("height", 200);

    // ✅ Optimize image loading
    if (index === 0 || index === 1) {
        // First 2 images load immediately
        image.setAttribute("fetchpriority", "high");
    } else {
        // Others load lazily
        image.setAttribute("loading", "lazy");
    }

    // Description
    let description = document.createElement("p");
    description.classList.add("item-tagline");
    description.textContent = item.tagline;  // ✅ FIXED

    // Append elements into card
    card.append(name, image, description);

    return card;
}

/**
 * Render a discover item in LIST view
 * @param {Object} item - A single discover object from JSON
 * @returns {HTMLElement} A <section> card in list-row format
 */
function renderListCard(item) {
    // Create section for the row
    let card = document.createElemen
