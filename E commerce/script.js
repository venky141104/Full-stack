// Sample products data
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
        description: "A powerful laptop for all your computing needs."
    },
    {
        id: 2,
        name: "Smartphone",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
        description: "Latest smartphone with advanced features."
    },
    {
        id: 3,
        name: "Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
        description: "High-quality wireless headphones."
    },
    {
        id: 4,
        name: "Tablet",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
        description: "Portable tablet for work and entertainment."
    },
    {
        id: 5,
        name: "Smart Watch",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
        description: "Stay connected with this smart watch."
    },
    {
        id: 6,
        name: "Keyboard",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=200&fit=crop",
        description: "Mechanical keyboard for gaming and typing."
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    alert('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            displayCart();
        }
    }
}

function displayProducts(containerId, productsToDisplay) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            <a href="product.html?id=${product.id}" class="btn">View Details</a>
        </div>
    `).join('');
}

function displayProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        const container = document.getElementById('product-details');
        container.innerHTML = `
            <div class="product-details">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    }
}

function displayCart() {
    const container = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    if (!container || !totalContainer) return;

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        totalContainer.innerHTML = '';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalContainer.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
}

// Initialize pages
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('featured-products')) {
        displayProducts('featured-products', products.slice(0, 3));
    }

    if (document.getElementById('products-list')) {
        displayProducts('products-list', products);
    }

    if (document.getElementById('product-details')) {
        displayProductDetails();
    }

    if (document.getElementById('cart-items')) {
        displayCart();
    }

    // Checkout functionality (placeholder)
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Checkout functionality would be implemented here.');
        });
    }
});