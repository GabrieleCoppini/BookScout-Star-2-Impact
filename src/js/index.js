import "../css/style.css";

import { init, restoreHome, logo, resultContainer } from "./elements.js";
import { getGenre } from "./search.js";

import {
  openDescription,
  closeDescription,
  addToYourBookstore,
  favoriteBtn,
  backWindow,
} from "./description.js";

import {
  closeBookStore,
  displayBokStore,
  clearBookStore,
  clearBtn,
} from "./your-book.js";

const searchForm = document.querySelector(".search");
const yourBookBtn = document.querySelector(".your-book-btn");
const closeDescriptionButton = document.querySelector(".close-description-btn");
const yourBookstoreBtn = document.querySelector(".close-bookstore-btn");

init();

// //search
searchForm.addEventListener("submit", getGenre);
logo.addEventListener("click", restoreHome);

// //description
resultContainer.addEventListener("click", openDescription);
backWindow.addEventListener("click", closeDescription);
closeDescriptionButton.addEventListener("click", closeDescription);

// // Personal bookstore
yourBookBtn.addEventListener("click", displayBokStore);
backWindow.addEventListener("click", closeBookStore);
favoriteBtn.addEventListener("click", addToYourBookstore);
yourBookstoreBtn.addEventListener("click", closeBookStore);
clearBtn.addEventListener("click", clearBookStore);
