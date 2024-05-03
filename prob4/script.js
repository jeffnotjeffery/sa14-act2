document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Reset error messages
        clearErrors();

        // Validate username
        const usernameInput = document.getElementById('username');
        const username = usernameInput.value.trim();
        if (username.length < 6) {
            displayError(usernameInput, 'Username must be at least 6 characters');
            return;
        }

        // Validate email
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayError(emailInput, 'Invalid email format');
            return;
        }

        // Validate password
        const passwordInput = document.getElementById('password');
        const password = passwordInput.value.trim();
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            displayError(passwordInput, 'Password must be at least 8 characters long and contain at least one capital letter and one number');
            return;
        }

        // If all validations pass, submit the form
        registrationForm.submit();
    });

    // Function to display error message for input field
    function displayError(input, message) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
    }

    // Function to clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error');
        errorMessages.forEach(function(error) {
            error.textContent = '';
        });
    }
});
