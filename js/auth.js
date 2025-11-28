// Authentication Logic

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

// Handle Registration
function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert("Email already registered!");
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

    alert("Registration successful! Please login.");
    window.location.href = 'login.html';
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Welcome back, ${user.name}!`);
        window.location.href = 'index.html';
    } else {
        alert("Invalid email or password!");
    }
}
