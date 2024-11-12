import background from "../img/background.png";
import Logo from "../img/logo.png";

const header = document.querySelector(".header");
export const resultContainer = document.querySelector(".book-list");
export const searchContainer = document.querySelector(".search-container");
export const introText = document.querySelector(".title");
export const logo = new Image();

logo.src = Logo;
logo.classList.add("logo-btn");

export const init = function () {
  header.prepend(logo);
  restoreHome();
};

export const restoreHome = function () {
  resultContainer.classList.add("hidden");
  searchContainer.classList.remove("on-search");
  introText.classList.remove("hidden");
};

export const renderSpinner = function (parentEl) {
  const markup = `<span class="spinner"></span>`;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};
