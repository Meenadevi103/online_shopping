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
        ensureAdmin();
        addProductForm.addEventListener('submit', handleAddProduct);
    }

    const editProductForm = document.getElementById('edit-product-form');
    if (editProductForm) {
        ensureAdmin();
        loadProductForEdit();
        editProductForm.addEventListener('submit', handleEditProduct);
    }
});

// Ensure User is Admin
function ensureAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Access Denied: Admins only.');
        window.location.href = 'index.html';
    }
}

// Seed Initial Products if empty
function seedProducts() {
    if (!localStorage.getItem('products')) {
        const initialProducts = [
            // Electronics
            {
                id: 1,
                name: "Wireless Headphones",
                price: 99.99,
                category: "Electronics",
                description: "High-quality wireless headphones with noise cancellation.",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 2,
                name: "Smart Watch",
                price: 199.50,
                category: "Electronics",
                description: "Track your fitness and stay connected with this smart watch.",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 3,
                name: "Digital Camera",
                price: 450.00,
                category: "Electronics",
                description: "Capture life's moments with stunning clarity.",
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 4,
                name: "Laptop Pro 15",
                price: 1299.99,
                category: "Electronics",
                description: "Powerful laptop for professionals with 16GB RAM and SSD storage.",
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 5,
                name: "Gaming Mouse RGB",
                price: 49.99,
                category: "Electronics",
                description: "Ergonomic gaming mouse with customizable RGB lighting.",
                image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 6,
                name: "Bluetooth Speaker",
                price: 79.99,
                category: "Electronics",
                description: "Portable speaker with 360° sound and 12-hour battery life.",
                image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60"
            },
            // Fashion
            {
                id: 7,
                name: "Denim Jacket",
                price: 89.00,
                category: "Fashion",
                description: "Classic blue denim jacket, perfect for any casual occasion.",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 8,
                name: "White Sneakers",
                price: 69.99,
                category: "Fashion",
                description: "Minimalist white sneakers that go with everything.",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 9,
                name: "Running Shoes",
                price: 79.00,
                category: "Fashion",
                description: "Comfortable running shoes for your daily jog.",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 10,
                name: "Leather Backpack",
                price: 129.99,
                category: "Fashion",
                description: "Premium leather backpack with laptop compartment.",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60"
            },
            // Home & Garden
            {
                id: 11,
                name: "Coffee Maker",
                price: 149.00,
                category: "Home & Garden",
                description: "Programmable coffee maker with thermal carafe and auto-brew.",
                image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 12,
                name: "Indoor Plant Set",
                price: 45.00,
                category: "Home & Garden",
                description: "Collection of 3 low-maintenance indoor plants with ceramic pots.",
                image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 13,
                name: "LED Desk Lamp",
                price: 39.99,
                category: "Home & Garden",
                description: "Adjustable LED desk lamp with USB charging port.",
                image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 14,
                name: "Throw Pillow Set",
                price: 34.99,
                category: "Home & Garden",
                description: "Set of 4 decorative throw pillows in modern colors.",
                image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&auto=format&fit=crop&q=60"
            },
            // Sports
            {
                id: 15,
                name: "Yoga Mat Premium",
                price: 54.99,
                category: "Sports",
                description: "Extra thick yoga mat with carrying strap and alignment guides.",
                image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 16,
                name: "Dumbbell Set",
                price: 89.99,
                category: "Sports",
                description: "Adjustable dumbbell set, 5-25 lbs with storage rack.",
                image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 17,
                name: "Basketball Official",
                price: 29.99,
                category: "Sports",
                description: "Official size basketball with superior grip and durability.",
                image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500&auto=format&fit=crop&q=60"
            },
            {
                id: 18,
                name: "Resistance Bands",
                price: 24.99,
                category: "Sports",
                description: "Set of 5 resistance bands with different strength levels.",
                image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&auto=format&fit=crop&q=60"
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
function renderProducts(categoryFilter = 'all') {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const container = document.getElementById('product-list');
    container.innerHTML = '';

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = currentUser && currentUser.role === 'admin';

    // Filter products by category
    const filteredProducts = categoryFilter === 'all'
        ? products
        : products.filter(p => p.category === categoryFilter);

    if (filteredProducts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No products found in this category.</p></div>';
        return;
    }

    filteredProducts.forEach(product => {
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
            <div class="card h-100 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-primary mb-2 align-self-start">${product.category || 'General'}</span>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-muted fw-bold">$${parseFloat(product.price).toFixed(2)}</p>
                    <p class="card-text flex-grow-1 small">${product.description.substring(0, 60)}...</p>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary mt-auto">Add to Cart</button>
                    ${adminButtons}
                </div>
            </div>
        </div>
    `;
}

// Filter Products by Category
function filterProducts(category) {
    // Update active button state
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Re-render products with filter
    renderProducts(category);
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
    const category = document.getElementById('product-category').value;
    const image = document.getElementById('product-image').value;
    const desc = document.getElementById('product-desc').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newProduct = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        category,
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
        document.getElementById('product-category').value = product.category || 'Electronics';
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
    const category = document.getElementById('product-category').value;
    const image = document.getElementById('product-image').value;
    const desc = document.getElementById('product-desc').value;

    let products = JSON.parse(localStorage.getItem('products')) || [];
    const index = products.findIndex(p => p.id == id);

    if (index !== -1) {
        products[index] = {
            id: parseInt(id),
            name,
            price: parseFloat(price),
            category,
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
