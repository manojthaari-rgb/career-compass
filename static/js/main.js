// ========================================
// CAREER COMPASS - MAIN JAVASCRIPT
// ========================================

function startSurvey() {
    window.location.href = "register.html";
}


// ========================================
// STUDENT REGISTRATION
// ========================================

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {

    registrationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const student = {
            fullName: document.getElementById("fullName").value.trim(),
            email: document.getElementById("email").value.trim(),
            city: document.getElementById("city").value.trim(),
            state: document.getElementById("state").value.trim(),
            country: document.getElementById("country").value,
            privacyConsent: document.getElementById("privacy").checked
        };

        // Store information temporarily in this browser session
        sessionStorage.setItem(
            "careerCompassStudent",
            JSON.stringify(student)
        );

        document.getElementById("formMessage").textContent =
            "Registration successful! Let's begin your assessment.";

        setTimeout(function() {
            window.location.href = "templates/assessment.html";
        }, 1000);

    });

}