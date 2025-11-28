// Cart Logic

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

// Render Cart Items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center py-4">Your cart is empty.</td></tr>';
        updateTotals(0);
        return;
    }

    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;

            cartItemsContainer.innerHTML += `
                <tr>
                    <td class="ps-4">
                        <div class="d-flex align-items-center">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid rounded me-3" style="width: 60px; height: 60px; object-fit: cover;">
                            <div>
                                <h6 class="mb-0">${product.name}</h6>
                            </div>
                        </div>
                    </td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>
                        <div class="input-group input-group-sm" style="width: 100px;">
                             <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, -1)">-</button>
                             <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                             <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button onclick="removeFromCart(${index})" class="btn btn-sm btn-outline-danger">
                            <span class="material-icons" style="font-size: 1.2rem;">delete</span>
                        </button>
                    </td>
                </tr>
            `;
        }
    });

    updateTotals(subtotal);
}

// Update Totals
function updateTotals(subtotal) {
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1; // Minimum 1
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount(); // From main.js
    }
}

// Remove from Cart
function removeFromCart(index) {
    if (confirm('Remove this item from cart?')) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount(); // From main.js
    }
}

// Checkout
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    if (confirm('Proceed to checkout? Total: ' + document.getElementById('cart-total').textContent)) {
        localStorage.removeItem('cart');
        alert('Order placed successfully! Thank you for shopping with us.');
        window.location.href = 'index.html';
    }
}
