const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const registrationList = document.getElementById("registrationList");
const clearButton = document.getElementById("clearRegistrations");

function loadRegistrations() {
    try {
        const savedData = localStorage.getItem("registrations");
        const parsedData = JSON.parse(savedData || "[]");

        return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
        return [];
    }
}

let registrations = loadRegistrations();

function saveRegistrations() {
    try {
        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );
        return true;
    } catch (error) {
        message.textContent =
            "Unable to save registration. Please check your browser storage.";
        return false;
    }
}

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

    const selectedSource = form.querySelector(
        'input[name="source"]:checked'
    );

    if (!selectedSource) {
        message.textContent = "Please select how you heard about our club.";
        return;
    }

    const registration = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        event: document.getElementById("event").value,
        source: selectedSource.value
    };

    registrations.push(registration);

    if (!saveRegistrations()) {
        registrations.pop();
        return;
    }

    message.textContent = "Registration successful!";

    form.reset();
    displayRegistrations();
});

clearButton.addEventListener("click", function() {
    if (registrations.length === 0) {
        message.textContent = "There are no registrations to clear.";
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to clear all registrations?"
    );

    if (!confirmed) {
        return;
    }

    const previousRegistrations = registrations;
    registrations = [];

    if (!saveRegistrations()) {
        registrations = previousRegistrations;
        return;
    }

    message.textContent = "All registrations have been cleared.";
    displayRegistrations();
});

displayRegistrations();