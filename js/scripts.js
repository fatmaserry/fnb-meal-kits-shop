// Menu responsive
let menu = document.querySelector("#icon-menu");
let nav = document.querySelector(".nav");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  nav.classList.toggle("open");
};

// Auto Typed Section 1 (only if element exists and library loaded)
if (typeof Typed !== "undefined" && document.querySelector(".auto-type")) {
  new Typed(".auto-type", {
    strings: ["Chef", "Foodie", "Home Cook"],
    typeSpeed: 200,
    loop: true,
    backSpeed: 150,
  });
}

// Active link highlight in header
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".menu-item").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// SECTION 2
// Categories Section 2
var categories = [
  { name: "Breakfast", img: "./assets/imgs/breakfast.png" },
  { name: "Vegan", img: "./assets/imgs/vegan.png" },
  { name: "Meat", img: "./assets/imgs/meat.png" },
  { name: "Desert", img: "./assets/imgs/desert.png" },
  { name: "Chicken", img: "./assets/imgs/chicken.png" },
  { name: "Chocolate", img: "./assets/imgs/chococlate.png" },
];

// Categories Section 2
const categoriesContainer = document.getElementById("categories");
if (categoriesContainer) {
  var categories = [
    { name: "Breakfast", img: "./assets/imgs/breakfast.png" },
    { name: "Vegan", img: "./assets/imgs/vegan.png" },
    { name: "Meat", img: "./assets/imgs/meat.png" },
    { name: "Desert", img: "./assets/imgs/desert.png" },
    { name: "Chicken", img: "./assets/imgs/chicken.png" },
    { name: "Chocolate", img: "./assets/imgs/chococlate.png" },
  ];

  categories.forEach((val) => {
    const category = document.createElement("div");
    category.className = "cat-card";

    const img = document.createElement("img");
    img.src = val.img;
    img.alt = val.name + "-icon";
    category.appendChild(img);

    const title = document.createElement("p");
    title.className = "cat-title";
    title.textContent = val.name;
    category.appendChild(title);

    categoriesContainer.appendChild(category);
  });
}
