// Render cart items from localStorage
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalQuantityElement = document.getElementById("total-quantity");
    const totalPriceElement = document.getElementById("total-price");
  
    // Clear the cart items first
    cartItemsContainer.innerHTML = "";
  
    let totalQuantity = 0;
    let totalPrice = 0;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<tr><td colspan='5' class='text-center'>Your cart is empty.</td></tr>";
    } else {
      cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${item.image}" style="width: 70px; height: 70px;" alt="${item.title}" /></td>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td>${item.price}$</td>
          <td>
            <button onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})" class="btn btn-secondary">-</button>
            <button onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})" class="mx-2 btn btn-success">+</button>
            <button onclick="removeItem(${item.id})" class="btn btn-danger">&times;</button>
          </td>
        `;
        cartItemsContainer.appendChild(row);
  
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
      });
    }
  
    totalQuantityElement.textContent = totalQuantity;
    totalPriceElement.textContent = Math.round(totalPrice) + "$";
  }
  
  // Update item quantity in the cart
  function updateItemQuantity(id, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(item => item.id === id);
  
    // Prevent quantity from going below 1
    if (item && newQuantity >= 1) {
      item.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  }
  
  // Remove item from cart
  function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
  
  // Continue shopping button
  document.getElementById("continue-shopping").addEventListener("click", () => {
    window.location.href = "index.html"; // Navigate back to shopping page
  });
  
  // Initial render of the cart
  renderCart();
  