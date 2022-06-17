export function addProduct(product) {
  const canapeList = getCart();
  if (product.quantity == 0) return;
  console.log(canapeList);
  let item = canapeList.find(
    (item) => item.id === product.id && item.color === product.color
  );
  if (!item) {
    item = product;
    canapeList.push(item);
  } else item.quantity += canapeList.quantity;
  setCart(canapeList);
}

export function setCart(json) {
  localStorage.setItem("Canape", JSON.stringify(json));

  //sauvegarder le panier
}

export function getCart() {
  let canapeList = JSON.parse(localStorage.getItem("Canape"));
  if (canapeList === null) {
    canapeList = [];
  }
  return canapeList;
}
