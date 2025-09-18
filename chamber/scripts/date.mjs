/**
 * Update the current year and last modified date in the footer.
 * @param {string} yearSelector - CSS selector for the element where the year should go.
 * @param {string} modifiedSelector - CSS selector for the element where the last modified date should go.
 */

export function updateDates(
    yearSelector = "#currentyear",
    modifiedSelector = "#lastModified"
) {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Insert the current year into the selected element
    const yearElement = document.querySelector(yearSelector);
    if (yearElement) {
        yearElement.textContent = `© ${currentYear} Makati City Chamber of Commerce`;
    }

    // Get the raw date when the document was last modified
    const rawDate = new Date(document.lastModified);

    // Format the date
    const formattedDate = rawDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });


    // Insert the formatted date string into the selected element
    const modifiedElement = document.querySelector(modifiedSelector);
    if (modifiedElement) {
        modifiedElement.textContent =
            `Last Modified: ${formattedDate}`;
    }
}