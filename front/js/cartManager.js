export function addProduct(product) {
  getCart(); // récupere ou creer le tableau

  const color = document.getElementById("colors");
  let colorSelect = color.selectedIndex.value;
  console.log(colorSelect);
  product.color = colorSelect;

  const quantity = console.log(quantity);
  product.quantity = quantity;

  setCart(product); //sauvegarde le produit au panier

  document.location.reload(); //recharge la page automatiquement pour mettre a jour
  //setCart(product);
  //ajoute un canape
}

export function setCart() {
  localStorage.setItem("Canape", JSON.stringify(product));

  //sauvegarder le panier
}

export function getCart() {
  if (localStorage.getItem("Canape") != null) {
    localStorage.getItem(item);
  } else {
    localStorage = [];
  }
  //obtien le panier
}
