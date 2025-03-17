document.addEventListener("DOMContentLoaded", () => {
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update cart display
    const updateCartDisplay = () => {
        const cartIcon = document.querySelector(".cart span");
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
        cartIcon.textContent = `৳ ${totalPrice}`;
    };

    // Function to add item to cart
    const addToCart = (name, price, quantity) => {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    // Event listener for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            const quantityInput = button.closest(".product-item").querySelector(".quantity");
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            
            addToCart(name, price, quantity);
            alert(`${name} has been added to your cart!`);
        });
    });

    // Initial cart display
    updateCartDisplay();
});
