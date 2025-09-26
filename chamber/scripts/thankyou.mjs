// thankyou.mjs
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    document.getElementById("firstName").textContent = params.get("First_Name") || "Not provided";
    document.getElementById("lastName").textContent = params.get("Last_Name") || "Not provided";
    document.getElementById("email").textContent = params.get("Email") || "Not provided";
    document.getElementById("phone").textContent = params.get("Phone") || "Not provided";
    document.getElementById("business").textContent = params.get("Organization") || "Not provided";
    document.getElementById("timestamp").textContent = params.get("Time_Stamp") || new Date().toLocaleString();
});
