/**
 * Initialize the hamburger menu toggle.
 * @param {HTMLElement} navButton - The hamburger button element.
 * @param {HTMLElement} navLinks - The navigation menu container/ 
 */

export function initHamburger(navButton, navLinks) {
    // if (!navButton || !navLinks) return; // safety check

    navButton.addEventListener("click", () => {
        navButton.classList.toggle("show");
        navLinks.classList.toggle("show");
    });
}