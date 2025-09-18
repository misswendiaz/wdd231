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

    // Create a date formatter for US English
    const formatter = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        hour12: false // 24-hour format
    });

    // Format the raw date
    const formattedDate = formatter.format(rawDate);

    // Insert the formatted date string into the selected element
    const modifiedELement = document.querySelector(modifiedSelector);
    if (modifiedELement) {
        modifiedELement.textContent =
            `Last Modified: ${formattedDate}`;
    }
}