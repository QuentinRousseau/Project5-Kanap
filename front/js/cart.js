import { addProduct, getCart, setCart } from "./cartManager.js";

let getLocal = getCart();
console.log(getLocal);

//creation des balises html pour création d'une fiche produit
function createProduct(product) {
  // postion of object
  const items = document.getElementById("cart__items");

  // article creation
  const productArticle = document.createElement("article");
  productArticle.setAttribute("class", "cart__item");
  productArticle.setAttribute("data-id", product.id);
  productArticle.setAttribute("data-color", product.color);
  items.appendChild(productArticle);

  // div image creation
  const productDivImg = document.createElement("div");
  productDivImg.setAttribute("class", "cart__item__img");
  const productImg = document.createElement("img");
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;
  productArticle.appendChild(productDivImg);
  productDivImg.appendChild(productImg);

  // div  general content creation
  const productDivContent = document.createElement("div");
  productDivContent.setAttribute("class", "cart__item__content");
  productArticle.appendChild(productDivContent);

  // div title & description creation
  const productContentDescription = document.createElement("div");
  productContentDescription.setAttribute(
    "class",
    "cart__item__content__description"
  );
  productDivContent.appendChild(productContentDescription);
  const descriptionTitle = document.createElement("h2");
  descriptionTitle.textContent = product.name;
  const descriptionColor = document.createElement("p");
  descriptionColor.textContent = product.color;
  const descriptionPrice = document.createElement("p");
  descriptionPrice.textContent = product.price + " €";
  productContentDescription.appendChild(descriptionColor);
  productContentDescription.appendChild(descriptionPrice);
  productContentDescription.appendChild(descriptionTitle);

  // div settings creation
  const productContentSettings = document.createElement("div");
  productContentSettings.setAttribute("class", "cart__item__content__settings");
  productDivContent.appendChild(productContentSettings);

  // div input qty creation
  const contentSettingsQuantity = document.createElement("div");
  contentSettingsQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  productContentSettings.appendChild(contentSettingsQuantity);
  const qtyTitle = document.createElement("p");
  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.setAttribute("class", "itemQuantity");
  qtyInput.setAttribute("name", "itemQuantity");
  qtyInput.setAttribute("min", "1");
  qtyInput.setAttribute("max", "100");
  qtyInput.setAttribute("value", product.quantity);
  contentSettingsQuantity.appendChild(qtyInput, qtyTitle);

  // div delete creation
  const contentSettingsDelete = document.createElement("div");
  contentSettingsDelete.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );
  productContentSettings.appendChild(contentSettingsDelete);
  const deleteItem = document.createElement("p");
  deleteItem.setAttribute("class", "deleteItem");
  deleteItem.textContent = "Supprimer";
  contentSettingsDelete.appendChild(deleteItem);

  return product;
}

//affichage des fiches
const localDisplay = async () => {
  for (let i in getLocal) {
    createProduct(i);
    console.log(i);
  }
};
(async () => await localDisplay())();
const qtyPriceTotal = () => {
  let totPrice = 0;
  let totQty = 0;
  let addPrice = 0;
  for (let i in getLocal) {
    addPrice = i.price * i.quantity;
    totPrice += addPrice;
    totQty += parseInt(i.quantity);
  }
  let totQtyDisplay = document.getElementById("totalQuantity");
  totQtyDisplay.textContent = totQty;
  let totPriceDisplay = document.getElementById("totalPrice");
  totPriceDisplay.textContent = totPrice;
};
qtyPriceTotal();

const inputList = document.querySelectorAll("article input");
console.log(inputList);

inputList.forEach((input) => {
  input.addEventListener("change", function () {
    // recuperer le data id du canape
    const canap = input.closest("article"); // recupere le parent le plus proche de l'input
    const canapId = canap.getAttribute("data-id");
    const canapeColor = canap.getAttribute("data-color");

    console.log(canapId);
    console.log(canapeColor);
    console.log(input.value);

    for (let i in getLocal) {
      if (canapId == i.id && canapeColor == i.color) {
        console.log("on est rentré");
        i.quantity = input.value;
        setCart(i);
        qtyPriceTotal();
      }
    }
  });
});
