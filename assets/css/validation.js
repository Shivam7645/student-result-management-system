document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        // Get form field values
        const regNo = document.getElementById('reg-no').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const year = document.getElementById('year').value;
        const gender = document.querySelector('input[name="gender"]:checked');

        // Validation flags
        let isValid = true;
        let errorMessage = '';

        // Validate registration number (non-empty, alphanumeric)
        if (!/^\w+$/.test(regNo)) {
            isValid = false;
            errorMessage += 'Registration number should be alphanumeric.\n';
        }

        // Validate name (non-empty, alphabetic characters)
        if (!/^[A-Za-z\s]+$/.test(name)) {
            isValid = false;
            errorMessage += 'Name should contain only alphabetic characters.\n';
        }

        // Validate phone number (10 digits)
        if (!/^\d{10}$/.test(phone)) {
            isValid = false;
            errorMessage += 'Phone number should be exactly 10 digits.\n';
        }

        // Validate password (non-empty, at least 6 characters)
        if (password.length < 6) {
            isValid = false;
            errorMessage += 'Password must be at least 6 characters long.\n';
        }

        // Confirm passwords match
        if (password !== confirmPassword) {
            isValid = false;
            errorMessage += 'Passwords do not match.\n';
        }

        // Validate year of study (required)
        if (!year) {
            isValid = false;
            errorMessage += 'Please select your year of study.\n';
        }

        // Validate gender (radio button selected)
        if (!gender) {
            isValid = false;
            errorMessage += 'Please select your gender.\n';
        }

        // If validation fails, prevent form submission and alert errors
        if (!isValid) {
            alert(errorMessage);
            event.preventDefault();
        }
    });
});
