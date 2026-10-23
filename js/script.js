
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const registrationList = document.getElementById("registrationList");
const clearButton = document.getElementById("clearRegistrations");

let registrations = JSON.parse(
    localStorage.getItem("registrations") || "[]"
);

function displayRegistrations() {
    registrationList.replaceChildren();

    if (registrations.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No registrations yet.";
        registrationList.appendChild(item);
        return;
    }

    registrations.forEach(function(registration) {
        const item = document.createElement("li");
        item.textContent =
            registration.name + " - " +
            registration.event + " - " +
            registration.email;
        registrationList.appendChild(item);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const registration = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        event: document.getElementById("event").value,
        source: form.querySelector(
            'input[name="source"]:checked'
        ).value
    };

    registrations.push(registration);

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );

    message.textContent = "Registration successful!";

    form.reset();
    displayRegistrations();
});

clearButton.addEventListener("click", function() {
    registrations = [];
    localStorage.removeItem("registrations");
    message.textContent = "All registrations have been cleared.";
    displayRegistrations();
});

displayRegistrations();
