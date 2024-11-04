import { ComponentLoader } from "./componentLoader.js";
import { Navigation } from "./navigation.js";

class DetailPage {
  constructor() {
    this.init();
  }

  async init() {
    await this.loadPageComponents();
    this.initializeNavigation();
    this.setupToTopButton();
  }

  async loadPageComponents() {
    await ComponentLoader.loadComponents({
      "mobile-nav": "../../components/mobile-nav.html",
      header: "../../components/header.html",
      footer: "../../components/footer.html",
    });
  }

  initializeNavigation() {
    new Navigation();
  }

  setupToTopButton() {
    const toTopButton = document.querySelector(".to-top");
    if (!toTopButton) return;

    toTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", () => {
      toTopButton.style.display = window.scrollY > 200 ? "flex" : "none";
    });
  }
}

// Initialize the detail page
const detailPage = new DetailPage();
