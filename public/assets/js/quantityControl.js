// quantityControl.js

document.addEventListener("DOMContentLoaded", () => {
  const quantityInput = document.getElementById("quantity");
  const incrementButton = document.querySelector(".fa-plus");
  const decrementButton = document.querySelector(".fa-minus");

  if (quantityInput && incrementButton && decrementButton) {
    incrementButton.addEventListener("click", () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decrementButton.addEventListener("click", () => {
      if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });
  }
});
