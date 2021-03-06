import { getCart, setCart } from "./cartManager.js";
import {
  postToBack,
  validAdress,
  validEmail,
  validName,
} from "./formValidation.js";

// Recover data of API
let headersList = {
  Accept: "*/*",
};
const fetchProduct = async () => {
  return fetch(`http://localhost:3000/api/products/`, {
    method: "GET",
    headers: headersList,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
};

// Recover data of localStorage
let getLocal = getCart();

// Create object with data of localStorage and API result
const canapeOnCart = async () => {
  const data = await fetchProduct();
  let cartList = [];

  for (let i in getLocal) {
    let j = 0;
    while (getLocal[i].id != data[j]._id) {
      j++;
    }

    const canape = {
      altTxt: data[j].altTxt,
      color: getLocal[i].color,
      description: data[j].description,
      imageUrl: data[j].imageUrl,
      name: data[j].name,
      price: data[j].price,
      id: getLocal[i].id,
      quantity: getLocal[i].quantity,
    };

    cartList.push(canape);
  }
  return cartList;
};

// Setting of HTML blocs & contents
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
  descriptionPrice.textContent = product.price + " ???";
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

// Display of local Storage
const localDisplay = async () => {
  let cartList = await canapeOnCart();
  for (let i in cartList) {
    createProduct(cartList[i]);
  }
  qtyPriceTotal();
};

// Total Price computation
const qtyPriceTotal = async () => {
  let cartList = await canapeOnCart();
  let totPrice = 0;
  let totQty = 0;
  let addPrice = 0;
  for (let i in cartList) {
    addPrice = cartList[i].price * cartList[i].quantity;
    totPrice += addPrice;
    totQty += cartList[i].quantity;
  }

  let totQtyDisplay = document.getElementById("totalQuantity");
  totQtyDisplay.textContent = totQty;

  let totPriceDisplay = document.getElementById("totalPrice");
  totPriceDisplay.textContent = totPrice;
};

// Change quantity of items and update total Price
const modifQty = async () => {
  const inputList = document.querySelectorAll("article input");

  inputList.forEach((input) => {
    input.addEventListener("change", function (event) {
      console.log(event);
      // recuperer le data id du canape
      const canap = input.closest("article"); // recupere le parent le plus proche de l'input
      const canapId = canap.getAttribute("data-id");
      const canapeColor = canap.getAttribute("data-color");
      let val = parseInt(input.value, 10) || 0;

      if (val < 1) val = 1;
      if (val > 100) val = 100;
      input.value = val;

      for (let i of getLocal) {
        if (canapId == i.id && canapeColor == i.color) {
          i.quantity = parseInt(input.value);
          setCart(getLocal);
          qtyPriceTotal();
        }
      }
    });
  });
};

// Delete function for item remove
const deleteItems = async () => {
  const deleteList = document.querySelectorAll(".deleteItem");

  deleteList.forEach((deleteItem) => {
    deleteItem.addEventListener("click", function () {
      // Recover data of product
      const canap = deleteItem.closest("article");
      const canapId = canap.getAttribute("data-id");
      const canapeColor = canap.getAttribute("data-color");

      for (let i in getLocal) {
        if (canapId == getLocal[i].id && canapeColor == getLocal[i].color) {
          getLocal.splice(i, 1);
          setCart(getLocal);
          console.log(getLocal);
          window.location.reload();
        }
      }
    });
  });
};

// Form checking and push to localStorage (functions in 'formValidation.js')
const submitForm = async () => {
  let canapeList = await canapeOnCart();
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

  // Push to local Storage (functions in 'formValidation.js')
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      !(
        validName(orderForm.firstName) &&
        validName(orderForm.lastName) &&
        validAdress(orderForm.address) &&
        validName(orderForm.city) &&
        validEmail(orderForm.email)
      )
    )
      return;

    const contact = {
      firstName: orderForm.firstName.value,
      lastName: orderForm.lastName.value,
      address: orderForm.address.value,
      city: orderForm.city.value,
      email: orderForm.email.value,
    };

    let products = canapeList.map((i) => i.id);
    postToBack(contact, products);
  });
};

// main function
(async () => {
  await localDisplay();
  await modifQty();
  await deleteItems();
  await submitForm();
})();
