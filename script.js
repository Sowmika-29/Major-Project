
function validateForm(event) {
    
    event.preventDefault();
    let isValid = true;

    
    document.querySelectorAll('.text-danger').forEach((element) => {
        element.innerHTML = '';
    });

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate Full Name (at least 5 characters)
    if (fullName.length < 5) {
        document.getElementById('fullNameError').innerHTML = 'Full name must be at least 5 characters.';
        isValid = false;
    }

    // Validate Email (should contain '@')
    if (!email.includes('@')) {
        document.getElementById('emailError').innerHTML = 'Enter a valid email.';
        isValid = false;
    }

    // Validate Phone Number (must be a 10-digit number and not 123456789)
    if (!/^\d{10}$/.test(phone) || phone === '1234567890') {
        document.getElementById('phoneError').innerHTML = 'Enter a valid 10-digit phone number.';
        isValid = false;
    }

    // Validate Password (at least 8 characters and not "password" or user's name)
    if (password.length < 8 || password === 'password' || password.toLowerCase() === fullName.toLowerCase()) {
        document.getElementById('passwordError').innerHTML = 'Password must be at least 8 characters and not "password" or your name.';
        isValid = false;
    }

    // Validate Confirm Password (should match Password)
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerHTML = 'Passwords do not match.';
        isValid = false;
    }

    // If the form is valid, submit data to Google Sheets
    if (isValid) {
        submitToGoogleSheets(fullName, email, phone, password);
    }

    return isValid;
}

// Function to submit form data to Google Sheets
function submitToGoogleSheets(fullName, email, phone, password) {
    const url = 'https://script.google.com/macros/s/AKfycbzQjzUGK_Lr7Ulshbbt4R2QWZ9yZFKsDwkidFPVd112q_uqUiMMRSwmfAgPn6nsuYNL/exec';
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        alert('Form submitted successfully!');
        // Optionally, clear the form
        document.getElementById('registrationForm').reset();
    })
    .catch((error) => {
        alert('There was an error submitting the form.');
    });
}
