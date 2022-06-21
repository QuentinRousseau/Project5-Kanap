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
