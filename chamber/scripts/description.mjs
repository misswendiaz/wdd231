export async function initItemDetails() {
    // Get DOM elements only when called
    const dialogBox = document.querySelector(".item-description");
    const name = dialogBox.querySelector("h3");
    const description = dialogBox.querySelector(".description");

    function showDetails(item) {
        name.textContent = item.name;
        description.innerHTML = item.description;
    }

    // Make sure fetch path is correct
    const response = await fetch("./data/discover.json");
    const data = await response.json();
    const discover = data.discover;

    // Attach event listeners
    const learnMoreButtons = document.querySelectorAll(".learnMoreButton");
    learnMoreButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            showDetails(discover[index]);
            dialogBox.showModal();
        });
    });

    const closeButton = document.querySelector("#closeButton");
    closeButton.addEventListener("click", () => {
        dialogBox.close();
    });
}
