// The URL of the JSON data file that contains member information.
const url = "https://misswendiaz.github.io/wdd231/chamber/data/members.json";

/**
 * Fetch the member data from the JSON file and call displayMembers.
 * @param {HTMLElement} container - The DOM element to render the members into.
 */

export async function getMemberData(container) {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);

    // Parse the response into a JavaScript object
    const data = await response.json();

    // Call displayMembers to actually render the data into the page
    displayMembers(data.members, container);
}

/**
 * Display members either in grid view or list view.
 * @param {Array} members - Array of member objects.
 * @param {HTMLElement} container - The DOM element to render the members into.
 */
function displayMembers(members, container) {
    // Loop through each member object in the array
    members.forEach((member, index) => {
        // Create a <section> element that will hold the member card
        let card = document.createElement("section");
        card.classList.add("member-card");

        // Check if the container currently has the "list" class
        // If true -> render LIST view, else -> render GRID view
        const isListView = container.classList.contains("list");

        if (!isListView) {
            // --- GRID VIEW CONTENT ---

            // Create <img> for the member's logo
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

            //Member Name
            let name = document.createElement("h2");
            name.classList.add("member-name");
            name.textContent = member.name;

            // Tagline
            let tagline = document.createElement("p");
            tagline.classList.add("member-tagline");
            tagline.textContent = member.tagline;

            // Address with Office icon
            let addresses = document.createElement("p");
            addresses.classList.add("member-details");
            addresses.innerHTML =
                `<img src="images/office.svg"
                alt="Office"
                class="icon">
                ${member.addresses.address1}, ${member.addresses.address2}`;
            
            // Email with Envelope icon and mailto link
            let email = document.createElement("p");
            email.classList.add("member-details");
            email.innerHTML =
                `<img src="images/envelope.svg"
                alt="Email" class="icon">
                <a href="mailto:${member.email}">${member.email}</a>`;
            
            // Phone number with Phone icon and Tel link
            let phone = document.createElement("p");
            phone.classList.add("member-details");
            phone.innerHTML =
                `<img src="images/phone.svg"
                alt="Phone"
                class="icon">
                <a href="tel:${member.phonenumbers}">${member.phonenumbers}</a>`;
            
            // Shortened Website URL with Globe icon
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
            
            // Append the columns into the row (card)
            card.append(image, name, tagline, addresses, email, phone, link);
        }

        // Finally, add the card into the container (grid or list area)
        container.appendChild(card);
    });
}