let currentSlide = 0;
const slideDuration = 7000;
const dataSlide = [
  {
    id: 1,
    title: "Linen Collection",
    content: "Shop Now",
    image: "./assets/images/slide1.jpg",
  },
  {
    id: 2,
    title: "New Arrival",
    content: "Man Collection 2025",
    image: "./assets/images/slide2.jpg",
  },
  {
    id: 3,
    title: "Women Collection",
    content: "Shop Now",
    image: "./assets/images/slide3.jpg",
  },
];

function showSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, index) => {
    slide.classList.toggle("mp-visible", index === currentSlide);
  });
  updateDots();
}

function changeSlide(n) {
  currentSlide = (currentSlide + n + dataSlide.length) % dataSlide.length;
  showSlides();
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("mp-dot-active", index === currentSlide);
  });
}

function autoSlide() {
  changeSlide(1);
}

export function initSlideshow() {
  createSlides();
  createDots();
  setInterval(autoSlide, slideDuration);
}

function createSlides() {
  const slidesContainer = document.getElementById("slide-lists");
  slidesContainer.innerHTML = dataSlide
    .map(
      (slide) => `
    <div class="slide mp-transition-10 transition-ease-in-out ${
      slide.id === 1 ? "mp-visible" : "mp-invisible"
    }">
      <img src="${
        slide.image
      }" class="absolute w-full h-full object-center object-cover" />
      <div class="side-text absolute w-full h-full flex flex-col justify-center items-center">
        <h2 class="side-title">${slide.title}</h2>
        <span class="slide-content">${slide.content}</span>
      </div>
    </div>
  `
    )
    .join("");
  showSlides();
}

function createDots() {
  const dotsContainer = document.querySelector(".dots-container");
  dataSlide.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot mp-transition-5";
    dot.addEventListener("click", () => changeSlide(index - currentSlide));
    dotsContainer.appendChild(dot);
  });
  updateDots();
}

document
  .querySelector(".prev")
  .addEventListener("click", () => changeSlide(-1));
document.querySelector(".next").addEventListener("click", () => changeSlide(1));
