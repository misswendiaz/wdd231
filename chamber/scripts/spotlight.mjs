const spotlightContainer = document.getElementById("spotlight-container");
const spotlightDataUrl = "https://misswendiaz.github.io/wdd231/chamber/data/members.json"; // or adjust if local

export async function loadSpotlights() {
    try {
        const response = await fetch(spotlightDataUrl);
        if (!response.ok) throw new Error("Failed to fetch members");

        const data = await response.json();
        const members = data.members;

        // Filter for Gold (1) or Silver (2) members
        const goldSilverMembers = members.filter(member =>
            member.membershiplevel === "3" || member.membershiplevel === "2"
        );

        // Randomly shuffle and select 2 or 3
        const shuffled = goldSilverMembers.sort(() => 0.5 - Math.random());
        const spotlightCount = Math.floor(Math.random() * 2) + 2;
        const selected = shuffled.slice(0, spotlightCount);

        // Clear container
        spotlightContainer.innerHTML = "";

        // Render each selected member
        selected.forEach((member, index) => {
            const card = renderSpotlightCard(member, index);
            spotlightContainer.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading spotlight members:", err);
        spotlightContainer.innerHTML = "<p>Unable to load spotlight members at this time.</p>";
    }
}

/**
 * Create a spotlight card using the same structure as renderGridCard in members.mjs.
 * @param {Object} member - Member data
 * @param {number} index - Index for image loading priority
 * @returns {HTMLElement} - DOM card element
 */
function renderSpotlightCard(member, index) {
    const card = document.createElement("section");
    card.classList.add("member-card");

    // Logo
    const image = document.createElement("img");
    image.classList.add("member-logo");
    image.src = member.image;
    image.alt = `Logo of ${member.name}`;
    image.width = 120;
    image.height = 120;

    if (index < 2) {
        image.setAttribute("fetchpriority", "high");
    } else {
        image.loading = "lazy";
    }

    // Name
    const name = document.createElement("h2");
    name.classList.add("member-name");
    name.textContent = member.name;

    // Tagline
    const tagline = document.createElement("p");
    tagline.classList.add("member-tagline");
    tagline.textContent = member.tagline;

    // Address
    const address = document.createElement("p");
    address.classList.add("member-details");
    address.innerHTML = `
        <img src="images/office.svg" alt="Office" class="icon">
        ${member.address.street}, ${member.address.city}
    `;

    // Email
    const email = document.createElement("p");
    email.classList.add("member-details");
    email.innerHTML = `
        <img src="images/envelope.svg" alt="Email" class="icon">
        <a href="mailto:${member.email}">${member.email}</a>
    `;

    // Phone
    const phone = document.createElement("p");
    phone.classList.add("member-details");
    phone.innerHTML = `
        <img src="images/phone.svg" alt="Phone" class="icon">
        <a href="tel:${member.phonenumbers}">${member.phonenumbers}</a>
    `;

    // Shortened URL
    const website = document.createElement("p");
    website.classList.add("member-details");
    const shortURL = new URL(member.url).hostname.replace(/^www\./, "");
    website.innerHTML = `
        <img src="images/url.svg" alt="Website" class="icon">
        <a href="${member.url}" target="_blank" rel="noopener noreferrer">
            ${shortURL}
        </a>
    `;

    // Append all elements
    card.append(image, name, tagline, address, email, phone, website);

    return card;
}
