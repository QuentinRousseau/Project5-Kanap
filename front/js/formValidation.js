// Check the email
const regexEmail = /^[a-zA-Z0-9.-_]+@[a-z]+\.[a-z]{2,10}$/;
export function validEmail(inputEmail) {
  let testEmail = regexEmail.test(inputEmail.value);
  let emailErrorMsg = document.getElementById("emailErrorMsg");

  if (testEmail == false) {
    emailErrorMsg.textContent = "Veuillez renseigner une adresse mail valide";
  } else {
    emailErrorMsg.textContent = "";
    return true;
  }
}

//Check the firstName, lastName & city
const regexNameAndCity = /^[a-zA-Z\-çîïâäôöéèà']{1,47}$/;
export function validName(inputName) {
  let testName = regexNameAndCity.test(inputName.value);

  let errorMsg = inputName.nextElementSibling;

  if (testName == false) {
    errorMsg.textContent = "Veuillez renseigner un champ valide";
  } else {
    errorMsg.textContent = "";
    return true;
  }
}

const regexAddress = /^\d{0,3} [a-zA-Z]{2,6} [a-zA-Z0-9\-çîïâäôöéèà' ]+$/;
// Check the address
export function validAdress(inputAdress) {
  let testAdress = regexAddress.test(inputAdress.value);

  let addressErrorMsg = document.getElementById("addressErrorMsg");

  if (testAdress == false) {
    addressErrorMsg.textContent = "Veuillez renseigner une adresse valide";
  } else {
    addressErrorMsg.textContent = "";
    return true;
  }
}

// Post data to back
export async function postToBack(contact, products) {
  const res = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  });
  if (!res.ok) throw new Error("La requete est invalide");

  console.log(res);
  const data = await res.json();

  document.location = "confirmation.html?orderId=" + data.orderId;
  localStorage.clear();
}
