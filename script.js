let allProducts = [];

function getProducts() {
  return fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((resData) => {
      allProducts = resData.products;
      console.log(allProducts);
      Products();
    });
}

function Products(filteredProducts = null) {
  const products = filteredProducts || allProducts;
  const container = document.getElementById("container");

  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h1");
    title.textContent = product.title;

    const description = document.createElement("p");
    description.textContent = product.description;

    const img = document.createElement("img");
    img.src = product.thumbnail;

    const category = document.createElement("h3");
    category.textContent = product.category;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = "Price: $" + product.price;

    const rating = document.createElement("p");
    rating.className = "rating";
    rating.textContent =
      "Rating: " + product.rating + " " + convertToStars(product.rating);

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(rating);
    card.appendChild(category);
    container.appendChild(card);
  });
}

function convertToStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return "★".repeat(fullStars) + (halfStar ? " " : "") + "☆".repeat(emptyStars);
}

function searchProducts() {
  const searchInput = document
    .getElementById("searchProduct")
    .value.toLowerCase();

  const filteredProducts = MatchProducts(allProducts, searchInput);

  Products(filteredProducts);
}

function MatchProducts(products, searchInput) {
  return products.filter((product) => {
    const title = product.title.toLowerCase();
    return halfMatch(title, searchInput);
  });
}

function halfMatch(title, searchInput) {
  const minMatch = Math.ceil(searchInput.length / 2);
  if (searchInput.length < minMatch || searchInput.length > title.length) {
    return false;
  }
  return title.includes(searchInput);
}

function Category(event) {
  const selectedCategory = event.target.value.toLowerCase();
  if (selectedCategory) {
    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === selectedCategory
    );
    Products(filteredProducts);
  } else {
    Products();
  }
}

function CategoryProducts() {
  document
    .getElementById("productDropdown")
    .addEventListener("change", Category);
  getProducts();
}

CategoryProducts();
