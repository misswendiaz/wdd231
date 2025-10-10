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
    // Render Table
    // ================================
    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach((s, index) => {
            const duration = calculateDuration(s.start, s.end);
            const fee = ((duration * s.rate) * (1 - s.discount / 100)).toFixed(2);
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${s.date}</td>
                <td>${s.start}</td>
                <td>${s.end}</td>
                <td>${s.name}</td>
                <td>${s.grade}</td>
                <td>${s.subject}</td>
                <td>${s.topic}</td>
                <td>${s.feedback}</td>
                <td>${duration.toFixed(2)}</td>
                <td>${s.rate}</td>
                <td>${fee}</td>
                <td>${s.paid ? "Paid" : "Unpaid"}</td>
                <td>${s.paid ? new Date().toLocaleDateString() : ""}</td>
                <td>${s.paid ? "N/A" : ""}</td>
                <td><button data-index="${index}" class="mark-paid">Mark Paid</button></td>
            `;
            tableBody.appendChild(row);
        });

        attachMarkPaidButtons();
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
        summary.textContent = `Total Earnings: $${total.toFixed(2)}`;
    }

    // ================================
    // Mark Paid Buttons
    // ================================
    function attachMarkPaidButtons() {
        document.querySelectorAll(".mark-paid").forEach((btn) => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                sessions[index].paid = true;
                renderTable(sessions);
            });
        });
    }

    // ================================
    // Filtering (basic example)
    // ================================
    document.getElementById("apply-filters").addEventListener("click", () => {
        let filtered = [...sessions];

        const studentFilter = document.getElementById("filter-student").value.toLowerCase();
        if (studentFilter) {
            filtered = filtered.filter(s => s.name.toLowerCase().includes(studentFilter));
        }

        // Add more filters (dates/times) as needed
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
