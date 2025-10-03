export function lastVisit() {
    const lastVisitContainer = document.getElementById("last-visit");

    // Get the last visit date from the localStorage
    const lastVisitDate = localStorage.getItem("lastVisit");

    if (lastVisitDate) {
        const lastStoredDate = new Date(lastVisitDate);
        const today = new Date();

        const dateDifference = today - lastStoredDate; // in milliseconds

        // Converts the dateDifference into number of days
        const dayDifference = Math.floor(dateDifference / (1000 * 60 * 60 * 24));

        if (dayDifference > 1) {
            lastVisitContainer.textContent = `You last visited ${dayDifference} days ago.`;
        } else if (dayDifference === 1) {
            lastVisitContainer.textContent = `You last visited ${dayDifference} day ago.`;
        } else {
            lastVisitContainer.textContent = "Back so soon! Awesome!";
        }
    } else {
        // First-time visitor
        lastVisitContainer.textContent = "Welcome! This is your first visit!";
    }

    // Save current date as new last visit
    const today = new Date();
    localStorage.setItem("lastVisit", today.toISOString()); // more reliable storage format
}
