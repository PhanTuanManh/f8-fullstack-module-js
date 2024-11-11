// slider.js
export function initSlider() {
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

  let currentSlide = 0;
  const slideDuration = 7000;
  let slideInterval;

  function showSlides() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.classList.add("mp-invisible");

      if (index === currentSlide) {
        slide.classList.remove("mp-invisible");
        slide.classList.add("mp-visible");

        const sideTitle = slide.querySelector(".side-title");
        const slideContent = slide.querySelector(".slide-content");

        // Reset text animation state
        sideTitle.classList.remove("opacity-100", "translate-y-6");
        sideTitle.classList.add("opacity-0", "translate-y-0");

        slideContent.classList.remove("opacity-100", "translate-y-16");
        slideContent.classList.add("opacity-0", "translate-y-24");

        // Display text after 1 second
        setTimeout(() => {
          sideTitle.classList.remove("opacity-0", "translate-y-0");
          sideTitle.classList.add("opacity-100", "translate-y-6");
          slideContent.classList.remove("opacity-0", "translate-y-24");
          slideContent.classList.add("opacity-100", "translate-y-16");
        }, 1000);
      }
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
      dot.classList.remove("mp-dot-active");
      if (index === currentSlide) {
        dot.classList.add("mp-dot-active");
        dot.classList.remove("h-0.5", "w-5");
      } else {
        dot.classList.add("h-0.5", "w-5");
      }
    });
  }

  function autoSlide() {
    changeSlide(1);
  }

  function createSlides() {
    const slidesContainer = document.getElementById("slide-lists");
    slidesContainer.innerHTML = dataSlide
      .map((slide) => {
        return `
            <div class="slide mp-transition-10 transition-ease-in-out mp-visible" data-carousel-item="active">
              <img
                src="${slide.image}"
                alt=""
                class="absolute w-full h-full object-center object-cover"
              />
              <div class="side-text absolute w-full h-full object-cover flex flex-col justify-center items-center">
                <h2 class="side-title text-[40px] lg:text-[82px] font-light cursor-default mp-transition-7">
                  ${slide.title}
                </h2>
                <span
                  class="slide-content mp-transition-7 text-[15px] pb-0.5 cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-500">
                  ${slide.content}
                </span>
              </div>
            </div>
          `;
      })
      .join("");

    showSlides(); // Display the first slide
  }

  function createDots() {
    const dotsContainer = document.querySelector(".dots-container");

    dataSlide.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.classList.add(
        "w-5",
        "h-0.5",
        "bg-gray-400",
        "dot",
        "mp-dot-active",
        "mp-transition-5",
        "transition-ease-in-out"
      );
      dot.addEventListener("click", () => changeSlide(index - currentSlide));
      dotsContainer.appendChild(dot);
    });

    updateDots();
  }

  // Initialize slides, dots, and start auto sliding
  createSlides();
  createDots();
  slideInterval = setInterval(autoSlide, slideDuration);

  // Add navigation buttons
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  prev.addEventListener("click", () => changeSlide(-1));
  next.addEventListener("click", () => changeSlide(1));
}
