// Fetch products data from API (dummy API)
function getApi() {
  fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
      var products = data.products;
      var myProducts = "";
      
      // Store the product data in localStorage
      localStorage.setItem("products", JSON.stringify(products));
      
      // Generate the product list and display
      for (var i = 0; i < products.length; i++) {
        var element = `<div class="col-md-3 text-center mb-4">
                                  <img src="${products[i].images[0]}" style="height: 350px;" class="img-fluid" alt="${products[i].title}">
                                  <h2>${products[i].title}</h2>
                                  <h5 class="text-success">Rating: ${products[i].rating}/5</h5>
                                  <h6>${products[i].price}$</h6>
                                  <button id="${products[i].id}" class="add-to-cart btn btn-success">Add to cart</button>
                              </div>`;
        myProducts += element;
      }
      document.querySelector(".api").innerHTML = myProducts;
      
      // Add event listeners to all add-to-cart buttons
      const addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          const productId = e.target.id;
          addItemToCart(productId);
        });
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

getApi();

// Add item to cart
function addItemToCart(productId) {
  const products = JSON.parse(localStorage.getItem("products"));
  const product = products.find(item => item.id == productId);

  // Create a new product object for the cart
  const cartProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.images[0],
    quantity: 1
  };

  // Get cart from localStorage or initialize an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  if (existingProductIndex >= 0) {
    // If product exists, increase quantity
    cart[existingProductIndex].quantity++;
  } else {
    // If product does not exist, add it to the cart
    cart.push(cartProduct);
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the total items count
  updateCartCount();
}

// Update cart item count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
  if (cartCount > 0) {
    document.getElementById('cart-count').style.display = 'block';
  } else {
    document.getElementById('cart-count').style.display = 'none';
  }
}

// Initialize the cart count
updateCartCount();
