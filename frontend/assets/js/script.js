// connect metamask
let accountGlobVariable;
let API_URL = "http://localhost:5000/api";

$(document).ready(function () {
  $("#connectMetaMask").click(function () {
    if (window.ethereum !== "undefined") {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(function (accounts) {
          accountGlobVariable = accounts[0];
          $("#accountArea").html("Connected to " + accountGlobVariable);
          $("#accountArea").removeClass("btn-danger");
          $("#accountArea").addClass("btn-success");
        });
    }
  });

  $("#getAllData").click(async function () {
    try {
      const response = await fetch(API_URL + "/smart-contract/");
      const data = await response.json();
      console.log(data);
      let html = "<table class='table'>";
      html +=
        "<thead><tr><th>Product ID</th><th>Name</th><th>Description</th><th>Price</th><th>Owner</th></tr></thead>";
      html += "<tbody>";
      data.forEach((product) => {
        html +=
          "<tr><td>" +
          product.productId +
          "</td><td>" +
          product.name +
          "</td><td>" +
          product.description +
          "</td><td>" +
          product.price +
          "</td><td>" +
          product.owner +
          "</td></tr>";
      });
      html += "</tbody></table>";
      document.getElementById("allDataArea").innerHTML = html;
      document.getElementById("allDataArea").classList.remove("btn-danger");
    } catch (error) {
      console.error("Error getting all data:", error);
    }
  });

  $("#getProductById").click(async function () {
    const searchId = document.getElementById("inputIdArea").value;
    try {
      const response = await fetch(
        API_URL + "/smart-contract/getById/" + searchId
      );
      const data = await response.json();
      console.log(data);
      let html = "<table class='table'>";
      html +=
        "<thead><tr><th>Product ID</th><th>Name</th><th>Description</th><th>Price</th><th>Owner</th></tr></thead>";
      html += "<tbody>";
      html +=
        "<tr><td>" +
        searchId +
        "</td><td>" +
        data.name +
        "</td><td>" +
        data.description +
        "</td><td>" +
        data.price +
        "</td><td>" +
        data.owner +
        "</td></tr>";
      html += "</tbody></table>";
      document.getElementById("productByIdArea").innerHTML = html;
      document.getElementById("productByIdArea").classList.remove("btn-danger");
    } catch (error) {
      console.error("Error getting product by id:", error);
    }
  });

  $("#addProductForm").submit(async function (e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const productDescription =
      document.getElementById("productDescription").value;
    const productPrice = document.getElementById("productPrice").value;

    try {
      const response = await fetch(API_URL + "/smart-contract/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          description: productDescription,
          price: productPrice,
          userAddress: accountGlobVariable,
        }),
      });
      const data = await response.json();
      console.log(data);
      document.getElementById("addProductForm").reset();
      document.getElementById("addProductForm").classList.remove("btn-danger");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  });
});

// handle create product form
// const addProductForm = document.getElementById("addProductForm");
// addProductForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const productName = document.getElementById("productName").value;
//   const productDescription =
//     document.getElementById("productDescription").value;
//   const productPrice = document.getElementById("productPrice").value;

//   try {
//     await window.contract.methods
//       .addProduct(productName, productDescription, productPrice)
//       .send({
//         from: accountGlobVariable,
//       });

//     addProductForm.reset();
//     alert("Product added successfully!");
//   } catch (error) {
//     console.error("Error adding product:", error);
//     alert("Failed to add product. Please try again.");
//   }
// });
