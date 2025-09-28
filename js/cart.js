// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");

function updateCartCount() {
  cartCount.textContent = cart.length;
}
updateCartCount();

function addToCart(product) {
  if (typeof product === "string") {
    product = { name: product, price: 0 };
  }

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  const cartModal = document.getElementById("cart-modal");
  const closeBtn = document.querySelector(".close-btn");
  const cartIcon = document.querySelector(".cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!cartModal || !cartIcon) {
    console.error("Cart modal or icon not found in DOM");
    return;
  }

  // Open modal when cart icon clicked
  cartIcon.addEventListener("click", () => {
    renderCart();
    cartModal.style.display = "block";
  });

  // Close modal (X button)
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      cartModal.style.display = "none";
    });
  }

  // Close modal if click outside content
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
            <div class="emoji">🛒</div>
            <p>Your cart is empty</p>
            </div>
        `;
      }
    } else {
      cart.forEach((item, index) => {
        let finalPrice = item.price ? item.price : 0;
        let priceHTML = `<span>${item.price.toFixed(2)} EGP</span>`;

        if (item.discount) {
          finalPrice = item.price - (item.price * item.discount) / 100;
          priceHTML = `<span>${finalPrice.toFixed(2)} EGP</span>`;
        }
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
        <span>${item.name || "Unnamed"}</span>
        ${priceHTML}
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
        cartItemsContainer.appendChild(itemDiv);
        total += finalPrice;
      });

      document.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });
      });
    }

    cartTotalElement.textContent = total.toFixed(2);
  }

  // Checkout button
  checkoutBtn.addEventListener("click", () => {
    alert("Proceeding to checkout...");
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
    cartModal.style.display = "none";
  });
});
