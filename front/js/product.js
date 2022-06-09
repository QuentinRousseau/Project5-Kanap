import { getCart, setCart } from "./cartManager.js";

const productUrl = new URL(window.location.href).searchParams.get("id");
console.log(productUrl);
//  Data recovery of API

let headersList = {
  Accept: "*/*",
};

const fetchProduct = async () => {
  return fetch(`http://localhost:3000/api/products/${productUrl}`, {
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
  console.log(productImg);
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
  console.log(colorList);
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
