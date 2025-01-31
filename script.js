let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        const productName = e.target.getAttribute('data-name');
        const productPrice = parseFloat(e.target.getAttribute('data-price'));

        // Add product to cart
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    });
});

document.getElementById('cartButton').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'flex';
});

document.getElementById('closeCartButton').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});

document.getElementById('checkoutButton').addEventListener('click', () => {
    alert('Proceeding to checkout...');
    cart = [];
    updateCart();
    document.getElementById('cartModal').style.display = 'none';
});

function updateCart() {
    // Update the cart count
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;

    // Update the cart modal
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}
