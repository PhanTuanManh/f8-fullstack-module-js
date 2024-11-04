import { ComponentLoader } from "./componentLoader.js";

class Slider {
  constructor(options) {
    this.currentSlide = 0;
    this.slideDuration = options.duration || 7000;
    this.slideInterval = null;
    this.dataSlide = options.slides || [];
    this.isTransitioning = false;

    this.init();
  }

  async init() {
    await this.initializeComponents();
    this.setupEventListeners();
    this.showSlides();
    this.startAutoSlide();
  }

  async initializeComponents() {
    await ComponentLoader.loadComponents({
      "mobile-nav": "../../components/mobile-nav.html",
      header: "../../components/header.html",
      footer: "../../components/footer.html",
    });

    this.createSlides();
    this.createDots();
  }

  createSlides() {
    const slidesContainer = document.getElementById("slide-lists");
    if (!slidesContainer) return;

    slidesContainer.innerHTML = this.dataSlide
      .map((slide) => this.createSlideHTML(slide))
      .join("");
  }

  createSlideHTML(slide) {
    const baseTemplate = `
      <div class="slide mp-transition-10 transition-ease-in-out mp-invisible" data-slide-id="${
        slide.id
      }">
        <img src="${
          slide.image
        }" alt="" class="absolute w-full h-full object-center object-cover"/>
        <div class="side-text absolute w-full h-full object-cover flex flex-col justify-center items-center ${
          slide.id === 3 ? "text-white" : ""
        }">
          <h2 class="side-title text-[40px] lg:text-[82px] font-light mp-transition-7 opacity-0 ${
            slide.id === 3
              ? "px-4 border-4 border-white"
              : slide.id === 2
              ? "-translate-x-1/3 lg:-translate-x-1/2"
              : ""
          } cursor-default">
            ${slide.title}
          </h2>
          <span class="slide-content mp-transition-7 text-[15px] pb-0.5 cursor-pointer opacity-0 ${
            slide.id === 2 ? "-translate-x-1/3 lg:-translate-x-1/2" : ""
          } relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-${
      slide.id === 3 ? "white" : "primary"
    } hover:after:w-full after:transition-all after:duration-500">
            ${slide.content}
          </span>
        </div>
      </div>
    `;
    return baseTemplate;
  }

  createDots() {
    const dotsContainer = document.querySelector(".dots-container");
    if (!dotsContainer) return;

    dotsContainer.innerHTML = this.dataSlide
      .map(
        (_, index) => `
        <button type="button" 
          class="w-5 h-0.5 bg-gray-400 dot mp-dot-active mp-transition-5 transition-ease-in-out"
          data-dot-index="${index}">
        </button>
      `
      )
      .join("");

    this.updateDots();
  }

  showSlides() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.classList.add("mp-invisible");
      slide.classList.remove("mp-visible");

      if (index === this.currentSlide) {
        slide.classList.remove("mp-invisible");
        slide.classList.add("mp-visible");

        const sideTitle = slide.querySelector(".side-title");
        const slideContent = slide.querySelector(".slide-content");

        // Reset animations
        this.resetAnimations(sideTitle, slideContent);

        // Trigger animations
        setTimeout(() => {
          this.triggerAnimations(sideTitle, slideContent);
          this.isTransitioning = false;
        }, 100);
      }
    });

    this.updateDots();
  }

  resetAnimations(title, content) {
    title.classList.remove("opacity-100", "translate-y-6");
    title.classList.add("opacity-0", "translate-y-0");
    content.classList.remove("opacity-100", "translate-y-16");
    content.classList.add("opacity-0", "translate-y-24");
  }

  triggerAnimations(title, content) {
    title.classList.remove("opacity-0", "translate-y-0");
    title.classList.add("opacity-100", "translate-y-6");
    content.classList.remove("opacity-0", "translate-y-24");
    content.classList.add("opacity-100", "translate-y-16");
  }

  updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.remove("mp-dot-active", "h-0.5", "w-5");
      if (index === this.currentSlide) {
        dot.classList.add("mp-dot-active");
      } else {
        dot.classList.add("h-0.5", "w-5");
      }
    });
  }

  changeSlide(direction) {
    if (this.isTransitioning) return;
    this.currentSlide =
      (this.currentSlide + direction + this.dataSlide.length) %
      this.dataSlide.length;
    this.showSlides();
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(
      () => this.changeSlide(1),
      this.slideDuration
    );
  }

  resetAutoSlide() {
    clearInterval(this.slideInterval);
    this.startAutoSlide();
  }

  setupEventListeners() {
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dots = document.querySelectorAll(".dot");

    if (prev) prev.addEventListener("click", () => this.changeSlide(-1));
    if (next) next.addEventListener("click", () => this.changeSlide(1));

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (this.isTransitioning) return;
        const direction = index - this.currentSlide;
        this.changeSlide(direction);
      });
    });
  }
}

// Initialize slider
export const slider = new Slider({
  duration: 7000,
  slides: [
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
  ],
});
