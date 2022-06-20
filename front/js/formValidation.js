export function validEmail(inputEmail) {
  const regexEmail = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$",
    "g"
  );
  console.log(regexEmail);
  console.log(inputEmail);
  console.log(inputEmail.value);
  console.log(typeof inputEmail);

  let testEmail = regexEmail.test(inputEmail.value);
  let emailErrorMsg = document.getElementById("cityErrorMsg");
  console.log(testEmail);

  if (testEmail == false) {
    emailErrorMsg.textContent = "Veuillez renseigner une adresse mail valide";
  }
}

export function validName(inputName) {
  const regexNameAndCity = /[a-zA-Z\-\ç\î\ï\â\ä\ô\ö\é\è\à\'\s]{2-47}/;

  console.log(regexNameAndCity);
  console.log(typeof regexNameAndCity);
  console.log(typeof inputName);
  console.log(inputName.value);

  let testName = regexNameAndCity.test(inputName.value); // envoie un string "Quentin"
  console.log(testName);

  let errorMsg = inputName.nextElementSibling;
  console.log(errorMsg);

  if (testName == false) {
    errorMsg.textContent = "Veuillez renseigner un champ valide";
  }
}

export function validAdress(inputAdress) {
  const regexAddress = /[\d{0-3}]+[a-zA-Z0-9\-\ç\î\ï\â\ä\ô\ö\é\è\à\'\s]/;

  console.log(typeof regexAddress);
  console.log(regexAddress);

  console.log(typeof inputAdress);
  console.log(inputAdress);

  let testAdress = regexAddress.test(inputAdress.value);
  console.log(testAdress);

  let addressErrorMsg = document.getElementById("addressErrorMsg");

  if (testAdress == false) {
    addressErrorMsg.textContent = "Veuillez renseigner une adresse valide";
  }
}
