// Check the email
export function validEmail(inputEmail) {
  const regexEmail = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

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
export function validName(inputName) {
  const regexNameAndCity = /[a-zA-Z\-\ç\î\ï\â\ä\ô\ö\é\è\à\'\ ]{2,47}/;

  let testName = regexNameAndCity.test(inputName.value); // envoie un string "Quentin"

  let errorMsg = inputName.nextElementSibling;

  if (testName == false) {
    errorMsg.textContent = "Veuillez renseigner un champ valide";
  } else {
    errorMsg.textContent = "";
    return true;
  }
}

// Check the address
export function validAdress(inputAdress) {
  const regexAddress =
    /[\d{0,3}]+[a-zA-Z{3,6}+[a-zA-Z0-9\-\ç\î\ï\â\ä\ô\ö\é\è\à\'\ ]/;

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
export function postToBack(contact, products) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then(function (res) {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
    })
    .then(function (data) {
      document.location = "confirmation.html?orderId=" + data.orderId;
      localStorage.clear();
    })
    .catch(function (err) {
      console.log("erreur : " + err);
    });
}
