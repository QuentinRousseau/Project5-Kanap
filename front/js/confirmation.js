// Recover orderId by API
const id = new URL(window.location.href).searchParams.get("orderId");

// Display of orderID
const commandNum = document.getElementById("orderId");
commandNum.textContent = id;
