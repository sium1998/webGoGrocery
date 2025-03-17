// Initialize Cart from Local Storage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart in Local Storage
const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Add Product to Cart
const addToCart = (productName, quantity, price) => {
    const itemIndex = cart.findIndex((item) => item.name === productName);
    if (itemIndex > -1) {
        // Update quantity if item already exists in cart
        cart[itemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({ name: productName, quantity, price });
    }
    saveCart();
    alert(`Added ${quantity} x ${productName} to your cart.`);
    updateCartDisplay();
};

// Update Cart Icon Display in Header
const updateCartDisplay = () => {
    const cartElement = document.querySelector('.cart span');
    if (cartElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartElement.textContent = `৳ ${totalItems}`;
    }
};

// Render Cart on Cart Page
const renderCart = () => {
    const cartContainer = document.getElementById('cart-items');
    const cartTotals = document.getElementById('cart-totals');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    // Clear current cart display
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartTotals.style.display = 'none';
        return;
    }

    emptyCartMessage.style.display = 'none';
    cartTotals.style.display = 'block';

    let subtotal = 0;

    // Render each cart item
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-price">৳ ${item.price.toFixed(2)} x ${item.quantity}</span>
                <span class="item-total">৳ ${itemTotal.toFixed(2)}</span>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Update subtotal and total in cart
    document.getElementById('subtotal').textContent = `৳ ${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `৳ ${(subtotal * 1.05).toFixed(2)}`; // Example 5% tax

    // Add event listeners for "Remove" buttons
    document.querySelectorAll('.remove-item').forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeCartItem(index);
        });
    });
};

// Remove Item from Cart
const removeCartItem = (index) => {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartDisplay();
};

// Clear Cart
const clearCart = () => {
    cart.length = 0;
    saveCart();
    renderCart();
    updateCartDisplay();
};

// Load Cart Data on Page Load and Render if on Cart Page
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        renderCart();

        // Add Clear Cart button functionality if on cart page
        const clearCartButton = document.getElementById('clear-cart');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', clearCart);
        }
    }
    updateCartDisplay();
});

// Dark Mode / Light Mode Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const setTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.src = 'images/dark-mode.png';
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.src = 'images/light-mode.png';
    }
};

themeToggle?.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// On page load, set theme based on saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Search Functionality
document.querySelector('.search-button').addEventListener('click', () => {
    const query = document.querySelector('.search-bar input').value.trim();
    if (query) {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    } else {
        alert('Please enter a search term.');
    }
});

// Handle Enter key for search
document.querySelector('.search-bar input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.querySelector('.search-button').click();
    }
});

// Account, Wishlist, and Cart Navigation
const navigate = (selector, page) => {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener('click', () => {
            window.location.href = page;
        });
    }
};

navigate('.account', 'account.html');
navigate('.wishlist', 'wishlist.html');
navigate('.cart', 'cart.html');

// Functionality to Add Items to Cart from Product Pages
document.querySelectorAll('.product-item button').forEach((button) => {
    button.addEventListener('click', () => {
        const productName = button.parentElement.querySelector('h3').innerText;
        const quantity = parseInt(button.parentElement.querySelector('input[type="number"]').value, 10) || 1;
        const price = parseFloat(button.parentElement.querySelector('.price').innerText.replace('৳ ', ''));
        addToCart(productName, quantity, price);
    });
});

// Optional: Handle Contact Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you shortly.');
        contactForm.reset();
    });
}

