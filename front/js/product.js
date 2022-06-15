import { addProduct, getCart, setCart } from "./cartManager.js";

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

const products = await fetchProduct();

function recoverData() {
  const color = document.getElementById("colors");
  const choiceColor = color.options[color.selectedIndex].value;

  const quantity = document.getElementById("quantity");
  const quantityOfProduct = quantity.value;

  console.log(typeof quantityOfProduct);

  const product = {
    id: productUrl,
    color: choiceColor,
    quantity: parseInt(quantityOfProduct, 10),
    price: products.price,
    name: products.name,
    description: products.description,
    img: products.imageUrl,
    alt: products.altTxt,
  };
  console.log(choiceColor);
  console.log(quantityOfProduct);

  return product;
}

const btn = document.getElementById("addToCart");
btn.onclick = () => {
  const product = recoverData();
  let getLocal = JSON.parse(localStorage.getItem("Canape")); //recupere les données et cherche si un canapé existe
  let canapFind = 0;
  // dans mon local inserer un tableau => une variable tableau ou il y aura mon objet (id/color/qty)
  //=> creer variable + une ligne push mon objet dans le tableau
  // mon tableau il faut le mettre dans le local storage
  for (let i in getLocal) {
    if (getLocal[i].id == product.id && getLocal[i].color == product.color) {
      getLocal[i].quantity += product.quantity;
      canapFind++;
    }
  }
  if (getLocal && canapFind == 1) {
    localStorage.setItem("Canape", JSON.stringify(getLocal));
  } else if (getLocal && canapFind != 1) {
    getLocal.push(product);
    localStorage.setItem("Canape", JSON.stringify(getLocal));
  } else {
    getLocal = [];
    getLocal.push(product);
    localStorage.setItem("Canape", JSON.stringify(getLocal));
  }
};

//test de la vérification si produit existe dans le localStorage
//et sur quelle case du tableau est le produit identique

//sur chaque du tableau (boucle for ?) verifié si j'ai ID + color identique a ma nouvelle entrée => si oui alors incrémenter quantity => si non faire une nouvelle mon tableau

//sur chaque ligne du tableau (boucle for ?)

//verifié si j'ai ID + color identique a ma nouvelle entrée*/
