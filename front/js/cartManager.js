// check Product in localStorage
export function addProduct(product) {
  const canapeList = getCart();
  if (product.quantity == 0) return;
  let item = canapeList.find(
    (item) => item.id === product.id && item.color === product.color
  );
  if (!item) {
    item = product;
    canapeList.push(item);
  } else item.quantity += product.quantity;
  setCart(canapeList);
}

// Save the cart
export function setCart(json) {
  localStorage.setItem("Canape", JSON.stringify(json));
}

// Recover the cart
export function getCart() {
  let canapeList = JSON.parse(localStorage.getItem("Canape"));
  if (canapeList === null) {
    canapeList = [];
  }
  return canapeList;
}

// Find item in localStorage
export function getItem(item) {
  const canapeList = getCart();
  item = canapeList.find(item);
}
