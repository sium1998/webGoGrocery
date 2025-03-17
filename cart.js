// Initialize Cart from Local Storage or Set to Empty
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save Cart to Local Storage
const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Store the updated cart data
};

// Add Product to Cart (Used from Product Pages)
const addToCart = (productName, quantity, price, imageUrl) => {
    const itemIndex = cart.findIndex((item) => item.name === productName);
    if (itemIndex > -1) {
        // Update quantity if item already exists in cart
        cart[itemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({ name: productName, quantity, price, imageUrl });
    }
    saveCart(); // Save the updated cart
    alert(`Added ${quantity} x ${productName} to your cart.`); // Alert the user
    updateCartDisplay(); // Update cart display
};

// Update Header Cart Icon (Optional)
const updateCartDisplay = () => {
    const cartElement = document.querySelector('.cart span');
    if (cartElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartElement.textContent = `${totalItems}`; // Update the cart icon with the number of items
    }
};

// Render Cart on the Cart Page
const renderCart = () => {
    const cartContainer = document.getElementById('cart-items');
    const cartTotals = document.getElementById('cart-totals');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    // Clear current cart content
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        // If the cart is empty
        emptyCartMessage.style.display = 'block';
        cartTotals.style.display = 'none';
        document.getElementById('subtotal').textContent = `৳ 0.00`;
        document.getElementById('total').textContent = `৳ 0.00`;
        return;
    }

    // If the cart has items
    emptyCartMessage.style.display = 'none';
    cartTotals.style.display = 'block';

    let subtotal = 0;

    // Render each item in the cart
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.imageUrl}" alt="${item.name}" width="50" height="50" />
            </div>
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-price">৳ ${item.price.toFixed(2)} x ${item.quantity}</span>
                <span class="item-total">৳ ${itemTotal.toFixed(2)}</span>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Update Subtotal and Total
    document.getElementById('subtotal').textContent = `৳ ${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `৳ ${(subtotal * 1.05).toFixed(2)}`; // Example 5% tax

    // Add event listeners to "Remove" buttons
    document.querySelectorAll('.remove-item').forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeCartItem(index);
        });
    });
};

// Remove a Specific Item from the Cart
const removeCartItem = (index) => {
    // Ensure we remove the correct item
    if (index !== undefined) {
        cart.splice(index, 1); // Remove the item from the cart at the correct index
        saveCart(); // Save the updated cart to localStorage
        renderCart(); // Re-render the cart with the updated list of items
        updateCartDisplay(); // Update the cart icon in the header

        // Refresh the page after a short delay (0.5 seconds)
        setTimeout(() => {
            window.location.reload(); // Refresh the page to reflect changes
        }, 500); // 500 milliseconds delay
    }
};





// Clear the Entire Cart
const clearCart = () => {
    cart.length = 0; // Empty the cart
    saveCart(); // Save the empty cart to localStorage
    window.location.reload(); // Refresh the page to show "Your cart is currently empty."
};

// Handle "Continue Order" Button (Redirect to Order Page)
const continueOrder = () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before continuing.');
        return;
    }
    window.location.href = 'order.html'; // Redirect to the order page
};

// Add Event Listeners on Page Load
window.addEventListener('DOMContentLoaded', () => {
    // Render the cart if on the cart page
    if (document.getElementById('cart-items')) {
        renderCart();

        // Attach Clear Cart button functionality
        const clearCartButton = document.getElementById('clear-cart');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', clearCart);
        }

        // Attach Continue Order button functionality
        const continueOrderButton = document.getElementById('continue-order');
        if (continueOrderButton) {
            continueOrderButton.addEventListener('click', continueOrder);
        }
    }

    // Update header cart display
    updateCartDisplay();
});
