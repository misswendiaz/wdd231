// thankyou.mjs
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    document.getElementById("firstName").textContent = params.get("First_Name") || "Not provided";
    document.getElementById("lastName").textContent = params.get("Last_Name") || "Not provided";
    document.getElementById("organizationalTitle").textContent = params.get("Title") || "Not provided";
    document.getElementById("email").textContent = params.get("Email") || "Not provided";
    document.getElementById("phone").textContent = params.get("Phone") || "Not provided";
    document.getElementById("business").textContent = params.get("Organization") || "Not provided";
    document.getElementById("description").textContent = params.get("Description") || "Not provided";
    document.getElementById("membershipLevel").textContent = params.get("Membership") || "Not provided";
    document.getElementById("timeStamp").textContent = params.get("Time_Stamp") || new Date().toLocaleString();
});
