// Authentication Logic

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);

        // Real-time password strength indicator
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }

        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', validatePasswordMatch);
        }
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password strength indicator
function updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthIndicator = document.getElementById('password-strength');
    const strengthText = document.getElementById('strength-text');
    const strengthBar = document.getElementById('strength-bar');

    if (password.length === 0) {
        strengthIndicator.style.display = 'none';
        return;
    }

    strengthIndicator.style.display = 'block';

    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;

    strengthBar.style.width = strength + '%';

    if (strength <= 25) {
        strengthText.textContent = 'Weak';
        strengthBar.className = 'progress-bar bg-danger';
    } else if (strength <= 50) {
        strengthText.textContent = 'Fair';
        strengthBar.className = 'progress-bar bg-warning';
    } else if (strength <= 75) {
        strengthText.textContent = 'Good';
        strengthBar.className = 'progress-bar bg-info';
    } else {
        strengthText.textContent = 'Strong';
        strengthBar.className = 'progress-bar bg-success';
    }
}

// Real-time password match validation
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            confirmPasswordInput.classList.remove('is-invalid');
            confirmPasswordInput.classList.add('is-valid');
        } else {
            confirmPasswordInput.classList.remove('is-valid');
            confirmPasswordInput.classList.add('is-invalid');
        }
    }
}

// Handle Registration with validation
function handleRegister(e) {
    e.preventDefault();

    const form = e.target;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;

    // Reset validation states
    form.classList.remove('was-validated');
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });

    let isValid = true;

    // Validate Name
    if (name === '') {
        document.getElementById('name').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('name').classList.add('is-valid');
    }

    // Validate Email
    const emailInput = document.getElementById('email');
    const emailFeedback = document.getElementById('email-feedback');
    if (!isValidEmail(email)) {
        emailInput.classList.add('is-invalid');
        emailFeedback.textContent = 'Please enter a valid email address (e.g., user@example.com)';
        isValid = false;
    } else {
        emailInput.classList.add('is-valid');
    }

    // Validate Password Length
    const passwordInput = document.getElementById('password');
    const passwordFeedback = document.getElementById('password-feedback');
    if (password.length < 6) {
        passwordInput.classList.add('is-invalid');
        passwordFeedback.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    } else {
        passwordInput.classList.add('is-valid');
    }

    // Validate Password Match
    const confirmPasswordInput = document.getElementById('confirm-password');
    const confirmPasswordFeedback = document.getElementById('confirm-password-feedback');
    if (password !== confirmPassword) {
        confirmPasswordInput.classList.add('is-invalid');
        confirmPasswordFeedback.textContent = 'Passwords do not match.';
        isValid = false;
    } else if (confirmPassword.length >= 6) {
        confirmPasswordInput.classList.add('is-valid');
    }

    // If form is invalid, stop submission
    if (!isValid) {
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        emailInput.classList.add('is-invalid');
        emailFeedback.textContent = 'This email is already registered. Please login or use a different email.';
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password, // In a real app, hash this!
        role
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert(`✅ Registration successful! Welcome, ${name}! Please login to continue.`);
    window.location.href = 'login.html';
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`✅ Welcome back, ${user.name}!`);

        if (user.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'index.html';
        }
    } else {
        alert('❌ Invalid email or password! Please try again.');
    }
}
