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

function createCanape(canape) {
  // create html structure and content
  const items = document.getElementById("items"); // on determine la variable 'items'
  const canapeLink = document.createElement("a"); // création du lien a
  canapeLink.href = "./product.html?id=" + canape._id; // on détermine le lien qui le compose
  const canapeCart = document.createElement("article"); //création de la balise article
  const canapeImg = document.createElement("img"); // création de la balise img
  canapeImg.src = canape.imageUrl; // on recupere et assigne l'url de l'image
  canapeImg.alt = canape.altTxt; // on recupere et assigne la description de l'image
  const canapeName = document.createElement("h3"); // création du titre h3
  canapeName.setAttribute("class", "productName"); // on attribue au titre la class productName
  canapeName.textContent = canape.name; // on recupere et assigne le nom du canape
  const canapeDescription = document.createElement("p"); // on créé le paragraphe
  canapeDescription.setAttribute("class", "productDescription"); // on attribue a la description la class productDescription
  canapeDescription.textContent = canape.description; // on recupere et assigne la description du canape

  items.appendChild(canapeLink); // la section est le parent du lien
  canapeLink.appendChild(canapeCart); // le lien est le parent de l'article
  canapeCart.appendChild(canapeImg); // l'article est le parent de l'img
  canapeCart.appendChild(canapeName); // et du titre
  canapeCart.appendChild(canapeDescription); // et de la description
}

const canapeDisplay = async () => {
  const canapes = await fetchCanape();
  // Creating a sofa object for each array element
  for (let canape of canapes) {
    console.log(canape);
    createCanape(canape);
  }
};

(async () => await canapeDisplay())();
