function renderHomeSlider() {
  const sliderWrapper = document.querySelector(".swiper-wrapper");
  if (!sliderWrapper || typeof mealKits === "undefined") return;

  // Clear any existing slides
  sliderWrapper.innerHTML = "";

  mealKits.forEach((kit) => {
    // Add background style for each slide
    const style = document.createElement("style");
    style.textContent = `.kit-${kit.id}{
      background-image: linear-gradient(to bottom, rgba(245,246,252,0), rgba(0,0,0,.4)),
      url('${kit.img}');
    }`;
    document.head.appendChild(style);

    // Calculate discount if exists
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

    // Create slide
    const slide = document.createElement("div");
    slide.className = `swiper-slide tranding-slide kit-${kit.id}`;
    slide.innerHTML = `
      ${discountBadge}
      <h3>${kit.name}</h3>
      <div class="dish-details">
        <div class="dish-time"><i class='bx bx-alarm'></i><p>${
          kit.time
        } min</p></div>
        <div class="dish-category"><i class='bx bx-dish'></i><p>${
          kit.category
        }</p></div>
      </div>
      ${priceHTML}
      <button onclick='addToCart(${JSON.stringify({
        ...kit,
        finalPrice,
      })})'>
        Add to Cart <i class='bx bx-cart'></i>
      </button>
    `;

    sliderWrapper.appendChild(slide);
  });

  // Initialize Swiper
  new Swiper(".tranding-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHomeSlider();
});
