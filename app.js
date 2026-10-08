function setError(id, message) {
    const errorElement = document.getElementById(id);
    const field = document.getElementById(id.replace('Error', ''));

    if (errorElement) {
        errorElement.textContent = message;
    }

    if (field) {
        field.classList.toggle('is-invalid', Boolean(message));
    }
}

function clearErrors() {
    const errorIds = [
        'nameError',
        'emailError',
        'phoneError',
        'passwordError',
        'confirmError',
        'genderError',
        'cityError',
        'termsError'
    ];

    errorIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = '';
        }
    });

    ['name', 'email', 'phone', 'password', 'confirmPassword', 'city'].forEach((id) => {
        const field = document.getElementById(id);
        if (field) {
            field.classList.remove('is-invalid');
        }
    });
}

function updatePasswordStrength() {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strengthBar');
    const value = passwordInput.value;

    let strength = 0;
    if (value.length >= 6) strength += 1;
    if (value.length >= 10) strength += 1;
    if (/[A-Z]/.test(value) && /[0-9]/.test(value)) strength += 1;
    if (/[^A-Za-z0-9]/.test(value)) strength += 1;

    const widths = ['0%', '25%', '50%', '75%', '100%'];
    const colors = ['#ff6b81', '#fbbf24', '#f59e0b', '#22d3ee', '#4ade80'];

    strengthBar.style.width = widths[strength];
    strengthBar.style.background = colors[strength];
}

function validateForm() {
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    const city = document.getElementById('city').value;
    const terms = document.getElementById('terms').checked;
    const gender = document.querySelector('input[name="gender"]:checked');

    let valid = true;

    if (!name) {
        setError('nameError', 'Please enter your full name.');
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!email) {
        setError('emailError', 'Email is required.');
        valid = false;
    } else if (!emailPattern.test(email)) {
        setError('emailError', 'Please enter a valid email address.');
        valid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phone) {
        setError('phoneError', 'Phone number is required.');
        valid = false;
    } else if (!phonePattern.test(phone)) {
        setError('phoneError', 'Enter a valid 10-digit phone number.');
        valid = false;
    }

    if (!password) {
        setError('passwordError', 'Password is required.');
        valid = false;
    } else if (password.length < 6) {
        setError('passwordError', 'Password must be at least 6 characters.');
        valid = false;
    }

    if (!confirm) {
        setError('confirmError', 'Please confirm your password.');
        valid = false;
    } else if (password !== confirm) {
        setError('confirmError', 'Passwords do not match.');
        valid = false;
    }

    if (!gender) {
        setError('genderError', 'Please select your gender.');
        valid = false;
    }

    if (!city) {
        setError('cityError', 'Please select a city.');
        valid = false;
    }

    if (!terms) {
        setError('termsError', 'You must agree to the Terms & Conditions.');
        valid = false;
    }

    if (valid) {
        alert('Registration successful! Welcome aboard.');
    }

    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            validateForm();
        });
    }

    ['name', 'email', 'phone', 'password', 'confirmPassword', 'city'].forEach((id) => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('input', () => {
                if (field.value.trim() !== '') {
                    field.classList.remove('is-invalid');
                }
            });
        }
    });

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }
});
