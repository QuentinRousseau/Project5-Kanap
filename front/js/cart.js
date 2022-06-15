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
      console.log(data);
      return data;
    });
};

let getLocal = JSON.parse(localStorage.getItem("Canape"));
console.log(getLocal);

//creation des balises html pour création d'une fiche produit
function createCart(cart) {
  const items = document.getElementById("cart__items");

  const cartArticle = document.createElement("article");
  cartArticle.setAttribute("class", "cart__item");
  cartArticle.setAttribute("data-id", "${product-ID}");
  cartArticle.setAttribute("data-color", "${product-color}");
  items.appendChild(cartArticle);

  const cartDivImg = document.createElement("div");
  cartDivImg.setAttribute("class", "cart__item__img");
  const cartImg = document.createElement("img");
  cartImg.src = getLocal[cart].img;
  cartImg.alt = getLocal[cart].alt;
  cartArticle.appendChild(cartDivImg);
  cartDivImg.appendChild(cartImg);

  const cartDivContent = document.createElement("div");
  cartDivContent.setAttribute("class", "cart__item__content");
  cartArticle.appendChild(cartDivContent);

  const cartContentDescription = document.createElement("div");
  cartContentDescription.setAttribute(
    "class",
    "cart__item__content__description"
  );
  cartDivContent.appendChild(cartContentDescription);
  const descriptionTitle = document.createElement("h2");
  descriptionTitle.textContent = getLocal[cart].name;
  const descriptionColor = document.createElement("p");
  descriptionColor.textContent = getLocal[cart].color;
  const descriptionPrice = document.createElement("p");
  descriptionPrice.textContent = getLocal[cart].price + " €";
  cartContentDescription.appendChild(descriptionColor);
  cartContentDescription.appendChild(descriptionPrice);
  cartContentDescription.appendChild(descriptionTitle);

  const cartContentSettings = document.createElement("div");
  cartContentSettings.setAttribute("class", "cart__item__content__settings");
  cartDivContent.appendChild(cartContentSettings);

  const contentSettingsQuantity = document.createElement("div");
  contentSettingsQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  cartContentSettings.appendChild(contentSettingsQuantity);
  const qtyTitle = document.createElement("p");
  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.setAttribute("class", "itemQuantity");
  qtyInput.setAttribute("name", "itemQuantity");
  qtyInput.setAttribute("min", "1");
  qtyInput.setAttribute("max", "100");
  qtyInput.setAttribute("value", getLocal[cart].quantity);
  contentSettingsQuantity.appendChild(qtyInput, qtyTitle);

  const contentSettingsDelete = document.createElement("div");
  contentSettingsDelete.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );
  cartContentSettings.appendChild(contentSettingsDelete);

  const deleteItem = document.createElement("p");
  deleteItem.setAttribute("class", "deleteItem");
  deleteItem.textContent = "Supprimer";
  contentSettingsDelete.appendChild(deleteItem);
}

//affichage des fiches
const localDisplay = async () => {
  for (let i in getLocal) {
    createCart(i);
    console.log(getLocal[i]);
  }
};

(async () => await localDisplay())();
