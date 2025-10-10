/* ================================ */
/* Import Hamburger Module */
/* ================================ */
import { initNavigation } from './hamburger.mjs';

/* ================================ */
/* Initialize Navigation */
/* ================================ */
initNavigation();

document.addEventListener("DOMContentLoaded", () => {
    /* ================================ */
    /* Element references */
    /* ================================ */
    const form = document.getElementById("addSession");
    const tableBody = document.querySelector("#table tbody");
    const summary = document.getElementById("summary");
    const markFilteredBtn = document.getElementById("mark-all-paid");

    /* ================================ */
    /* Prefill form from query params */
    /* ================================ */
    (function prefillFormFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        if (!form || !urlParams.has("date")) return; // exit if no form or no session data

        document.getElementById("date").value = urlParams.get("date") || "";
        document.getElementById("start").value = urlParams.get("start") || "";
        document.getElementById("end").value = urlParams.get("end") || "";
        document.getElementById("name").value = urlParams.get("name") || "";
        document.getElementById("grade").value = urlParams.get("grade") || "";
        document.getElementById("subject").value = urlParams.get("subject") || "";
        document.getElementById("topic").value = urlParams.get("topic") || "";
        document.getElementById("feedback").value = urlParams.get("feedback") || "";
        document.getElementById("rate").value = urlParams.get("rate") || "";
        document.getElementById("discount").value = urlParams.get("discount") || 0;
    })();

    const dialog = document.getElementById("session-dialog");
    const dialogBody = document.getElementById("dialog-body");
    const closeDialogBtn = document.getElementById("close-dialog");
    const editSessionBtn = document.getElementById("edit-session");
    const deleteSessionBtn = document.getElementById("delete-session");

    const editDialog = document.getElementById("edit-dialog");
    const editForm = document.getElementById("editSessionForm");
    const cancelEditBtn = document.getElementById("cancel-edit");

    /* ================================ */
    /* State */
    /* ================================ */
    let sessions = [];
    let currentEditIndex = null; // original index in `sessions` for the currently opened item

    /* ================================ */
    /* LocalStorage: load & save */
    /* ================================ */
    function loadSessions() {
        const saved = localStorage.getItem("tutorBuddySessions");
        if (saved) {
            try {
                sessions = JSON.parse(saved);
                renderTable(sessions);
            } catch (e) {
                console.error("Error loading saved sessions:", e);
                sessions = [];
            }
        }
    }

    function saveSessions() {
        localStorage.setItem("tutorBuddySessions", JSON.stringify(sessions));
    }

    /* ================================ */
    /* Add Session */
    /* ================================ */
    if (form) {
        form.addEventListener("submit", (e) => {
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

            localStorage.setItem("pendingSession", JSON.stringify(session));
        });
    }

    /* ================================ */
    /* Calculate Duration */
    /* ================================ */
    function calculateDuration(start, end) {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);
        const diff = (endTime - startTime) / (1000 * 60 * 60); // hours
        return diff > 0 ? diff : 0;
    }

    /* ================================ */
    /* Render Table */
    /* ================================ */
    function renderTable(data) {
        tableBody.innerHTML = "";

        data.forEach((s, index) => {
            const originalIndex = sessions.indexOf(s);
            const duration = calculateDuration(s.start, s.end);
            const fee = ((duration * s.rate) * (1 - s.discount / 100)).toFixed(2);
            const row = document.createElement("tr");

            row.innerHTML = `
            <td class="essential">${s.date}</td>
            <td class="essential">${s.name}</td>
            <td class="essential">${duration.toFixed(2)}</td>
            <td class="essential">₱${fee}</td>
            <td class="essential"><input type="checkbox" class="paid-checkbox" data-index="${originalIndex}" ${s.paid ? "checked" : ""}></td>
            <td class="essential"><button class="details-btn" data-index="${originalIndex}">Details</button></td>
        `;

            tableBody.appendChild(row);
        });

        attachDetailButtons();
        attachPaidCheckboxes(data);
        updateSummary(data);
        updateMarkFilteredButton(); // ✅ update button dynamically
    }

    /* ================================ */
    /* Update Summary */
    /* ================================ */
    function updateSummary(data) {
        const total = data.reduce((acc, s) => {
            if (!s.paid) {
                const duration = calculateDuration(s.start, s.end);
                return acc + duration * s.rate * (1 - s.discount / 100);
            }
            return acc;
        }, 0);
        summary.textContent = `Amount Due: ₱${total.toFixed(2)}`;
    }

    /* ================================ */
    /* Paid checkboxes handling */
    /* ================================ */
    function attachPaidCheckboxes(data) {
        document.querySelectorAll(".paid-checkbox").forEach(cb => {
            cb.onchange = null;
            cb.addEventListener("change", () => {
                const index = Number(cb.dataset.index);
                if (sessions[index]) {
                    sessions[index].paid = cb.checked;
                    saveSessions();
                    updateSummary(data);
                    updateMarkFilteredButton();
                }
            });
        });
    }

    /* ================================ */
    /* Details Dialog */
    /* ================================ */
    function attachDetailButtons() {
        document.querySelectorAll(".details-btn").forEach(btn => {
            btn.onclick = null;
            btn.addEventListener("click", () => {
                const originalIndex = Number(btn.dataset.index);
                const session = sessions[originalIndex];
                if (!session) return;

                const duration = calculateDuration(session.start, session.end).toFixed(2);
                const fee = (duration * session.rate * (1 - session.discount / 100)).toFixed(2);

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

                currentEditIndex = originalIndex;

                if (editSessionBtn) {
                    editSessionBtn.onclick = null;
                    editSessionBtn.addEventListener("click", () => openEditDialog(currentEditIndex));
                }

                if (deleteSessionBtn) {
                    deleteSessionBtn.disabled = false;
                    deleteSessionBtn.onclick = null;
                    deleteSessionBtn.addEventListener("click", () => {
                        if (confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
                            sessions.splice(currentEditIndex, 1);
                            saveSessions();
                            renderTable(sessions);
                            if (typeof dialog.close === "function") dialog.close();
                            else dialog.classList.add("hidden");
                        }
                    });
                }

                if (typeof dialog.showModal === "function") dialog.showModal();
                else dialog.classList.remove("hidden");
            });
        });
    }

    /* ================================ */
    /* Close Dialog */
    /* ================================ */
    if (closeDialogBtn) {
        closeDialogBtn.addEventListener("click", () => {
            if (typeof dialog.close === "function") dialog.close();
            else dialog.classList.add("hidden");
        });
    }

    if (dialog) {
        dialog.addEventListener("click", (e) => {
            if (e.target === dialog) {
                if (typeof dialog.close === "function") dialog.close();
                else dialog.classList.add("hidden");
            }
        });
    }

    /* ================================ */
    /* Edit Dialog Logic */
    /* ================================ */
    function openEditDialog(index) {
        if (!sessions[index]) return;

        const s = sessions[index];
        document.getElementById("edit-date").value = s.date || "";
        document.getElementById("edit-start").value = s.start || "";
        document.getElementById("edit-end").value = s.end || "";
        document.getElementById("edit-name").value = s.name || "";
        document.getElementById("edit-grade").value = s.grade || "";
        document.getElementById("edit-subject").value = s.subject || "";
        document.getElementById("edit-topic").value = s.topic || "";
        document.getElementById("edit-feedback").value = s.feedback || "";
        document.getElementById("edit-rate").value = s.rate || "";
        document.getElementById("edit-discount").value = s.discount || 0;

        if (typeof editDialog.showModal === "function") editDialog.showModal();
        else editDialog.classList.remove("hidden");
    }

    if (cancelEditBtn) {
        cancelEditBtn.addEventListener("click", () => {
            if (typeof editDialog.close === "function") editDialog.close();
            else editDialog.classList.add("hidden");
        });
    }

    if (editForm) {
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (currentEditIndex === null || !sessions[currentEditIndex]) return;

            const edited = {
                date: document.getElementById("edit-date").value,
                start: document.getElementById("edit-start").value,
                end: document.getElementById("edit-end").value,
                name: document.getElementById("edit-name").value,
                grade: document.getElementById("edit-grade").value,
                subject: document.getElementById("edit-subject").value,
                topic: document.getElementById("edit-topic").value,
                feedback: document.getElementById("edit-feedback").value,
                rate: parseFloat(document.getElementById("edit-rate").value),
                discount: parseFloat(document.getElementById("edit-discount").value) || 0,
                paid: sessions[currentEditIndex].paid
            };

            sessions[currentEditIndex] = edited;
            saveSessions();
            renderTable(sessions);

            if (typeof editDialog.close === "function") editDialog.close();
            else editDialog.classList.add("hidden");

            if (typeof dialog.close === "function") dialog.close();
            else dialog.classList.add("hidden");
        });
    }

    /* ================================ */
    /* Filters */
    /* ================================ */
    document.getElementById("apply-filters").addEventListener("click", () => {
        let filtered = [...sessions];
        const studentFilter = document.getElementById("filter-student").value.toLowerCase();
        if (studentFilter) filtered = filtered.filter(s => s.name.toLowerCase().includes(studentFilter));
        renderTable(filtered);
    });

    document.getElementById("clear-filters").addEventListener("click", () => {
        document.getElementById("filter-student").value = "";
        renderTable(sessions);
    });

    /* ================================ */
    /* Bulk mark filtered as Paid/Unpaid */
    /* ================================ */
    function updateMarkFilteredButton() {
        const filteredSessions = Array.from(tableBody.querySelectorAll("tr")).map(row => {
            const index = Number(row.querySelector(".paid-checkbox").dataset.index);
            return sessions[index];
        });
        if (filteredSessions.length === 0) return;
        const anyUnpaid = filteredSessions.some(s => !s.paid);
        markFilteredBtn.textContent = anyUnpaid ? "Mark Filtered as Paid" : "Mark Filtered as Unpaid";
    }

    markFilteredBtn.addEventListener("click", () => {
        const filteredSessions = Array.from(tableBody.querySelectorAll("tr")).map(row => {
            const index = Number(row.querySelector(".paid-checkbox").dataset.index);
            return sessions[index];
        });
        if (filteredSessions.length === 0) return;

        const anyUnpaid = filteredSessions.some(s => !s.paid);
        filteredSessions.forEach(s => s.paid = anyUnpaid);

        saveSessions();
        renderTable(filteredSessions);
    });

    /* ================================ */
    /* Initial load */
    /* ================================ */
    loadSessions();
});
