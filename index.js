let products = [];

// Fetch products from JSON file
fetch("products.json")
  .then(response => response.json())
  .then(data => {
      products = data;
      showProducts(products); // Initially display all products
  });

const cart = {};

const addToCart = (id) => {
    if (!cart[id]) cart[id] = 1;
    showCart();
};

const increment = (id) => {
    cart[id] = cart[id] + 1;
    showCart();
};

const decrement = (id) => {
    cart[id] = cart[id] - 1;
    if (cart[id] === 0) delete cart[id];
    showCart();
};

const displayCart = () => {
    document.getElementById("cartBox").style.display = "block";
    document.getElementById("productBox").style.display = "none";
};

const hideCart = () => {
    document.getElementById("cartBox").style.display = "none";
    document.getElementById("productBox").style.display = "block";
};

const deleteCart = (id) => {
    delete cart[id];
    showCart();
};

const showTotal = () => {
    let total = products.reduce((sum, value) => {
        return sum + value.price * (cart[value.id] ?? 0);
    }, 0);
    document.getElementById("order").innerHTML = total;
};

const showCart = () => {
    let count = Object.keys(cart).length;
    document.getElementById("items").innerHTML = count;
    showTotal();
    
    let str = "";
    products.forEach((value) => {
        if (cart[value.id]) {
            str += `
            <div>
                ${value.id} - ${value.name} - ${value.price} 
                <button onclick='decrement(${value.id})'>-</button>
                ${cart[value.id]}
                <button onclick='increment(${value.id})'>+</button>
                - ${value.price * cart[value.id]}
                <button onclick='deleteCart(${value.id})'>Delete</button>
            </div>`;
        }
    });
    document.getElementById("divCart").innerHTML = str;
};

// Function to display products
const showProducts = (filteredProducts) => {
    let str = "<div class='row'>";
    filteredProducts.forEach((value) => {
        str += `
        <div class='box'>
            <img src='${value.url}' alt='${value.name}'>
            <h3>${value.name}</h3>
            <p>${value.desc}</p>
            <h4>${value.price}</h4>
            <button onclick='addToCart(${value.id})'>Add to Cart</button>
        </div>`;
    });
    document.getElementById("divProducts").innerHTML = str + "</div>";
};

// Search function
function searchProducts() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(input));

    // Display only searched products
    showProducts(filteredProducts);
}

// Clear search function
function clearSearch() {
    document.getElementById("searchBox").value = "";
    showProducts(products); // Show all products again
}

// Toggle search box visibility
function toggleSearch() {
    let searchContainer = document.getElementById("searchContainer");
    searchContainer.style.display = searchContainer.style.display === "none" ? "block" : "none";
}
