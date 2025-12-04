// Admin Dashboard Logic

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAccess();
    loadDashboardStats();
    loadRecentProducts();
    loadAllProducts();
    loadUsers();
});

// Check if user is admin
function checkAdminAccess() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Access Denied: Admins only.');
        window.location.href = 'index.html';
    }
}

// Load Dashboard Stats
function loadDashboardStats() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Count unique categories
    const categories = new Set(products.map(p => p.category));

    document.getElementById('total-products').textContent = products.length;
    document.getElementById('total-users').textContent = users.length;
    document.getElementById('total-categories').textContent = categories.size;
}

// Load Recent Products (Top 5)
function loadRecentProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const recentProducts = products.slice(-5).reverse(); // Last 5 added
    const tbody = document.getElementById('recent-products-table');
    tbody.innerHTML = '';

    recentProducts.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;"></td>
            <td>${product.name}</td>
            <td><span class="badge bg-secondary">${product.category}</span></td>
            <td>$${parseFloat(product.price).toFixed(2)}</td>
            <td>
                <a href="edit-product.html?id=${product.id}" class="btn btn-sm btn-outline-primary"><span class="material-icons" style="font-size: 16px;">edit</span></a>
                <button onclick="deleteProductAdmin(${product.id})" class="btn btn-sm btn-outline-danger"><span class="material-icons" style="font-size: 16px;">delete</span></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Load All Products for Management
function loadAllProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tbody = document.getElementById('all-products-table');
    tbody.innerHTML = '';

    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
            <td>
                <div class="fw-bold">${product.name}</div>
                <div class="text-muted small">ID: ${product.id}</div>
            </td>
            <td><span class="badge bg-info text-dark">${product.category}</span></td>
            <td>$${parseFloat(product.price).toFixed(2)}</td>
            <td>
                <a href="edit-product.html?id=${product.id}" class="btn btn-sm btn-primary">Edit</a>
                <button onclick="deleteProductAdmin(${product.id})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Load Users
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.getElementById('users-table');
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}">${user.role}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Delete Product (Admin version)
function deleteProductAdmin(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));

        // Refresh tables and stats
        loadDashboardStats();
        loadRecentProducts();
        loadAllProducts();
        alert('Product deleted successfully.');
    }
}

// Show/Hide Sections
function showSection(sectionId) {
    // Hide all sections
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('products-section').style.display = 'none';
    document.getElementById('users-section').style.display = 'none';

    // Show selected section
    document.getElementById(`${sectionId}-section`).style.display = 'block';

    // Update active nav link
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}
