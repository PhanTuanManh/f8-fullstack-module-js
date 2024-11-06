const toTopButton = document.querySelector(".to-top");

toTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  toTopButton.classList.toggle("hidden", window.scrollY <= 200);
});
