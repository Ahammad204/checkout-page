// For fetch country data for dropdown menu
document.addEventListener("DOMContentLoaded", () => {
  const selectDrop = document.querySelector("#countries");

  fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //   console.log(data);
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      let output = "";

      data.forEach((countries) => {
        // console.log(countries.name.common)
        output += `<option class="input-option">${countries?.name?.common}</option>`;
      });

      selectDrop.innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
});


// Count total price

const shippingCost = 19; 

function updateQuantity(productIndex, change) {
  const numElement = document.querySelector(`.product:nth-child(${productIndex}) .num`);
  let currentQuantity = parseInt(numElement.textContent);
  
  // Update the quantity based on the change
  currentQuantity += change;
  
  // Ensure the quantity doesn't go below 0
  if (currentQuantity < 0) {
    currentQuantity = 0;
  }
  
  // Update the displayed quantity
  numElement.textContent = currentQuantity.toString().padStart(2, '0');
  
  // Update the total price
  calculateTotal();
}

function calculateTotal() {
  let total = 0;
  const products = document.querySelectorAll('.product');

  products.forEach((product, index) => {
    const price = parseFloat(product.querySelector('.product-final-price').textContent.replace('$', ''));
    const quantity = parseInt(product.querySelector('.num').textContent);
    total += price * quantity;
  });

  // Add shipping cost
  total += shippingCost;

  // Update the total cost display
  document.querySelector('.pricing .total').textContent = `$${total.toFixed(2)}`;
}

// Event listeners for buttons
document.querySelectorAll('.minus').forEach((button, index) => {
  button.addEventListener('click', () => updateQuantity(index + 1, -1));
});

document.querySelectorAll('.plus').forEach((button, index) => {
  button.addEventListener('click', () => updateQuantity(index + 1, 1));
});


//Form submission
document.getElementById('orderForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  // Check if at least one product is selected
  const products = document.querySelectorAll('.product');
  const anyProductSelected = Array.from(products).some(product => 
    parseInt(product.querySelector('.num').textContent) > 0
  );

  if (!anyProductSelected) {
    alert("Please select at least one product");
  } else {
    alert("Your order will reach your home very soon");
  }
});