export function initFormValidation() {
    const inputs = document.querySelectorAll("#form input, #form textarea");

    inputs.forEach(input => {
        input.addEventListener("input", () => {
            if (input.value.trim() === "") {
                input.classList.remove("valid", "invalid");
                input.classList.add("empty");
            } else if (input.checkValidity()) {
                input.classList.add("valid");
                input.classList.remove("invalid", "empty");
            } else {
                input.classList.add("invalid");
                input.classList.remove("valid", "empty");
            }
        });

        input.addEventListener("blur", () => {
            if (input.value.trim() === "") {
                input.classList.remove("valid", "invalid");
                input.classList.add("empty");
            }
        });
    });
}
