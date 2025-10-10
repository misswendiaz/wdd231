/* ================================ */
/* Import Hamburger Module */
/* ================================ */
import { initNavigation } from './hamburger.mjs';

// Initialize hamburger menu immediately
initNavigation();

/* ================================ */
/* Dynamic Resources + Modal */
/* ================================ */
async function loadResources() {
    try {
        const response = await fetch("data/resources.json");
        if (!response.ok) throw new Error("Failed to load resources.");
        const data = await response.json();

        const container = document.getElementById("resources-container");

        const columnsWrapper = document.createElement("div");
        columnsWrapper.classList.add("columns-wrapper");

        const allSections = [
            { title: "Academic References", content: data.academicReferences },
            { title: "Free Interactive Tools", content: data.interactiveTools },
        ];

        allSections.forEach((section) => {
            const sectionColumn = document.createElement("div");
            sectionColumn.classList.add("section-column");

            const sectionHeader = document.createElement("h3");
            sectionHeader.textContent = section.title;
            sectionColumn.appendChild(sectionHeader);

            section.content.forEach((group) => {
                const categoryDiv = document.createElement("div");
                categoryDiv.classList.add("category-group");

                const groupTitle = document.createElement("h4");
                groupTitle.textContent = group.category;
                categoryDiv.appendChild(groupTitle);

                const groupDiv = document.createElement("div");
                groupDiv.classList.add("features");

                group.items.forEach((item) => {
                    const card = document.createElement("div");
                    card.classList.add("feature-card");

                    card.innerHTML = `
                        <h5>${item.title}</h5>
                        <p><strong>Category:</strong> ${item.category}</p>
                        <p><strong>Grade:</strong> ${item.grade}</p>
                        <p><strong>Type:</strong> ${item.type}</p>
                        <p><strong>Cost:</strong> ${item.cost}</p>
                        <button class="learn-more-btn" 
                          data-title="${item.title}" 
                          data-description="${item.description}" 
                          data-link="${item.link}">
                          Learn More
                        </button>
                    `;
                    groupDiv.appendChild(card);
                });

                categoryDiv.appendChild(groupDiv);
                sectionColumn.appendChild(categoryDiv);
            });

            columnsWrapper.appendChild(sectionColumn);
        });

        container.appendChild(columnsWrapper);

        attachModalEvents();
    } catch (error) {
        console.error("Error loading resources:", error);
        document.getElementById("resources-container").innerHTML =
            "<p>Sorry, we couldn’t load the resources at this time.</p>";
    }
}

/* ================================ */
/* Modal Events */
/* ================================ */
function attachModalEvents() {
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("close-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const modalLink = document.getElementById("modal-link");

    document.querySelectorAll(".learn-more-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modalTitle.textContent = btn.dataset.title;
            modalDesc.textContent = btn.dataset.description;
            modalLink.href = btn.dataset.link;
            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
        }
    });
}

// Load resources after DOM is ready
document.addEventListener("DOMContentLoaded", loadResources);
