# ShopEasy - Online Shopping Website

A responsive and dynamic online shopping website developed using HTML, CSS, Bootstrap 5, JavaScript, and LocalStorage.

## Features

-   **User Authentication**: Login and Registration for Users and Admins.
-   **Product Management**: Admin can Add, Edit, and Delete products.
-   **Shopping Cart**: Users can add items to the cart, update quantities, and checkout.
-   **Responsive Design**: Optimized for mobile and desktop using Bootstrap 5.
-   **Data Persistence**: Uses LocalStorage to save users, products, and cart data.

## Technologies Used

-   **HTML5 & CSS3**: Structure and Styling.
-   **Bootstrap 5**: Layout and Components (Navbar, Cards, Modals).
-   **Material Design**: Icons and visual aesthetics (Shadows, Buttons).
-   **JavaScript (ES6)**: Logic for Auth, CRUD, and Cart.
-   **LocalStorage**: Client-side database.

## Pages

1.  **Home Page (`index.html`)**: Landing page with featured products and hero section.
2.  **Login (`login.html`)**: User authentication page.
3.  **Register (`register.html`)**: User registration page with role selection.
4.  **Products (`products.html`)**: Displays all products. Admins see "Add Product" and "Edit/Delete" buttons.
5.  **Add Product (`add-product.html`)**: Admin-only page to create new products.
6.  **Edit Product (`edit-product.html`)**: Admin-only page to update existing products.
7.  **Cart (`cart.html`)**: Shopping cart with total calculation and checkout.

## How to Run

1.  Clone the repository or download the source code.
2.  Open `index.html` in any modern web browser.
3.  **Register** a new account (Select 'Admin' role to test admin features).
4.  **Login** with your credentials.
5.  Start shopping or managing products!

## LocalStorage Data Structure

-   `users`: Array of user objects `{id, name, email, password, role}`.
-   `products`: Array of product objects `{id, name, price, description, image}`.
-   `cart`: Array of cart items `{productId, quantity}`.
