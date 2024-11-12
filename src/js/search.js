import axios from "axios";
import noCover from "../img/noCover.png";

import {
  renderSpinner,
  introText,
  searchContainer,
  resultContainer,
} from "./elements.js";

const searchResult = document.querySelector(".book-search");
const titleList = document.querySelector(".title-div");
const errorDiv = document.createElement("div");

export const getGenre = function (event) {
  event.preventDefault();
  renderSpinner(searchResult);

  const userInput = document
    .querySelector(".input-field")
    .value.toLowerCase()
    .trim();

  if (userInput) {
    titleList.textContent = "";

    resultContainer.classList.remove("hidden");
    introText.classList.add("hidden");
    searchContainer.classList.add("on-search");
    document.querySelector(".input-field").value = "";

    getDati(userInput);
  }
};

const wrongGenre = function (genre) {
  searchResult.append(errorDiv);
  errorDiv.innerHTML = `<h3 class="error">There is no ${genre} books</h3>`;
  errorDiv.classList.add("error-result");
  errorDiv.classList.remove("hidden");
};

export const getDati = async (genre) => {
  try {
    const response = await axios.get(
      `https://openlibrary.org/subjects/${genre}.json?limit=100`
    );
    console.log(response);

    searchResult.innerHTML = "";
    errorDiv.classList.add("hidden");
    searchResult.classList.remove("error-results");

    const books = response.data.works;

    if (books.length !== 0) {
      const searchGenreTitle = `<h3><strong>${genre[0].toUpperCase()}${genre.slice(
        1
      )} books:</strong></h3>`;

      titleList.insertAdjacentHTML("beforeend", searchGenreTitle);

      books.forEach((book) => {
        const card = `
            <button class="book-display" data-book-key=${book.key}>
                  <img
                  class="book-cover"
                  src="https://covers.openlibrary.org/b/id/${book.cover_id}.jpg"
                  alt="Book cover" 
                  onerror="this.onerror=null;this.src='${noCover}"/>
                  <div class="book-info">
                    <p class="book-title"><strong>${book.title}</strong></p>
                    <p class="book-author">${book.authors[0].name}</p>
                  </div>
                </button>`;

        searchResult.insertAdjacentHTML("beforeend", card);
      });
    } else wrongGenre(genre);
  } catch (error) {
    console.error(error);
    searchResult.innerHTML = `Something went wrong (Error: ${error})`;
  }
};
