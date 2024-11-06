// Author: https://github.com/PhanTuanManh/

import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  sortProducts,
  getAllCategories,
  getRandomProducts,
} from "./fetchAPI.js";

// Function to load all components concurrently
(async () => {
  try {
    const [headerContent, footerContent] = await Promise.all([
      Header(),
      Footer(),
    ]);
    // Insert content into the DOM
    document.querySelector("#header").innerHTML = headerContent;
    document.querySelector("#footer").innerHTML = footerContent;
  } catch (error) {
    console.error("Error loading components:", error);
  }
})();

// Event listeners and additional JavaScript for menu and scroll behavior
document.addEventListener("DOMContentLoaded", () => {
  const barIcon = document.querySelector(".bar-icon");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");

  function toggleMenuVisibility(isVisible) {
    mobileMenu.classList.toggle("mp-mobile-menu-visible", isVisible);
    mobileMenu.classList.toggle("mp-mobile-menu-invisible", !isVisible);
    overlay.classList.toggle("mp-visible", isVisible);
    overlay.classList.toggle("mp-invisible", !isVisible);
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

  function showSlides() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.classList.add("mp-invisible");

      if (index === currentSlide) {
        slide.classList.remove("mp-invisible");
        slide.classList.add("mp-visible");

        const sideTitle = slide.querySelector(".side-title");
        const slideContent = slide.querySelector(".slide-content");

        // Đặt lại trạng thái ban đầu của text
        sideTitle.classList.remove("opacity-100", "translate-y-6");
        sideTitle.classList.add("opacity-0", "translate-y-0");

        slideContent.classList.remove("opacity-100", "translate-y-16");
        slideContent.classList.add("opacity-0", "translate-y-24");

        // Hiển thị text sau 1 giây
        setTimeout(() => {
          sideTitle.classList.remove("opacity-0", "translate-y-0");
          sideTitle.classList.add("opacity-100", "translate-y-6");
          slideContent.classList.remove("opacity-0", "translate-y-24");
          slideContent.classList.add("opacity-100", "translate-y-16");
        }, 1000); // 1 giây
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
      if (index < currentSlide) {
        dot.classList.add("mp-dot-active");
        dot.classList.remove("h-0.5", "w-5");
      }
      if (index === currentSlide) {
        dot.classList.add("mp-dot-active");
        dot.classList.remove("h-0.5", "w-5");
      } else {
        dot.classList.remove("mp-dot-active");
        dot.classList.add("h-0.5", "w-5");
      }
    });
  }

  function autoSlide() {
    changeSlide(1);
  }

  let slideInterval = setInterval(autoSlide, slideDuration);

  // Tạo slides từ dữ liệu và gắn vào DOM
  function createSlides() {
    const slidesContainer = document.getElementById("slide-lists");
    slidesContainer.innerHTML = dataSlide
      .map((slide) => {
        if (slide.id === 2) {
          return `
      <div class="slide mp-transition-10 transition-ease-in-out mp-visible" data-carousel-item="active">
               <img
                 src="${slide.image}"
                 alt=""
                 class="absolute w-full h-full object-center object-cover"
               />
               <div
                 class="side-text absolute w-full h-full object-cover flex flex-col justify-center items-center"
               >
                 <h2
                   class="side-title text-[40px] lg:text-[82px] font-light -translate-x-1/3 lg:-translate-x-1/2 cursor-default mp-transition-7"
                 >
                   ${slide.title}
                 </h2>
                 <span
                   class="slide-content mp-transition-7 -translate-x-1/3 lg:-translate-x-1/2 text-[15px] pb-0.5 cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-500"
                   >${slide.content}</span
                 >
               </div>
             </div>
   `;
        } else if (slide.id === 3) {
          return `
        <div class="slide mp-transition-10 transition-ease-in-out mp-visible" data-carousel-item="active">
                 <img
                   src="${slide.image}"
                   alt=""
                   class="absolute w-full h-full object-center object-cover"
                 />
                 <div
                   class="side-text text-white absolute w-full h-full object-cover flex flex-col justify-center items-center"
                 >
                   <h2
                     class="side-title text-[40px] lg:text-[82px] font-light px-4 border-4 border-white cursor-default mp-transition-7"
                   >
                     ${slide.title}
                   </h2>
                   <span
                     class="slide-content mp-transition-7 text-[15px] pb-0.5 cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-500"
                     >${slide.content}</span
                   >
                 </div>
               </div>
     `;
        } else {
          return `
      <div class="slide mp-transition-10 transition-ease-in-out mp-visible" data-carousel-item="active">
               <img
                 src="${slide.image}"
                 alt=""
                 class="absolute w-full h-full object-center object-cover"
               />
               <div
                 class="side-text absolute w-full h-full object-cover flex flex-col justify-center items-center"
               >
                 <h2
                   class="side-title text-[40px] lg:text-[82px] font-light  cursor-default mp-transition-7"
                 >
                   ${slide.title}
                 </h2>
                 <span
                   class="slide-content mp-transition-7 text-[15px] pb-0.5 cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-500"
                   >${slide.content}</span
                 >
               </div>
             </div>
   `;
        }
      })
      .join("");

    showSlides(); // Hiển thị slide đầu tiên
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

  // Khởi tạo slideshow
  createSlides();
  createDots();

  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  prev.addEventListener("click", () => changeSlide(-1));
  next.addEventListener("click", () => changeSlide(1));
});

getRandomProducts().then((products) => {
  const productList = document.querySelector(".hot-sale-product");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add(
      "hot-sale-product-item",
      "relative",
      "cursor-pointer",
      "group"
    );
    const productImage =
      product.images && product.images.length > 0
        ? product.images[0]
        : "./assets/images/default-product.jpg";

    const discount =
      product.discount > 0
        ? `<span class="discount absolute top-0 right-0 text-[#FF6962] font-semibold px-3.5 text-[12px]">
        -${product.discount}%
      </span>`
        : "";

    const hot = product.hot
      ? `  <span class="tag absolute top-0 left-0 text-white bg-[#FF6962] font-semibold px-3.5 text-[14px]">
        Hot
      </span>">`
      : "";
    productCard.innerHTML = `
      <img loading="lazy" src="${productImage}" alt="${product.title}" class="w-full object-cover hover:scale-105 mp-transition-5" />
      <div class="item-text flex flex-col justify-center text-center mt-[20px] gap-2 mb-[30px]">
        <h5 class = "truncate ">${product.title}</h5>
        <span>$${product.price}</span>
      </div>
      ${hot}
      ${discount}
    `;

    productCard.addEventListener("click", () => {
      window.location.href = `detail.html?id=${product.id}`;
    });

    productList.appendChild(productCard);
  });
});
