import { addProduct, getCart, setCart } from "./cartManager.js";
import { validAdress, validEmail, validName } from "./formValidation.js";

let getLocal = getCart();
console.log(getLocal);

// Setting of HTML blocs & contents
function createProduct(product) {
  // postion of object
  const items = document.getElementById("cart__items");

  // article creation
  const productArticle = document.createElement("article");
  productArticle.setAttribute("class", "cart__item");
  productArticle.setAttribute("data-id", getLocal[product].id);
  productArticle.setAttribute("data-color", getLocal[product].color);
  items.appendChild(productArticle);

  // div image creation
  const productDivImg = document.createElement("div");
  productDivImg.setAttribute("class", "cart__item__img");
  const productImg = document.createElement("img");
  productImg.src = getLocal[product].imageUrl;
  productImg.alt = getLocal[product].altTxt;
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
  descriptionTitle.textContent = getLocal[product].name;
  const descriptionColor = document.createElement("p");
  descriptionColor.textContent = getLocal[product].color;
  const descriptionPrice = document.createElement("p");
  descriptionPrice.textContent = getLocal[product].price + " €";
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
  qtyInput.setAttribute("value", getLocal[product].quantity);
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

// Display of local Storage
const localDisplay = async () => {
  for (let i in getLocal) {
    createProduct(i);
    console.log(getLocal[i]);
  }
};
(async () => await localDisplay())();

// Total Price computation

const qtyPriceTotal = () => {
  let totPrice = 0;
  let totQty = 0;
  let addPrice = 0;
  for (let i in getLocal) {
    addPrice = getLocal[i].price * getLocal[i].quantity;
    totPrice += addPrice;
    totQty += getLocal[i].quantity;
  }

  let totQtyDisplay = document.getElementById("totalQuantity");
  totQtyDisplay.textContent = totQty;

  let totPriceDisplay = document.getElementById("totalPrice");
  totPriceDisplay.textContent = totPrice;
};
qtyPriceTotal();

// Change quantity of items and update total Price

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

    for (let i of getLocal) {
      console.log(getLocal);
      if (canapId == i.id && canapeColor == i.color) {
        console.log("on est rentré");
        i.quantity = parseInt(input.value);
        setCart(getLocal);
        qtyPriceTotal();
      }
    }
  });
});

// Delete function for item remove

const deleteList = document.querySelectorAll(".deleteItem");
console.log(deleteList);

deleteList.forEach((deleteItem) => {
  deleteItem.addEventListener("click", function () {
    // recuperer le data id du canape
    const canap = deleteItem.closest("article"); // recupere le parent le plus proche de l'input
    const canapId = canap.getAttribute("data-id");
    const canapeColor = canap.getAttribute("data-color");

    console.log(canapId);
    console.log(canapeColor);

    for (let i in getLocal) {
      if (canapId == getLocal[i].id && canapeColor == getLocal[i].color) {
        console.log("on est rentré dans le delete");
        getLocal.splice(i, 1);
        console.log(getLocal);
        setCart(getLocal);
        qtyPriceTotal();
        window.location.reload();
      }
    }
  });
});

// Form checking and push to localStorage
let orderForm = document.querySelector(".cart__order__form");

orderForm.firstName.addEventListener("change", function () {
  validName(orderForm.firstName);
});
orderForm.lastName.addEventListener("change", function () {
  validName(orderForm.lastName);
});

orderForm.city.addEventListener("change", function () {
  validName(orderForm.city);
});
orderForm.address.addEventListener("change", function () {
  validAdress(orderForm.address);
});
orderForm.email.addEventListener("change", function () {
  validEmail(orderForm.email);
});

orderForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    validName(orderForm.firstName) &&
    validName(orderForm.lastName) &&
    validAdress(orderForm.address) &&
    validName(orderForm.city) &&
    validEmail(orderForm.email)
  ) {
    const checkOutForm = {
      firstName: orderForm.firstName.value,
      lastName: orderForm.lastName.value,
      address: orderForm.address.value,
      city: orderForm.city.value,
      email: orderForm.email.value,
    };
    localStorage.setItem("Contact", JSON.stringify(checkOutForm));
    console.log(localStorage);
    orderForm.clear();
  } else {
    alert("Veuillez renseignez des informations valable !");
    e.clear();
  }
});
