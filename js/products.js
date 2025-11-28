// Product Management Logic

document.addEventListener('DOMContentLoaded', () => {
    seedProducts();

    // Check which page we are on
    if (document.getElementById('featured-products')) {
        renderFeaturedProducts();
    }

    if (document.getElementById('product-list')) {
        renderProducts();
        checkAdminPermissions();
    }

    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }

    const editProductForm = document.getElementById('edit-product-form');
    if (editProductForm) {
        loadProductForEdit();
        editProductForm.addEventListener('submit', handleEditProduct);
    }
});

// Seed Initial Products if empty
function seedProducts() {
    if (!localStorage.getItem('products')) {
        const initialProducts = [
            {
                id: 1,
                name: "Wireless Headphones",
                price: 99.99,
                description: "High-quality wireless headphones with noise cancellation.",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 2,
                name: "Smart Watch",
                price: 199.50,
                description: "Track your fitness and stay connected with this smart watch.",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 3,
                name: "Running Shoes",
                price: 79.00,
                description: "Comfortable running shoes for your daily jog.",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 4,
                name: "Digital Camera",
                price: 450.00,
                description: "Capture life's moments with stunning clarity.",
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60"
            }
        ];
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
}

// Render Featured Products (Home Page)
function renderFeaturedProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const container = document.getElementById('featured-products');
    container.innerHTML = '';

    // Show first 4 products
    products.slice(0, 4).forEach(product => {
        container.innerHTML += createProductCard(product, false);
    });
}

// Render All Products (Product Page)
function renderProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const container = document.getElementById('product-list');
    container.innerHTML = '';

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = currentUser && currentUser.role === 'admin';

    products.forEach(product => {
        container.innerHTML += createProductCard(product, isAdmin);
    });
}

// Create Product Card HTML
function createProductCard(product, isAdmin) {
    let adminButtons = '';
    if (isAdmin) {
        adminButtons = `
            <div class="mt-2">
                <a href="edit-product.html?id=${product.id}" class="btn btn-sm btn-warning text-white">Edit</a>
                <button onclick="deleteProduct(${product.id})" class="btn btn-sm btn-danger">Delete</button>
            </div>
        `;
    }

    return `
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-muted">$${parseFloat(product.price).toFixed(2)}</p>
                    <p class="card-text flex-grow-1">${product.description.substring(0, 60)}...</p>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary mt-auto">Add to Cart</button>
                    ${adminButtons}
                </div>
            </div>
        </div>
    `;
}

// Check Admin Permissions to show Add Button
function checkAdminPermissions() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role === 'admin') {
        const addBtn = document.getElementById('add-product-btn');
        if (addBtn) addBtn.classList.remove('d-none');
    }
}

// Handle Add Product
function handleAddProduct(e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;
    const desc = document.getElementById('product-desc').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newProduct = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        image,
        description: desc
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    alert('Product added successfully!');
    window.location.href = 'products.html';
}

// Load Product for Edit
function loadProductForEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) return;

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id == productId);

    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-desc').value = product.description;
    }
}

// Handle Edit Product
function handleEditProduct(e) {
    e.preventDefault();

    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;
    const desc = document.getElementById('product-desc').value;

    let products = JSON.parse(localStorage.getItem('products')) || [];
    const index = products.findIndex(p => p.id == id);

    if (index !== -1) {
        products[index] = {
            id: parseInt(id),
            name,
            price: parseFloat(price),
            image,
            description: desc
        };
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product updated successfully!');
        window.location.href = 'products.html';
    }
}

// Delete Product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(); // Re-render
    }
}

// Add to Cart (Placeholder for now, will be implemented in cart.js but called here)
function addToCart(productId) {
    // We will implement this in cart.js, but since cart.js might not be loaded on all pages yet,
    // we can put a simple version here or ensure cart.js is loaded.
    // For better structure, let's put the logic here or in a shared utility if we want.
    // But wait, I planned `cart.js`. Let's put it there and ensure `cart.js` is included.
    // However, `addToCart` is called from `products.js` generated HTML.
    // I'll add the logic here for simplicity or dispatch a custom event.
    // Let's just add it here to avoid dependency issues for now.

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login to add items to cart.');
        window.location.href = 'login.html';
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // From main.js
    alert('Product added to cart!');
}
