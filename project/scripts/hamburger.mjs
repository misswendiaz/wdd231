// ================
// Hamburger Module
// ================
export function initNavigation() {
    document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });
        }

        navLinks?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('show'));
        });
    });
}
