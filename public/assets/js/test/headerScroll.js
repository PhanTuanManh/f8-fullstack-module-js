let lastScrollY = window.scrollY;

function updateHeaderColor(removeClass, addClass) {
  const header = document.querySelector(".header");
  header.classList.replace(removeClass, addClass);
}

export function handleScroll() {
  const header = document.querySelector(".header");
  const currentScrollY = window.scrollY;

  if (currentScrollY === 0) {
    updateHeaderColor("bg-white", "bg-white/0");
  } else if (currentScrollY < lastScrollY) {
    updateHeaderColor("bg-white/0", "bg-white");
    header.classList.remove("translate-y-[-100%]");
  } else {
    updateHeaderColor("bg-white/0", "bg-white");
    header.classList.add("translate-y-[-100%]");
  }

  lastScrollY = currentScrollY;
}

window.addEventListener("scroll", handleScroll);
