import "../css/style.css";

import { init, restoreHome, logo, resultContainer } from "./elements.js";
import { getGenre } from "./search.js";

import {
  openDescription,
  closeDescription,
  backWindow,
} from "./description.js";

const searchForm = document.querySelector(".search");
const closeDescriptionButton = document.querySelector(".close-description");
init();

//search
searchForm.addEventListener("submit", getGenre);
logo.addEventListener("click", restoreHome);

//description
resultContainer.addEventListener("click", openDescription);
backWindow.addEventListener("click", closeDescription);
closeDescriptionButton.addEventListener("click", closeDescription);
