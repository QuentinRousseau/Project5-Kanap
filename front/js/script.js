let headersList = {
  Accept: "*/*",
};

fetch("http://localhost:3000/api/products", {
  method: "GET",
  headers: headersList,
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
