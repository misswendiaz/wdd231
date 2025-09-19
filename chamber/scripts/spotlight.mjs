const spotlightContainer = document.getElementById("spotlight-container");
const spotlightDataUrl = "https://misswendiaz.github.io/wdd231/chamber/data/members.json"; // adjust if local

export async function loadSpotlights() {
    try {
        const response = await fetch(spotlightDataUrl);
        if (!response.ok) throw new Error("Failed to fetch members");

        const data = await response.json();
        const members = data.members;

        // Filter for Gold (1) or Silver (2) only
        const goldSilverMembers = members.filter(member =>
            member.membershiplevel === "1" || member.membershiplevel === "2"
        );

        // Randomly shuffle and select 2 or 3
        const shuffled = goldSilverMembers.sort(() => 0.5 - Math.random());
        const spotlightCount = Math.floor(Math.random() * 2) + 2; // Random 2 or 3
        const selected = shuffled.slice(0, spotlightCount);

        // Clear existing content (just in case)
        spotlightContainer.innerHTML = "";

        // Create spotlight cards
        selected.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="${member.image}" alt="Logo of ${member.name}">
                <h3>${member.name}</h3>
                <p><strong>Tagline:</strong> ${member.tagline}</p>
                <p><strong>Phone:</strong> ${member.phonenumbers}</p>
                <p><strong>Address:</strong> ${member.address.street}, ${member.address.city}</p>
                <p><strong>Website:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
                <p><strong>Membership:</strong> ${member.membershiplevel === "1" ? "Gold" : "Silver"}</p>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading spotlight members:", err);
        spotlightContainer.innerHTML = "<p>Unable to load spotlight members at this time.</p>";
    }
}
