// Author: https://github.com/PhanTuanManh/

const barIcon = document.querySelector(".bar-icon");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

function toggleMenuVisibility(isVisible) {
  mobileMenu.classList.toggle("mp-mobile-menu-visible", isVisible);
  mobileMenu.classList.toggle("mp-mobile-menu-invisible", !isVisible);
  overlay.classList.toggle("mp-overlay-visible", isVisible);
  overlay.classList.toggle("mp-overlay-invisible", !isVisible);
}

barIcon.addEventListener("click", () => {
  const isVisible = !mobileMenu.classList.contains("mp-mobile-menu-visible");
  toggleMenuVisibility(isVisible);
});

overlay.addEventListener("click", () => {
  toggleMenuVisibility(false);
});

// Initialization for ES Users
// Xử lý sự kiện cuộn
// Khởi tạo vị trí cuộn ban đầu
let lastScrollY = window.scrollY;

function handleScroll() {
  const header = document.querySelector(".header");
  const currentScrollY = window.scrollY;

  if (currentScrollY === 0) {
    updateHeaderColor("bg-white", "bg-white/0");
  } else if (currentScrollY < lastScrollY) {
    // Khi cuộn lên hoặc về đầu trang
    updateHeaderColor("bg-white/0", "bg-white");
    header.classList.remove("translate-y-[-100%]");
  } else if (currentScrollY > lastScrollY && currentScrollY > 0) {
    // Khi cuộn xuống
    updateHeaderColor("bg-white/0", "bg-white");
    header.classList.add("translate-y-[-100%]");
  }

  // Cập nhật vị trí cuộn trước đó
  lastScrollY = currentScrollY;
}

// Hàm cập nhật màu nền của header
function updateHeaderColor(removeClass, addClass) {
  const header = document.querySelector(".header");
  if (header.classList.contains(removeClass)) {
    header.classList.remove(removeClass);
    header.classList.add(addClass);
  }
}

// Thêm sự kiện cuộn
window.addEventListener("scroll", handleScroll);

// Lấy phần tử nút "to-top"
const toTopButton = document.querySelector(".to-top");

// Thêm sự kiện click vào nút "to-top"
toTopButton.addEventListener("click", () => {
  // Cuộn về đầu trang với hiệu ứng mượt
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Hiển thị nút "to-top" khi cuộn xuống dưới một khoảng nhất định
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    // Hiện nút khi cuộn xuống 200px
    toTopButton.classList.remove("hidden");
  } else {
    toTopButton.classList.add("hidden");
  }
});

const dataSlide = [
  {
    id: 1,
    title: "Slide 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies ultricies, nunc nunc.",
    image: "https://placehold.co/1000x400?text=Slide+1",
  },
  {
    id: 2,
    title: "Slide 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ratione?",
    image: "https://placehold.co/1000x400?text=Slide+2",
  },
  {
    id: 3,
    title: "Slide 3",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magnam.",
    image: "https://placehold.co/1000x400?text=Slide+3",
  },
  {
    id: 4,
    title: "Slide 4",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, illum?",
    image: "https://placehold.co/1000x400?text=Slide+4",
  },
  {
    id: 5,
    title: "Slide 5",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magnam.",
    image: "https://placehold.co/1000x400?text=Slide+5",
  },
  {
    id: 6,
    title: "Slide 6",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magnam.",
    image: "https://placehold.co/1000x400?text=Slide+6",
  },
];

let currentSlide = 0;
const slideDuration = 3000;
let isAnimating = false;

function showSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, index) => {
    slide.classList.remove("slide-active");
    if (index === currentSlide) {
      slide.classList.add("slide-active");
    }
  });
  updateProgressBar();
  updateDots();
}

function changeSlide(n) {
  if (isAnimating) return; // Prevent multiple triggers during animation
  isAnimating = true;

  currentSlide = (currentSlide + n + dataSlide.length) % dataSlide.length;

  showSlides();

  setTimeout(() => {
    isAnimating = false;
  }, 500);
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${((currentSlide + 1) / dataSlide.length) * 100}%`;
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.remove("dot-active");
    if (index < currentSlide) {
      dot.classList.add("dot-active");
    }
    if (index === currentSlide) {
      dot.classList.add("dot-active");
    }
  });
}

function autoSlide() {
  changeSlide(1);
}

let slideInterval = setInterval(autoSlide, slideDuration);

// Tạo slides từ dữ liệu và gắn vào DOM
function createSlides() {
  const slidesContainer = document.getElementById("slides");
  slidesContainer.innerHTML = dataSlide
    .map(
      (slide) => `
      <div class="slide">
        <img src="${slide.image}" alt="Slide ${slide.id}">
        <div class="slide-title">${slide.title}</div>
        <div class="slide-content">${slide.content}</div>
      </div>
    `
    )
    .join("");

  showSlides(); // Hiển thị slide đầu tiên
}

function createDots() {
  const dotsContainer = document.querySelector(".dots");
  dotsContainer.innerHTML = "";

  dataSlide.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => changeSlide(index - currentSlide));
    dotsContainer.appendChild(dot);
  });

  updateDots();
}

// Khởi tạo slideshow
if (validateSlides(dataSlide)) {
  createSlides();
  createDots();
} else {
  console.error("Dữ liệu slide không hợp lệ.");
}
