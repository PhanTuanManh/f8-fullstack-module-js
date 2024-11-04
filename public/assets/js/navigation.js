class Navigation {
  constructor() {
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupScrollHandling();
    this.setupToTopButton();
  }

  setupMobileMenu() {
    const barIcon = document.querySelector(".bar-icon");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".overlay");

    if (!barIcon || !mobileMenu || !overlay) return;

    const toggleMenuVisibility = (isVisible) => {
      mobileMenu.classList.toggle("mp-mobile-menu-visible", isVisible);
      mobileMenu.classList.toggle("mp-mobile-menu-invisible", !isVisible);
      overlay.classList.toggle("mp-visible", isVisible);
      overlay.classList.toggle("mp-invisible", !isVisible);
    };

    barIcon.addEventListener("click", () => {
      const isVisible = !mobileMenu.classList.contains(
        "mp-mobile-menu-visible"
      );
      toggleMenuVisibility(isVisible);
    });

    overlay.addEventListener("click", () => toggleMenuVisibility(false));
  }

  setupScrollHandling() {
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    const header = document.querySelector(".header");
    if (!header) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      this.updateHeaderColor("bg-white", "bg-white/0");
    } else if (currentScrollY < this.lastScrollY) {
      this.updateHeaderColor("bg-white/0", "bg-white");
      header.classList.remove("translate-y-[-100%]");
    } else if (currentScrollY > this.lastScrollY && currentScrollY > 0) {
      this.updateHeaderColor("bg-white/0", "bg-white");
      header.classList.add("translate-y-[-100%]");
    }

    this.lastScrollY = currentScrollY;
  }

  updateHeaderColor(removeClass, addClass) {
    const header = document.querySelector(".header");
    if (!header) return;

    if (header.classList.contains(removeClass)) {
      header.classList.remove(removeClass);
      header.classList.add(addClass);
    }
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
      if (window.scrollY > 200) {
        toTopButton.classList.remove("hidden");
      } else {
        toTopButton.classList.add("hidden");
      }
    });
  }
}

// Initialize navigation
export const navigation = new Navigation();
