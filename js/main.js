// Main JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    // Redirect to login if not authenticated and on index page
    const currentPage = window.location.pathname;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }
    }

    updateAuthLinks();
    updateCartCount();
});

// Function to update Navbar based on Auth State
function updateAuthLinks() {
    const authLinks = document.getElementById('auth-links');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        authLinks.innerHTML = `
            <li class="nav-item"><span class="nav-link text-white">Welcome, ${currentUser.name}</span></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
        `;

        // If admin, add admin links
        if (currentUser.role === 'admin') {
            authLinks.innerHTML = `
                <li class="nav-item"><a class="nav-link text-warning fw-bold" href="admin-dashboard.html">Admin Dashboard</a></li>
                ${authLinks.innerHTML}
             `;
        }

    } else {
        authLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
        `;
    }
}

// Function to update Cart Count in Navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Calculate total quantity
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalCount;
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
