import { addProduct, getCart, setCart } from "./cartManager.js";

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

const createColor = async (colorList) => {
  const colorSelects = document.getElementById("colors");
  for (const name of colorList) {
    const color = document.createElement("option");
    color.setAttribute("value", name);
    color.textContent = name;
    colorSelects.appendChild(color);
  }
};

const productDisplay = async () => {
  const product = await fetchProduct();
  createProduct(product);
};

(async () => await productDisplay())();

const product = await fetchProduct();

function recoverData() {
  const color = document.getElementById("colors").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  return { ...product, id, color, quantity };
}

const btn = document.getElementById("addToCart");
btn.onclick = () => {
  const product = recoverData();
  addProduct(product);
  alert("Produit(s) ajouté(s)");
};
