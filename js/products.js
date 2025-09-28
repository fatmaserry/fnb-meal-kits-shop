function renderProductsPage() {
  const productGrid = document.getElementById("all-products");
  if (!productGrid || typeof mealKits === "undefined") return;

  mealKits.forEach((kit) => {
    const card = document.createElement("div");
    card.className = "product-card";

    let finalPrice = kit.price;
    let discountBadge = "";
    let priceHTML = `<p class="dish-price">${kit.price.toFixed(2)} EGP</p>`;

    if (kit.discount) {
      finalPrice = kit.price - (kit.price * kit.discount) / 100;
      discountBadge = `<span class="discount-badge">-${kit.discount}%</span>`;
      priceHTML = `
        <p class="dish-price">
          <span class="old-price">${kit.price.toFixed(2)} EGP</span>
          <span class="new-price">${finalPrice.toFixed(2)} EGP</span>
        </p>
      `;
    }

    card.innerHTML = `
      <img src="${kit.img}" alt="${kit.name}" />
      ${discountBadge}
      <h3>${kit.name}</h3>

      <div class="product-meta">
        <span><i class="bx bx-dish"></i> ${kit.category}</span>
        <span><i class="bx bx-alarm"></i> ${kit.time} min</span>
      </div>

      <p class="product-desc">
        A delicious ${
          kit.name
        } meal kit, freshly prepared with premium ingredients.
      </p>

      <div class="product-rating">★★★★☆ (120 reviews)</div>

      ${priceHTML}

      <button onclick='addToCart(${JSON.stringify({
        ...kit,
        finalPrice,
      })})'>
        Add to Cart <i class='bx bx-cart'></i>
      </button>
    `;

    productGrid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductsPage();
});
