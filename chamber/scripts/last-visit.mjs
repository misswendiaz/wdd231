export function lastVisit() {
    const lastVisitOverlay = document.getElementById("last-visit-overlay");
    const lastVisitContainer = document.getElementById("last-visit");
    const closeButton = document.getElementById("close-overlay");

    // Get the last visit date from the localStorage
    const lastVisitDate = localStorage.getItem("lastVisit");
    let message = "";

    if (lastVisitDate) {
        const lastStoredDate = new Date(lastVisitDate);
        const today = new Date();

        const dateDifference = today - lastStoredDate; // in milliseconds
        const dayDifference = Math.floor(dateDifference / (1000 * 60 * 60 * 24));

        if (dayDifference > 1) {
            message = `You last visited ${dayDifference} days ago.`;
        } else if (dayDifference === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = "Back so soon! Awesome!";
        }
    } else {
        message = "Welcome! This is your first visit!";
    }

    // Set the message
    lastVisitContainer.textContent = message;

    // Show the overlay
    if (lastVisitOverlay) {
        lastVisitOverlay.style.display = "flex"; // or "block"
    }

    // Close button handler
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            lastVisitOverlay.style.display = "none";
        });
    }

    // Save current date as new last visit
    localStorage.setItem("lastVisit", new Date().toISOString());
}
