import { addProduct, getCart, setCart } from "./cartManager.js";

//Recover the id in the URL
const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

//  Data recovery of API
let headersList = {
  Accept: "*/*",
};
const fetchProduct = async () => {
  return fetch(`http://localhost:3000/api/products/${id}`, {
    method: "GET",
    headers: headersList,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data;
    });
};

// Create HTML content for Canape
function createProduct(product) {
  //image
  const imgDiv = document.getElementsByClassName("item__img");
  const productImg = document.createElement("img");
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;
  imgDiv[0].appendChild(productImg);
  //title
  const title = document.getElementById("title");
  title.textContent = product.name;
  //price
  const price = document.getElementById("price");
  price.textContent = product.price + " ";
  // description
  document.getElementById("description").textContent = product.description;
  // color option
  createColor(product.colors);
}

// Create option of ColorList
const createColor = async (colorList) => {
  const colorSelects = document.getElementById("colors");
  for (const name of colorList) {
    const color = document.createElement("option");
    color.setAttribute("value", name);
    color.textContent = name;
    colorSelects.appendChild(color);
  }
};

// Display of Canape
const productDisplay = async () => {
  const product = await fetchProduct();
  createProduct(product);
};

(async () => await productDisplay())();

// Recovering of color and quantity chosen
function recoverData() {
  const color = document.getElementById("colors").value;

  const quantity = parseInt(document.getElementById("quantity").value, 10);

  // creer un boucle qui empeche l'ajout si l'input renvoie rien ou si il n'y a pas de couleur
  return { id, color, quantity };
}

// Check items before add to localStorage
const btn = document.getElementById("addToCart");
btn.addEventListener("click", function () {
  const product = recoverData();

  if (
    product.color == "" ||
    product.quantity <= 0 ||
    product.quantity == false
  ) {
    alert("Mettre une couleur et une quantité avant ajout au panier");
  } else {
    addProduct(product);
    alert("Produit(s) ajouté(s)");
  }
});
