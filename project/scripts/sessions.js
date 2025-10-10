/* ================================ */
/* Import Hamburger Module */
/* ================================ */
import { initNavigation } from './hamburger.mjs';

// Initialize hamburger menu immediately
initNavigation();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addSession");
    const tableBody = document.querySelector("#table tbody");
    const summary = document.getElementById("summary");

    const dialog = document.getElementById("session-dialog");
    const dialogBody = document.getElementById("dialog-body");
    const closeDialogBtn = document.getElementById("close-dialog");

    let sessions = [];

    // ================================
    // Add Session
    // ================================
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const session = {
            date: document.getElementById("date").value,
            start: document.getElementById("start").value,
            end: document.getElementById("end").value,
            name: document.getElementById("name").value,
            grade: document.getElementById("grade").value,
            subject: document.getElementById("subject").value,
            topic: document.getElementById("topic").value,
            feedback: document.getElementById("feedback").value,
            rate: parseFloat(document.getElementById("rate").value),
            discount: parseFloat(document.getElementById("discount").value) || 0,
            paid: false,
        };
        sessions.push(session);
        renderTable(sessions);
        form.reset();
    });

    // ================================
    // Render Table (Compact View)
    // ================================
    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach((s, index) => {
            const duration = calculateDuration(s.start, s.end);
            const fee = ((duration * s.rate) * (1 - s.discount / 100)).toFixed(2);
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="essential">${s.date}</td>
                <td class="essential">${s.name}</td>
                <td class="essential">${duration.toFixed(2)}</td>
                <td class="essential">₱${fee}</td>
                <td class="essential"><input type="checkbox" class="paid-checkbox" data-index="${index}" ${s.paid ? "checked" : ""}></td>
                <td class="essential"><button class="details-btn" data-index="${index}">Details</button></td>
            `;



            tableBody.appendChild(row);
        });

        attachDetailButtons();
        updateSummary(data);
    }

    // ================================
    // Calculate Duration
    // ================================
    function calculateDuration(start, end) {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);
        const diff = (endTime - startTime) / (1000 * 60 * 60); // hours
        return diff > 0 ? diff : 0;
    }

    // ================================
    // Update Summary
    // ================================
    function updateSummary(data) {
        const total = data.reduce((acc, s) => {
            const duration = calculateDuration(s.start, s.end);
            return acc + duration * s.rate * (1 - s.discount / 100);
        }, 0);
        summary.textContent = `Total Earnings: ₱${total.toFixed(2)}`; // CHANGED: $ → ₱
    }

    // ================================
    // Details Dialog (Updated for <dialog> element)
    // ================================
    function attachDetailButtons() {
        document.querySelectorAll(".details-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const session = sessions[btn.dataset.index];
                const duration = calculateDuration(session.start, session.end).toFixed(2);
                const fee = (duration * session.rate * (1 - session.discount / 100)).toFixed(2);

                // Fill dialog content
                dialogBody.innerHTML = `
                <p><strong>Date:</strong> ${session.date}</p>
                <p><strong>Name:</strong> ${session.name}</p>
                <p><strong>Grade Level:</strong> ${session.grade}</p>
                <p><strong>Subject:</strong> ${session.subject}</p>
                <p><strong>Topic:</strong> ${session.topic}</p>
                <p><strong>Feedback:</strong> ${session.feedback}</p>
                <p><strong>Start Time:</strong> ${session.start}</p>
                <p><strong>End Time:</strong> ${session.end}</p>
                <p><strong>Duration:</strong> ${duration} hrs</p>
                <p><strong>Hourly Rate:</strong> ₱${session.rate}</p>
                <p><strong>Discount:</strong> ${session.discount}%</p>
                <p><strong>Fee:</strong> ₱${fee}</p>
                <p><strong>Status:</strong> ${session.paid ? "Paid" : "Unpaid"}</p>
            `;

                // Show dialog
                dialog.showModal();
            });
        });
    }

    // Close button and click-outside handler
    closeDialogBtn.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
    });



    // ================================
    // Filtering
    // ================================
    document.getElementById("apply-filters").addEventListener("click", () => {
        let filtered = [...sessions];
        const studentFilter = document.getElementById("filter-student").value.toLowerCase();
        if (studentFilter) filtered = filtered.filter(s => s.name.toLowerCase().includes(studentFilter));
        renderTable(filtered);
    });

    document.getElementById("clear-filters").addEventListener("click", () => {
        form.reset();
        document.getElementById("filter-student").value = "";
        renderTable(sessions);
    });

    // ================================
    // Bulk Mark Paid
    // ================================
    document.getElementById("mark-all-paid").addEventListener("click", () => {
        sessions.forEach(s => s.paid = true);
        renderTable(sessions);
    });
});
