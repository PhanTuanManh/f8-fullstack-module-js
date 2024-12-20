// mobileMenu.js
import { getAllCategories } from "../assets/js/fetchAPI.js";
export default async function MobileMenu() {
  const categories = await getAllCategories();

  const categoryListItems = categories
    .map(
      (category) => `
      <li class="mp-mobile-sub-menu-item "><a href="../category.html?category=${encodeURIComponent(
        category
      )}" class="capitalize mp-transition-3 hover:text-primary">${category}</a></li>`
    )
    .join("");
  return `
      <div class="overlay fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.5)] z-[999] mp-transition-5 mp-invisible cursor-test"></div>
      <div class="z-[9999] justify-between mobile-menu mp-mobile-menu-invisible fixed top-0 left-0 bottom-0 min-w-[400px] md:min-w-[330px] bg-white ml-0 px-5 pt-8 pb-5 text-primary overflow-y-auto mp-transition-5">
        <nav class="w-full flex flex-col h-full">
          <div class="flex flex-row w-full py-4 focus-within:border-b focus-within:border-primary mp-transition-5 mb-[30px]">
            <input type="search" class="border-0 outline-0 w-full" id="mobileSearchInput" placeholder="Search" aria-label="Search" aria-describedby="search-addon-mobile" />
            <span class="input-group-text border-0 text-lg" id="search-addon-mobile">
              <i class="fas fa-search"></i>
            </span>
          </div>
          <ul class="font-semibold">
            <li class="mp-mobile-menu-item"><a href="" class="mp-mobile-menu-item-a"><span>HOME</span><i class="fa-solid fa-caret-right opacity-50"></i></a></li>
            <li class="mp-mobile-menu-item group">
              <a href="" class="mp-mobile-menu-item-a">
              <span>SHOP</span>
              <i class="fa-solid fa-caret-right opacity-50 group-hover:rotate-90 mp-transition-5"></i>
              </a>
              <ul class="mp-mobile-sub-menu hidden group-hover:block">
                ${categoryListItems}
              </ul>
            </li>
            <li class="mp-mobile-menu-item"><a href="" class="mp-mobile-menu-item-a"><span>FEATURES</span><i class="fa-solid fa-caret-right opacity-50"></i></a></li>
            <li class="mp-mobile-menu-item"><a href="" class="mp-mobile-menu-item-a"><span>PAGES</span><i class="fa-solid fa-caret-right opacity-50"></i></a></li>
            <li class="mp-mobile-menu-item"><a href="" class="mp-mobile-menu-item-a"><span>BLOG</span><i class="fa-solid fa-caret-right opacity-50"></i></a></li>
          </ul>
          <ul class="font-semibold items-end mt-auto">
            <li class="mp-mobile-menu-item">
              <a href="" class="flex flex-row items-center">
                <div class="flex flex-row items-center"><i class="fa-regular fa-heart text-xl mr-2"></i><span> WHIST LIST </span></div>
                <span class="ml-auto text-sm bg-primary text-white px-2 rounded-full">0</span>
              </a>
            </li>
            <li class="mp-mobile-menu-item"><a href=""><i class="fa-regular fa-user text-xl mr-2"></i><span> USER</span></a></li>
          </ul>
        </nav>
      </div>
    `;
}

(async () => {
  const mobileMenuHTML = await MobileMenu();
  document.body.insertAdjacentHTML("afterbegin", mobileMenuHTML);

  const mobileSearchInput = document.getElementById("mobileSearchInput");
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const searchQuery = event.target.value.trim();
        if (searchQuery) {
          window.location.href = `category.html?search=${encodeURIComponent(
            searchQuery
          )}`;
        }
      }
    });
  }
})();
