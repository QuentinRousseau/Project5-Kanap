//Recover data to the API
let headersList = {
  Accept: "*/*",
};

const fetchCanape = async () => {
  return fetch("http://localhost:3000/api/products", {
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

// Create html structure and content for one product
function createCanape(canape) {
  const items = document.getElementById("items");
  const canapeLink = document.createElement("a");
  canapeLink.href = "./product.html?id=" + canape._id;
  const canapeCart = document.createElement("article");
  const canapeImg = document.createElement("img");
  canapeImg.src = canape.imageUrl;
  canapeImg.alt = canape.altTxt;
  const canapeName = document.createElement("h3");
  canapeName.setAttribute("class", "productName");
  canapeName.textContent = canape.name;
  const canapeDescription = document.createElement("p");
  canapeDescription.setAttribute("class", "productDescription");
  canapeDescription.textContent = canape.description;

  items.appendChild(canapeLink);
  canapeLink.appendChild(canapeCart);
  canapeCart.appendChild(canapeImg);
  canapeCart.appendChild(canapeName);
  canapeCart.appendChild(canapeDescription);
}

// Create all products with for loop
const canapeDisplay = async () => {
  const canapes = await fetchCanape();
  // Creating a sofa object for each array element
  for (let canape of canapes) {
    createCanape(canape);
  }
};

// Function call
(async () => await canapeDisplay())();
