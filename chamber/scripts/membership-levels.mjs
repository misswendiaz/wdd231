export async function initMembershipDetails() {
    // Get DOM elements only when called
    const dialogBox = document.querySelector(".membership-level-details-dialog-box");
    const membershipLevel = dialogBox.querySelector("h3");
    const description = dialogBox.querySelector(".level-description");
    const cost = dialogBox.querySelector(".level-cost");
    const benefits = dialogBox.querySelector(".level-benefits");

    function showDetails(level) {
        membershipLevel.textContent = level.name;
        description.innerHTML = `<strong>Description:</strong> ${level.description}`;
        cost.innerHTML = `<strong>Cost:</strong> ${level.cost}`;
        benefits.innerHTML = `<strong>Benefits:</strong><br><ul>${level.benefits.map(b => `<li>${b}</li>`).join("")}</ul>`;
    }

    // Make sure fetch path is correct
    const response = await fetch("./data/membership-level.json");
    const data = await response.json();
    const membershipLevels = data.membershipLevels;

    // Attach event listeners
    const detailsButtons = document.querySelectorAll(".membershipLevelDetailsButton");
    detailsButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            showDetails(membershipLevels[index]);
            dialogBox.showModal();
        });
    });

    const closeButton = document.querySelector("#closeButton");
    closeButton.addEventListener("click", () => {
        dialogBox.close();
    });
}
