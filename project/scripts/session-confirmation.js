document.addEventListener("DOMContentLoaded", () => {
    const confirmationSection = document.getElementById("session-details");
    if (!confirmationSection) return;

    const params = new URLSearchParams(window.location.search);
    
    const sessionData = {
        date: params.get("Date") || "",
        start: params.get("Start") || "",
        end: params.get("End") || "",
        name: params.get("Name") || "",
        grade: params.get("Grade") || "",
        subject: params.get("Subject") === "other"
            ? params.get("Other") || "Other"
            : params.get("Subject") || "",
        topic: params.get("Topic") || "",
        feedback: params.get("Feedback") || "",
        rate: parseFloat(params.get("Rate")) || 0,
        discount: parseFloat(params.get("Discount")) || 0,
        paid: false
    };

    
    for (const [key, value] of Object.entries(sessionData)) {
        if (key === "paid") continue;
        const item = document.createElement("div");
        item.classList.add("confirmation-item");
        item.innerHTML = `<strong>${formatLabel(key)}:</strong> <span>${value || '—'}</span>`;
        confirmationSection.appendChild(item);
    }

    function formatLabel(key) {
        const spaced = key.replace(/([A-Z])/g, ' $1');
        return spaced.charAt(0).toUpperCase() + spaced.slice(1);
    }

    const confirmBtn = document.getElementById("confirmBtn");
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            const existing = JSON.parse(localStorage.getItem("tutorBuddySessions")) || [];

            
            sessionData.Rate = parseFloat(sessionData.Rate) || 0;
            sessionData.Discount = parseFloat(sessionData.Discount) || 0;
            sessionData.paid = false;

            existing.push(sessionData);
            localStorage.setItem("tutorBuddySessions", JSON.stringify(existing));

            alert("✅ Session confirmed and saved!");
            window.location.href = "sessions.html";
        });
    }

    // ============
    // Edit Button
    // ============
    const editBtn = document.getElementById("editBtn");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(sessionData)) {
                params.set(key, value);
            }

            
            window.location.href = `sessions.html?${params.toString()}`;
        });
    }
});
