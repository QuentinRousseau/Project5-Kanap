const productUrl = window.location.search.split("?id=").join("");
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
  const description = document.getElementById("description");
  description.textContent = product.description;
  // color option
  const colorSelect = document.getElementById("colors");
  const colorList = product.colors;
  createColor(colorList);
}

const createColor = async () => {
  const product = await fetchProduct();
  const colorSelects = document.getElementById("colors");
  const colorLists = product.colors;
  console.log(colorLists);
  for (let i = 0; i < colorLists.length; i++) {
    const color = document.createElement("option");
    color.setAttribute("value", product.colors[i]);
    color.textContent = color.value;
    colorSelects.appendChild(color);
  }
};

const productDisplay = async () => {
  const product = await fetchProduct();
  createProduct(product);
};
(async () => await productDisplay())();
