let products = [];

// Fetch products from JSON file
fetch("products.json")
  .then(response => response.json())
  .then(data => {
      products = data;
      showProducts(products); // Display all products initially
  })
  .catch(error => console.error("Error loading products:", error));

const cart = {};

// Add to cart function
const addToCart = (id) => {
    if (cart[id]) {
        cart[id]++; // Increase quantity if already in cart
    } else {
        cart[id] = 1; // Add new item to cart
    }
    showCart();
};

// Increment item quantity in cart
const increment = (id) => {
    cart[id]++;
    showCart();
};

// Decrement item quantity in cart
const decrement = (id) => {
    if (cart[id] > 1) {
        cart[id]--;
    } else {
        delete cart[id]; // Remove item if quantity reaches 0
    }
    showCart();
};

// Display the cart
const displayCart = () => {
    document.getElementById("cartBox").style.display = "block";
    document.getElementById("productBox").style.display = "none";
};

// Hide the cart
const hideCart = () => {
    document.getElementById("cartBox").style.display = "none";
    document.getElementById("productBox").style.display = "block";
};

// Remove item from cart
const deleteCart = (id) => {
    delete cart[id];
    showCart();
};

// Calculate total order value
const showTotal = () => {
    let total = products.reduce((sum, product) => {
        return sum + (product.price * (cart[product.id] || 0));
    }, 0);
    document.getElementById("order").innerHTML = total.toFixed(2);
};

// Display cart items
const showCart = () => {
    let count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    document.getElementById("items").innerHTML = count;

    let cartHTML = "";
    products.forEach((product) => {
        if (cart[product.id]) {
            cartHTML += `
            <div class="cart-item">
                <img src="${product.url}" alt="${product.name}" class="cart-img">
                <div class="cart-details">
                    <h4>${product.name}</h4>
                    <p>Price: $${product.price}</p>
                    <div class="cart-controls">
                        <button onclick='decrement(${product.id})'>-</button>
                        <span>${cart[product.id]}</span>
                        <button onclick='increment(${product.id})'>+</button>
                    </div>
                    <p>Total: $${(product.price * cart[product.id]).toFixed(2)}</p>
                    <button onclick='deleteCart(${product.id})' class="delete-btn">Remove</button>
                </div>
            </div>`;
        }
    });

    document.getElementById("divCart").innerHTML = cartHTML || "<p>Your cart is empty.</p>";
    showTotal();
};

// Function to display products
const showProducts = (filteredProducts) => {
    let productsHTML = "<div class='row'>";
    filteredProducts.forEach((product) => {
        productsHTML += `
        <div class='box'>
            <img src='${product.url}' alt='${product.name}'>
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <h4>$${product.price.toFixed(2)}</h4>
            <button onclick='addToCart(${product.id})'>Add to Cart</button>
        </div>`;
    });
    document.getElementById("divProducts").innerHTML = productsHTML + "</div>";
};

// Search function
function searchProducts() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(input)
    );

    // Show search results or all products if empty
    if (filteredProducts.length > 0) {
        showProducts(filteredProducts);
    } else {
        document.getElementById("divProducts").innerHTML = "<p>No products found.</p>";
    }
}

// Clear search function
function clearSearch() {
    document.getElementById("searchBox").value = "";
    showProducts(products); // Show all products again
}

// Toggle search box visibility
function toggleSearch() {
    let searchContainer = document.getElementById("searchContainer");
    searchContainer.style.display = searchContainer.style.display === "none" || searchContainer.style.display === "" ? "block" : "none";
}
